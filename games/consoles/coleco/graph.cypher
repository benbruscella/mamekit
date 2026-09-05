// mamekit knowledge graph — driver src/mame/coleco/coleco.cpp
// generated 2026-09-05T03:50:50.431Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/coleco/coleco.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/coleco/coleco.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:coleco.h'}) SET n:SourceFile SET n += {path: 'coleco.h', external: true};
MERGE (n:KG {id: 'file:bus/coleco/expansion/expansion.h'}) SET n:SourceFile SET n += {path: 'bus/coleco/expansion/expansion.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:softlist_dev.h'}) SET n:SourceFile SET n += {path: 'softlist_dev.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:logmacro.h'}) SET n:SourceFile SET n += {path: 'logmacro.h', external: true};
MERGE (n:KG {id: 'file:coleco_m.h'}) SET n:SourceFile SET n += {path: 'coleco_m.h', external: true};
MERGE (n:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/coleco/coleco_m.cpp'};
MERGE (n:KG {id: 'game:coleco'}) SET n:Game SET n += {name: 'coleco', year: '1982', company: 'Coleco', fullname: 'ColecoVision (NTSC)', monitor: 'ROT0', cls: 'coleco_state', init: 'empty_init', flags: '0', kind: 'console', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 762, sourceColumn: 1, sourceEndLine: 762};
MERGE (n:KG {id: 'romset:coleco'}) SET n:RomSet SET n += {name: 'coleco', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 670, sourceColumn: 1, sourceEndLine: 670};
MERGE (n:KG {id: 'region:coleco/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 671, sourceColumn: 2, sourceEndLine: 671};
MERGE (n:KG {id: 'rom:coleco/maincpu/313_10031-4005_73108a.u2'}) SET n:Rom SET n += {file: '313_10031-4005_73108a.u2', offset: 0, size: 8192, crc: '3aa93ef3', sha1: '45bedc4cbdeac66c7df59e9e599195c778d86a92', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 672, sourceColumn: 2, sourceEndLine: 672};
MERGE (n:KG {id: 'map:coleco_state.coleco_map'}) SET n:AddressMap SET n += {cls: 'coleco_state', name: 'coleco_map', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 163, sourceColumn: 1, sourceEndLine: 168};
MERGE (n:KG {id: 'map:coleco_state.coleco_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 8191, raw: 'map(0x0000, 0x1fff).rom()', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 165, sourceColumn: 2, sourceEndLine: 165, rom: true};
MERGE (n:KG {id: 'map:coleco_state.coleco_map/range1'}) SET n:AddressRange SET n += {start: 24576, end: 25599, raw: 'map(0x6000, 0x63ff).ram().mirror(0x1c00)', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 166, sourceColumn: 2, sourceEndLine: 166, mirror: 7168, ram: true};
MERGE (n:KG {id: 'map:coleco_state.coleco_map/range2'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).rw(FUNC(coleco_state::cart_r), FUNC(coleco_state::cart_w))', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 167, sourceColumn: 2, sourceEndLine: 167};
MERGE (n:KG {id: 'handler:coleco_state.cart_r'}) SET n:Handler SET n += {method: 'cart_r', ownerClass: 'coleco_state', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 408, sourceColumn: 1, sourceEndLine: 411, sourceParameters: 'offs_t offset', sourceBody: 'return m_cart->read(offset, 0, 0, 0, 0);'};
MERGE (n:KG {id: 'handler:coleco_state.cart_w'}) SET n:Handler SET n += {method: 'cart_w', ownerClass: 'coleco_state', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 413, sourceColumn: 1, sourceEndLine: 416, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_cart->write(offset, data, 0, 0, 0, 0);'};
MERGE (n:KG {id: 'map:coleco_state.coleco_io_map'}) SET n:AddressMap SET n += {cls: 'coleco_state', name: 'coleco_io_map', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 179, sourceColumn: 1, sourceEndLine: 189, globalMask: 255, unmapHigh: true};
MERGE (n:KG {id: 'map:coleco_state.coleco_io_map/range0'}) SET n:AddressRange SET n += {start: 128, end: 128, raw: 'map(0x80, 0x80).mirror(0x1f).w(FUNC(coleco_state::paddle_off_w))', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 183, sourceColumn: 2, sourceEndLine: 183, mirror: 31};
MERGE (n:KG {id: 'handler:coleco_state.paddle_off_w'}) SET n:Handler SET n += {method: 'paddle_off_w', ownerClass: 'coleco_state', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 97, sourceColumn: 1, sourceEndLine: 100, sourceParameters: 'uint8_t data', sourceBody: 'm_joy_mode = 0;'};
MERGE (n:KG {id: 'map:coleco_state.coleco_io_map/range1'}) SET n:AddressRange SET n += {start: 160, end: 161, raw: 'map(0xa0, 0xa1).mirror(0x1e).rw("tms9928a", FUNC(tms9928a_device::read), FUNC(tms9928a_device::write))', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 184, sourceColumn: 2, sourceEndLine: 184, mirror: 30};
MERGE (n:KG {id: 'handler:tms9928a_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'tms9928a_device', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 197, sourceColumn: 2, sourceEndLine: 197};
MERGE (n:KG {id: 'handler:tms9928a_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'tms9928a_device', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 197, sourceColumn: 2, sourceEndLine: 197};
MERGE (n:KG {id: 'map:coleco_state.coleco_io_map/range2'}) SET n:AddressRange SET n += {start: 192, end: 192, raw: 'map(0xc0, 0xc0).mirror(0x1f).w(FUNC(coleco_state::paddle_on_w))', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 185, sourceColumn: 2, sourceEndLine: 185, mirror: 31};
MERGE (n:KG {id: 'handler:coleco_state.paddle_on_w'}) SET n:Handler SET n += {method: 'paddle_on_w', ownerClass: 'coleco_state', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 102, sourceColumn: 1, sourceEndLine: 105, sourceParameters: 'uint8_t data', sourceBody: 'm_joy_mode = 1;'};
MERGE (n:KG {id: 'map:coleco_state.coleco_io_map/range3'}) SET n:AddressRange SET n += {start: 224, end: 224, raw: 'map(0xe0, 0xe0).mirror(0x1f).w("sn76489a", FUNC(sn76489a_device::write))', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 186, sourceColumn: 2, sourceEndLine: 186, mirror: 31};
MERGE (n:KG {id: 'handler:sn76489a_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'sn76489a_device', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 203, sourceColumn: 2, sourceEndLine: 203};
MERGE (n:KG {id: 'map:coleco_state.coleco_io_map/range4'}) SET n:AddressRange SET n += {start: 224, end: 224, raw: 'map(0xe0, 0xe0).mirror(0x1d).r(FUNC(coleco_state::paddle_1_r))', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 187, sourceColumn: 2, sourceEndLine: 187, mirror: 29};
MERGE (n:KG {id: 'handler:coleco_state.paddle_1_r'}) SET n:Handler SET n += {method: 'paddle_1_r', ownerClass: 'coleco_state', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 84, sourceColumn: 1, sourceEndLine: 87, sourceParameters: '', sourceBody: 'return m_joy_d7_state[0] | coleco_paddle_read(0, m_joy_mode, m_joy_analog_state[0]);'};
MERGE (n:KG {id: 'handler:coleco_state.coleco_paddle_read'}) SET n:Handler SET n += {method: 'coleco_paddle_read', ownerClass: 'coleco_state', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 447, sourceColumn: 1, sourceEndLine: 507, sourceParameters: 'int port, int joy_mode, uint8_t joy_status', sourceBody: 'uint8_t ctrl_sel = m_ctrlsel.read_safe(0);
	uint8_t ctrl_extra = ctrl_sel & 0x80;
	ctrl_sel = ctrl_sel >> (port*4) & 7;

	/* Keypad and fire 1 (SAC Yellow Button) */
	if (joy_mode == 0)
	{
		/* No key pressed by default */
		uint8_t data = 0x0f;
		uint16_t ipt = 0xffff;

		if (ctrl_sel == 0)          // ColecoVision Controller
			ipt = port ? m_std_keypad2->read() : m_std_keypad1->read();
		else if (ctrl_sel == 2)     // Super Action Controller
			ipt = port ? m_sac_keypad2->read() : m_sac_keypad1->read();

		/* Numeric pad buttons are not independent on a real ColecoVision, if you push more
		   than one, a real ColecoVision think that it is a third button, so we are going to emulate
		   the right behaviour */
		/* Super Action Controller additional buttons are read in the same way */
		if (!(ipt & 0x0001)) data &= 0x0a; /* 0 */
		if (!(ipt & 0x0002)) data &= 0x0d; /* 1 */
		if (!(ipt & 0x0004)) data &= 0x07; /* 2 */
		if (!(ipt & 0x0008)) data &= 0x0c; /* 3 */
		if (!(ipt & 0x0010)) data &= 0x02; /* 4 */
		if (!(ipt & 0x0020)) data &= 0x03; /* 5 */
		if (!(ipt & 0x0040)) data &= 0x0e; /* 6 */
		if (!(ipt & 0x0080)) data &= 0x05; /* 7 */
		if (!(ipt & 0x0100)) data &= 0x01; /* 8 */
		if (!(ipt & 0x0200)) data &= 0x0b; /* 9 */
		if (!(ipt & 0x0400)) data &= 0x06; /* # */
		if (!(ipt & 0x0800)) data &= 0x09; /* * */
		if (!(ipt & 0x1000)) data &= 0x04; /* Blue Action Button */
		if (!(ipt & 0x2000)) data &= 0x08; /* Purple Action Button */

		return ((ipt & 0x4000) >> 8) | 0x30 | data;
	}
	/* Joystick and fire 2 (SAC Red Button) */
	else
	{
		uint8_t data = 0x7f;

		if (ctrl_sel == 0)          // ColecoVision Controller
			data = port ? m_std_joy2->read() : m_std_joy1->read();
		else if (ctrl_sel == 2)     // Super Action Controller
			data = port ? m_sac_joy2->read() : m_sac_joy1->read();
		else if (ctrl_sel == 3)     // Driving Controller
			data = port ? m_driv_pedal2->read() : m_driv_pedal1->read();

		/* If any extra analog contoller enabled */
		if (ctrl_extra || ctrl_sel == 2 || ctrl_sel == 3)
		{
			if (joy_status & 0x80) data ^= 0x30;
			else if (joy_status) data ^= 0x10;
		}

		return data & 0x7f;
	}', inputMembers: ['m_ctrlsel=CTRLSEL', 'm_std_keypad1=STD_KEYPAD1', 'm_std_joy1=STD_JOY1', 'm_std_keypad2=STD_KEYPAD2', 'm_std_joy2=STD_JOY2', 'm_sac_keypad1=SAC_KEYPAD1', 'm_sac_joy1=SAC_JOY1', 'm_sac_keypad2=SAC_KEYPAD2', 'm_sac_joy2=SAC_JOY2', 'm_driv_pedal1=DRIV_PEDAL1', 'm_driv_pedal2=DRIV_PEDAL2']};
MERGE (n:KG {id: 'map:coleco_state.coleco_io_map/range5'}) SET n:AddressRange SET n += {start: 226, end: 226, raw: 'map(0xe2, 0xe2).mirror(0x1d).r(FUNC(coleco_state::paddle_2_r))', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 188, sourceColumn: 2, sourceEndLine: 188, mirror: 29};
MERGE (n:KG {id: 'handler:coleco_state.paddle_2_r'}) SET n:Handler SET n += {method: 'paddle_2_r', ownerClass: 'coleco_state', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 89, sourceColumn: 1, sourceEndLine: 95, sourceParameters: '', sourceBody: '// Tape notes:
	//     Signal is averaged to set the threshold voltage for a comparator
	//     Output of the comparator goes to bit 7
	return m_joy_d7_state[1] | coleco_paddle_read(1, m_joy_mode, m_joy_analog_state[1]);'};
MERGE (n:KG {id: 'machine:coleco_state.coleco'}) SET n:MachineConfig SET n += {cls: 'coleco_state', name: 'coleco', calls: [], stateMembers: ['{"name":"m_joy_mode","bits":32,"signed":true}', '{"name":"m_joy_irq_state","bits":32,"signed":true,"arrayLength":2}', '{"name":"m_joy_d7_state","bits":32,"signed":true,"arrayLength":2}', '{"name":"m_joy_analog_state","bits":8,"arrayLength":2}', '{"name":"m_joy_analog_reload","bits":8,"arrayLength":2}'], resetHandlers: ['coleco_state.machine_reset'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 563, sourceColumn: 1, sourceEndLine: 599};
MERGE (n:KG {id: 'handler:coleco_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'coleco_state', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 537, sourceColumn: 1, sourceEndLine: 539, sourceParameters: '', sourceBody: ''};
MERGE (n:KG {id: 'softlist:coleco_state.coleco/coleco'}) SET n:SoftwareList SET n += {name: 'coleco', tag: 'cart_list', status: 'original'};
MERGE (n:KG {id: 'softlist:coleco_state.coleco/coleco_homebrew'}) SET n:SoftwareList SET n += {name: 'coleco_homebrew', tag: 'homebrew_list', status: 'original'};
MERGE (n:KG {id: 'device:coleco_state.coleco/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3579545, config: ['Z80(config, m_maincpu, XTAL(7\'159\'090)/2)', 'm_maincpu->z80_set_m1_cycles(4+1)', 'm_maincpu->set_addrmap(AS_PROGRAM, &coleco_state::coleco_map)', 'm_maincpu->set_addrmap(AS_IO, &coleco_state::coleco_io_map)'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 566, sourceColumn: 2, sourceEndLine: 566, configCalls: ['z80_set_m1_cycles(5)']};
MERGE (n:KG {id: 'device:coleco_state.coleco/tms9928a'}) SET n:Device SET n += {type: 'TMS9928A', tag: 'tms9928a', clock: 10738635, config: ['tms9928a_device &vdp(TMS9928A(config, "tms9928a", XTAL(10\'738\'635)))', 'vdp.set_screen("screen")', 'vdp.set_vram_size(0x4000)', 'vdp.int_callback().set_inputline(m_maincpu, INPUT_LINE_NMI)'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 572, sourceColumn: 2, sourceEndLine: 572, configCalls: ['set_vram_size(16384)']};
MERGE (n:KG {id: 'device:coleco_state.coleco/tms9928a/callback:tms9928a:0'}) SET n:Callback SET n += {signal: 'int_callback', operation: 'set_inputline', raw: 'vdp.int_callback().set_inputline(m_maincpu, INPUT_LINE_NMI)', ownerTag: 'tms9928a', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 575, sourceColumn: 2, sourceEndLine: 575, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:coleco_state.coleco/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, "screen", SCREEN_TYPE_RASTER)'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 576, sourceColumn: 2, sourceEndLine: 576, clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5369317, 342, 25, 305, 262, 28, 244]};
MERGE (n:KG {id: 'device:coleco_state.coleco/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 579, sourceColumn: 2, sourceEndLine: 579};
MERGE (n:KG {id: 'device:coleco_state.coleco/sn76489a'}) SET n:Device SET n += {type: 'SN76489A', tag: 'sn76489a', clock: 3579545, config: ['sn76489a_device &psg(SN76489A(config, "sn76489a", XTAL(7\'159\'090)/2))', 'psg.add_route(ALL_OUTPUTS, "mono", 1.00)', 'psg.ready_cb().set_inputline("maincpu", Z80_INPUT_LINE_WAIT).invert()'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 580, sourceColumn: 2, sourceEndLine: 580};
MERGE (n:KG {id: 'audioroute:device:coleco_state.coleco/sn76489a/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'psg.add_route(ALL_OUTPUTS, "mono", 1.00)', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 581, sourceColumn: 2, sourceEndLine: 581};
MERGE (n:KG {id: 'device:coleco_state.coleco/sn76489a/callback:sn76489a:0'}) SET n:Callback SET n += {signal: 'ready_cb', operation: 'set_inputline', raw: 'psg.ready_cb().set_inputline("maincpu", Z80_INPUT_LINE_WAIT).invert()', ownerTag: 'sn76489a', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 582, sourceColumn: 2, sourceEndLine: 582, transforms: ['invert'], targetTag: 'maincpu', inputLine: 'Z80_INPUT_LINE_WAIT'};
MERGE (n:KG {id: 'device:coleco_state.coleco/cart'}) SET n:Device SET n += {type: 'COLECOVISION_CARTRIDGE_SLOT', tag: 'cart', clock: null, config: ['COLECOVISION_CARTRIDGE_SLOT(config, m_cart, colecovision_cartridges, nullptr)'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 585, sourceColumn: 2, sourceEndLine: 585, clockExpr: 'colecovision_cartridges'};
MERGE (n:KG {id: 'device:coleco_state.coleco/paddle_timer'}) SET n:Device SET n += {type: 'TIMER', tag: 'paddle_timer', clock: null, config: ['TIMER(config, "paddle_timer").configure_periodic(FUNC(coleco_state::paddle_update_callback), attotime::from_msec(20))'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591};
MERGE (n:KG {id: 'device:coleco_state.coleco/exp'}) SET n:Device SET n += {type: 'COLECO_EXPANSION', tag: 'exp', clock: null, config: ['coleco_expansion_device &exp(COLECO_EXPANSION(config, "exp", nullptr))', 'exp.set_program_space(m_maincpu, AS_PROGRAM)', 'exp.set_io_space(m_maincpu, AS_IO)', 'exp.int_handler().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', 'exp.nmi_handler().set_inputline(m_maincpu, INPUT_LINE_NMI)', 'exp.add_route(ALL_OUTPUTS, "mono", 1.00)'], sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 593, sourceColumn: 2, sourceEndLine: 593, clockExpr: 'nullptr'};
MERGE (n:KG {id: 'audioroute:device:coleco_state.coleco/exp/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'exp.add_route(ALL_OUTPUTS, "mono", 1.00)', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 598, sourceColumn: 2, sourceEndLine: 598};
MERGE (n:KG {id: 'device:coleco_state.coleco/exp/callback:exp:0'}) SET n:Callback SET n += {signal: 'int_handler', operation: 'set_inputline', raw: 'exp.int_handler().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', ownerTag: 'exp', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 596, sourceColumn: 2, sourceEndLine: 596, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:coleco_state.coleco/exp/callback:exp:1'}) SET n:Callback SET n += {signal: 'nmi_handler', operation: 'set_inputline', raw: 'exp.nmi_handler().set_inputline(m_maincpu, INPUT_LINE_NMI)', ownerTag: 'exp', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 597, sourceColumn: 2, sourceEndLine: 597, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'inputs:ctrl1'}) SET n:InputPorts SET n += {name: 'ctrl1', sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 7, sourceColumn: 8, sourceEndLine: 7};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}) SET n:Port SET n += {tag: 'STD_KEYPAD1', modify: false};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("0 (pad 1)")', 'PORT_CODE(KEYCODE_0_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("1 (pad 1)")', 'PORT_CODE(KEYCODE_1_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("2 (pad 1)")', 'PORT_CODE(KEYCODE_2_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("3 (pad 1)")', 'PORT_CODE(KEYCODE_3_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("4 (pad 1)")', 'PORT_CODE(KEYCODE_4_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("5 (pad 1)")', 'PORT_CODE(KEYCODE_5_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("6 (pad 1)")', 'PORT_CODE(KEYCODE_6_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("7 (pad 1)")', 'PORT_CODE(KEYCODE_7_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("8 (pad 1)")', 'PORT_CODE(KEYCODE_8_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 256};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("9 (pad 1)")', 'PORT_CODE(KEYCODE_9_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 512};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("# (pad 1)")', 'PORT_CODE(KEYCODE_MINUS_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 1024};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("* (pad 1)")', 'PORT_CODE(KEYCODE_PLUS_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 2048};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 16384};
MERGE (n:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 45056, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 45056};
MERGE (n:KG {id: 'inputs:ctrl1/STD_JOY1'}) SET n:Port SET n += {tag: 'STD_JOY1', modify: false};
MERGE (n:KG {id: 'inputs:ctrl1/STD_JOY1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:ctrl1/STD_JOY1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:ctrl1/STD_JOY1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ctrl1/STD_JOY1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:ctrl1/STD_JOY1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:ctrl1/STD_JOY1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 176, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], defaultValue: 176};
MERGE (n:KG {id: 'inputs:ctrl2'}) SET n:InputPorts SET n += {name: 'ctrl2', sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 33, sourceColumn: 8, sourceEndLine: 33};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}) SET n:Port SET n += {tag: 'STD_KEYPAD2', modify: false};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("0 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("1 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("2 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("3 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("4 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("5 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("6 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("7 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("8 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 256};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("9 (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 512};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("# (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 1024};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("* (pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 2048};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 16384};
MERGE (n:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 45056, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 45056};
MERGE (n:KG {id: 'inputs:ctrl2/STD_JOY2'}) SET n:Port SET n += {tag: 'STD_JOY2', modify: false};
MERGE (n:KG {id: 'inputs:ctrl2/STD_JOY2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:ctrl2/STD_JOY2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:ctrl2/STD_JOY2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ctrl2/STD_JOY2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:ctrl2/STD_JOY2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:ctrl2/STD_JOY2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 176, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], defaultValue: 176};
MERGE (n:KG {id: 'inputs:sac1'}) SET n:InputPorts SET n += {name: 'sac1', sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 61, sourceColumn: 8, sourceEndLine: 61};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1'}) SET n:Port SET n += {tag: 'SAC_KEYPAD1', modify: false};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("0 (SAC pad 1)")', 'PORT_CODE(KEYCODE_0_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("1 (SAC pad 1)")', 'PORT_CODE(KEYCODE_1_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("2 (SAC pad 1)")', 'PORT_CODE(KEYCODE_2_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("3 (SAC pad 1)")', 'PORT_CODE(KEYCODE_3_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("4 (SAC pad 1)")', 'PORT_CODE(KEYCODE_4_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("5 (SAC pad 1)")', 'PORT_CODE(KEYCODE_5_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("6 (SAC pad 1)")', 'PORT_CODE(KEYCODE_6_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("7 (SAC pad 1)")', 'PORT_CODE(KEYCODE_7_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("8 (SAC pad 1)")', 'PORT_CODE(KEYCODE_8_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 256};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("9 (SAC pad 1)")', 'PORT_CODE(KEYCODE_9_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 512};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("# (SAC pad 1)")', 'PORT_CODE(KEYCODE_MINUS_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 1024};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("* (SAC pad 1)")', 'PORT_CODE(KEYCODE_PLUS_PAD)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 2048};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 4096, activeLow: true, type: 'IPT_BUTTON4', modifiers: ['PORT_NAME("Blue Action Button P1")', 'PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 4096};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 8192, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("Purple Action Button P1")', 'PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 8192};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f14'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("Orange Action Button P1")', 'PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 16384};
MERGE (n:KG {id: 'inputs:sac1/SAC_KEYPAD1/f15'}) SET n:PortField SET n += {kind: 'bit', mask: 32768, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 32768};
MERGE (n:KG {id: 'inputs:sac1/SAC_JOY1'}) SET n:Port SET n += {tag: 'SAC_JOY1', modify: false};
MERGE (n:KG {id: 'inputs:sac1/SAC_JOY1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:sac1/SAC_JOY1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:sac1/SAC_JOY1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:sac1/SAC_JOY1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:sac1/SAC_JOY1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("Yellow Action Button P1")', 'PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:sac1/SAC_JOY1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 176, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 176};
MERGE (n:KG {id: 'inputs:sac1/SAC_SLIDE1'}) SET n:Port SET n += {tag: 'SAC_SLIDE1', modify: false};
MERGE (n:KG {id: 'inputs:sac1/SAC_SLIDE1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_DIAL', modifiers: ['PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(25)', 'PORT_CODE_DEC(KEYCODE_J)', 'PORT_CODE_INC(KEYCODE_L)', 'PORT_REVERSE', 'PORT_RESET', 'PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:sac2'}) SET n:InputPorts SET n += {name: 'sac2', sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 92, sourceColumn: 8, sourceEndLine: 92};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2'}) SET n:Port SET n += {tag: 'SAC_KEYPAD2', modify: false};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("0 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("1 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("2 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("3 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("4 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("5 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("6 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("7 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("8 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 256};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("9 (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 512};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("# (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 1024};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_KEYPAD', modifiers: ['PORT_NAME("* (SAC pad 2)")', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 2048};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 4096, activeLow: true, type: 'IPT_BUTTON4', modifiers: ['PORT_NAME("Blue Action Button P2")', 'PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 4096};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 8192, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("Purple Action Button P2")', 'PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 8192};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f14'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("Orange Action Button P2")', 'PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 16384};
MERGE (n:KG {id: 'inputs:sac2/SAC_KEYPAD2/f15'}) SET n:PortField SET n += {kind: 'bit', mask: 32768, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 32768};
MERGE (n:KG {id: 'inputs:sac2/SAC_JOY2'}) SET n:Port SET n += {tag: 'SAC_JOY2', modify: false};
MERGE (n:KG {id: 'inputs:sac2/SAC_JOY2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:sac2/SAC_JOY2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:sac2/SAC_JOY2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:sac2/SAC_JOY2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:sac2/SAC_JOY2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("Yellow Action Button P2")', 'PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:sac2/SAC_JOY2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 176, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 176};
MERGE (n:KG {id: 'inputs:sac2/SAC_SLIDE2'}) SET n:Port SET n += {tag: 'SAC_SLIDE2', modify: false};
MERGE (n:KG {id: 'inputs:sac2/SAC_SLIDE2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_DIAL', modifiers: ['PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(25)', 'PORT_CODE_DEC(KEYCODE_I)', 'PORT_CODE_INC(KEYCODE_K)', 'PORT_RESET', 'PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x20)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:driv1'}) SET n:InputPorts SET n += {name: 'driv1', sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 125, sourceColumn: 8, sourceEndLine: 125};
MERGE (n:KG {id: 'inputs:driv1/DRIV_WHEEL1'}) SET n:Port SET n += {tag: 'DRIV_WHEEL1', modify: false};
MERGE (n:KG {id: 'inputs:driv1/DRIV_WHEEL1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_DIAL', modifiers: ['PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(25)', 'PORT_CODE_DEC(KEYCODE_J)', 'PORT_CODE_INC(KEYCODE_L)', 'PORT_REVERSE', 'PORT_RESET', 'PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x03)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:driv1/DRIV_PEDAL1'}) SET n:Port SET n += {tag: 'DRIV_PEDAL1', modify: false};
MERGE (n:KG {id: 'inputs:driv1/DRIV_PEDAL1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)', 'PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x03)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:driv1/DRIV_PEDAL1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 191, activeLow: true, type: 'IPT_UNUSED', modifiers: ['PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x03)'], defaultValue: 191};
MERGE (n:KG {id: 'inputs:driv2'}) SET n:InputPorts SET n += {name: 'driv2', sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 134, sourceColumn: 8, sourceEndLine: 134};
MERGE (n:KG {id: 'inputs:driv2/DRIV_WHEEL2'}) SET n:Port SET n += {tag: 'DRIV_WHEEL2', modify: false};
MERGE (n:KG {id: 'inputs:driv2/DRIV_WHEEL2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_DIAL', modifiers: ['PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(25)', 'PORT_CODE_DEC(KEYCODE_I)', 'PORT_CODE_INC(KEYCODE_K)', 'PORT_RESET', 'PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x30)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:driv2/DRIV_PEDAL2'}) SET n:Port SET n += {tag: 'DRIV_PEDAL2', modify: false};
MERGE (n:KG {id: 'inputs:driv2/DRIV_PEDAL2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)', 'PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x30)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:driv2/DRIV_PEDAL2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 191, activeLow: true, type: 'IPT_UNUSED', modifiers: ['PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x30)'], defaultValue: 191};
MERGE (n:KG {id: 'inputs:roller'}) SET n:InputPorts SET n += {name: 'roller', sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 145, sourceColumn: 8, sourceEndLine: 145};
MERGE (n:KG {id: 'inputs:roller/ROLLER_X'}) SET n:Port SET n += {tag: 'ROLLER_X', modify: false};
MERGE (n:KG {id: 'inputs:roller/ROLLER_X/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_X', modifiers: ['PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(25)', 'PORT_CODE_DEC(KEYCODE_J)', 'PORT_CODE_INC(KEYCODE_L)', 'PORT_REVERSE', 'PORT_RESET', 'PORT_CONDITION("CTRLSEL", 0x80, EQUALS, 0x80)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:roller/ROLLER_Y'}) SET n:Port SET n += {tag: 'ROLLER_Y', modify: false};
MERGE (n:KG {id: 'inputs:roller/ROLLER_Y/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_Y', modifiers: ['PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(25)', 'PORT_CODE_DEC(KEYCODE_I)', 'PORT_CODE_INC(KEYCODE_K)', 'PORT_RESET', 'PORT_CONDITION("CTRLSEL", 0x80, EQUALS, 0x80)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:coleco'}) SET n:InputPorts SET n += {name: 'coleco', sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 154, sourceColumn: 1, sourceEndLine: 154};
MERGE (n:KG {id: 'inputs:coleco/CTRLSEL'}) SET n:Port SET n += {tag: 'CTRLSEL', modify: false};
MERGE (n:KG {id: 'inputs:coleco/CTRLSEL/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, name: 'Port 1 Controller', defaultValue: 0, settings: ['1=None', '0=ColecoVision Controller', '2=Super Action Controller', '3=Driving Controller']};
MERGE (n:KG {id: 'inputs:coleco/CTRLSEL/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 112, name: 'Port 2 Controller', defaultValue: 0, settings: ['16=None', '0=ColecoVision Controller', '32=Super Action Controller', '48=Driving Controller']};
MERGE (n:KG {id: 'inputs:coleco/CTRLSEL/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Extra Controller', defaultValue: 0, settings: ['0=None', '128=Roller Controller']};
MERGE (n:KG {id: 'device:coleco_state.coleco/screen/callback:screen:device'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen().set_screen_update(*this, FUNC(tms9928a_device::screen_update))', ownerTag: 'screen', deviceTag: 'tms9928a', targetClass: 'tms9928a_device', targetMethod: 'screen_update', sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 572};
MATCH (a:KG {id: 'game:coleco'}), (b:KG {id: 'file:src/mame/coleco/coleco.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 762, sourceColumn: 1, sourceEndLine: 762};
MATCH (a:KG {id: 'game:coleco'}), (b:KG {id: 'machine:coleco_state.coleco'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:coleco'}), (b:KG {id: 'inputs:coleco'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:coleco'}), (b:KG {id: 'romset:coleco'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco.cpp'}), (b:KG {id: 'file:coleco.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco.cpp'}), (b:KG {id: 'file:bus/coleco/expansion/expansion.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco.cpp'}), (b:KG {id: 'file:softlist_dev.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco.cpp'}), (b:KG {id: 'file:logmacro.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'file:src/mame/coleco/coleco.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 563, sourceColumn: 1, sourceEndLine: 599};
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'handler:coleco_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'softlist:coleco_state.coleco/coleco'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'softlist:coleco_state.coleco/coleco_homebrew'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'device:coleco_state.coleco/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'device:coleco_state.coleco/tms9928a'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'device:coleco_state.coleco/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'device:coleco_state.coleco/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'device:coleco_state.coleco/sn76489a'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'device:coleco_state.coleco/cart'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'device:coleco_state.coleco/paddle_timer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:coleco_state.coleco'}), (b:KG {id: 'device:coleco_state.coleco/exp'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 154, sourceColumn: 1, sourceEndLine: 154};
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'inputs:ctrl1'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'inputs:ctrl2'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'inputs:sac1'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'inputs:sac2'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'inputs:driv1'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'inputs:driv2'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'inputs:roller'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:coleco'}), (b:KG {id: 'inputs:coleco/CTRLSEL'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:coleco'}), (b:KG {id: 'file:src/mame/coleco/coleco.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 670, sourceColumn: 1, sourceEndLine: 670};
MATCH (a:KG {id: 'romset:coleco'}), (b:KG {id: 'region:coleco/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/maincpu'}), (b:KG {id: 'map:coleco_state.coleco_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:coleco_state.coleco/maincpu'}), (b:KG {id: 'map:coleco_state.coleco_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:coleco_state.coleco/tms9928a'}), (b:KG {id: 'device:coleco_state.coleco/tms9928a/callback:tms9928a:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/screen'}), (b:KG {id: 'device:coleco_state.coleco/screen/callback:screen:device'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/sn76489a'}), (b:KG {id: 'audioroute:device:coleco_state.coleco/sn76489a/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/sn76489a'}), (b:KG {id: 'device:coleco_state.coleco/sn76489a/callback:sn76489a:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/exp'}), (b:KG {id: 'audioroute:device:coleco_state.coleco/exp/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/exp'}), (b:KG {id: 'device:coleco_state.coleco/exp/callback:exp:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/exp'}), (b:KG {id: 'device:coleco_state.coleco/exp/callback:exp:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}), (b:KG {id: 'file:coleco_m.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'inputs:ctrl1'}), (b:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 7, sourceColumn: 8, sourceEndLine: 7};
MATCH (a:KG {id: 'inputs:ctrl1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ctrl1'}), (b:KG {id: 'inputs:ctrl1/STD_JOY1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ctrl2'}), (b:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 33, sourceColumn: 8, sourceEndLine: 33};
MATCH (a:KG {id: 'inputs:ctrl2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ctrl2'}), (b:KG {id: 'inputs:ctrl2/STD_JOY2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sac1'}), (b:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 61, sourceColumn: 8, sourceEndLine: 61};
MATCH (a:KG {id: 'inputs:sac1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sac1'}), (b:KG {id: 'inputs:sac1/SAC_JOY1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sac1'}), (b:KG {id: 'inputs:sac1/SAC_SLIDE1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sac2'}), (b:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 92, sourceColumn: 8, sourceEndLine: 92};
MATCH (a:KG {id: 'inputs:sac2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sac2'}), (b:KG {id: 'inputs:sac2/SAC_JOY2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sac2'}), (b:KG {id: 'inputs:sac2/SAC_SLIDE2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:driv1'}), (b:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 125, sourceColumn: 8, sourceEndLine: 125};
MATCH (a:KG {id: 'inputs:driv1'}), (b:KG {id: 'inputs:driv1/DRIV_WHEEL1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:driv1'}), (b:KG {id: 'inputs:driv1/DRIV_PEDAL1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:driv2'}), (b:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 134, sourceColumn: 8, sourceEndLine: 134};
MATCH (a:KG {id: 'inputs:driv2'}), (b:KG {id: 'inputs:driv2/DRIV_WHEEL2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:driv2'}), (b:KG {id: 'inputs:driv2/DRIV_PEDAL2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:roller'}), (b:KG {id: 'file:src/mame/coleco/coleco_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco_m.cpp', sourceLine: 145, sourceColumn: 8, sourceEndLine: 145};
MATCH (a:KG {id: 'inputs:roller'}), (b:KG {id: 'inputs:roller/ROLLER_X'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:roller'}), (b:KG {id: 'inputs:roller/ROLLER_Y'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:coleco/CTRLSEL'}), (b:KG {id: 'inputs:coleco/CTRLSEL/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:coleco/CTRLSEL'}), (b:KG {id: 'inputs:coleco/CTRLSEL/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:coleco/CTRLSEL'}), (b:KG {id: 'inputs:coleco/CTRLSEL/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:coleco/maincpu'}), (b:KG {id: 'rom:coleco/maincpu/313_10031-4005_73108a.u2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_map'}), (b:KG {id: 'file:src/mame/coleco/coleco.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 163, sourceColumn: 1, sourceEndLine: 168};
MATCH (a:KG {id: 'map:coleco_state.coleco_map'}), (b:KG {id: 'map:coleco_state.coleco_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_map'}), (b:KG {id: 'map:coleco_state.coleco_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_map'}), (b:KG {id: 'map:coleco_state.coleco_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map'}), (b:KG {id: 'file:src/mame/coleco/coleco.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/coleco/coleco.cpp', sourceLine: 179, sourceColumn: 1, sourceEndLine: 189};
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map'}), (b:KG {id: 'map:coleco_state.coleco_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map'}), (b:KG {id: 'map:coleco_state.coleco_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map'}), (b:KG {id: 'map:coleco_state.coleco_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map'}), (b:KG {id: 'map:coleco_state.coleco_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map'}), (b:KG {id: 'map:coleco_state.coleco_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map'}), (b:KG {id: 'map:coleco_state.coleco_io_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/tms9928a/callback:tms9928a:0'}), (b:KG {id: 'device:coleco_state.coleco/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/sn76489a/callback:sn76489a:0'}), (b:KG {id: 'device:coleco_state.coleco/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/exp/callback:exp:0'}), (b:KG {id: 'device:coleco_state.coleco/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:coleco_state.coleco/exp/callback:exp:1'}), (b:KG {id: 'device:coleco_state.coleco/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_KEYPAD1'}), (b:KG {id: 'inputs:ctrl1/STD_KEYPAD1/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_JOY1'}), (b:KG {id: 'inputs:ctrl1/STD_JOY1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_JOY1'}), (b:KG {id: 'inputs:ctrl1/STD_JOY1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_JOY1'}), (b:KG {id: 'inputs:ctrl1/STD_JOY1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_JOY1'}), (b:KG {id: 'inputs:ctrl1/STD_JOY1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_JOY1'}), (b:KG {id: 'inputs:ctrl1/STD_JOY1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl1/STD_JOY1'}), (b:KG {id: 'inputs:ctrl1/STD_JOY1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_KEYPAD2'}), (b:KG {id: 'inputs:ctrl2/STD_KEYPAD2/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_JOY2'}), (b:KG {id: 'inputs:ctrl2/STD_JOY2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_JOY2'}), (b:KG {id: 'inputs:ctrl2/STD_JOY2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_JOY2'}), (b:KG {id: 'inputs:ctrl2/STD_JOY2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_JOY2'}), (b:KG {id: 'inputs:ctrl2/STD_JOY2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_JOY2'}), (b:KG {id: 'inputs:ctrl2/STD_JOY2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ctrl2/STD_JOY2'}), (b:KG {id: 'inputs:ctrl2/STD_JOY2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f14'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_KEYPAD1'}), (b:KG {id: 'inputs:sac1/SAC_KEYPAD1/f15'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_JOY1'}), (b:KG {id: 'inputs:sac1/SAC_JOY1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_JOY1'}), (b:KG {id: 'inputs:sac1/SAC_JOY1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_JOY1'}), (b:KG {id: 'inputs:sac1/SAC_JOY1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_JOY1'}), (b:KG {id: 'inputs:sac1/SAC_JOY1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_JOY1'}), (b:KG {id: 'inputs:sac1/SAC_JOY1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_JOY1'}), (b:KG {id: 'inputs:sac1/SAC_JOY1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac1/SAC_SLIDE1'}), (b:KG {id: 'inputs:sac1/SAC_SLIDE1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f14'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_KEYPAD2'}), (b:KG {id: 'inputs:sac2/SAC_KEYPAD2/f15'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_JOY2'}), (b:KG {id: 'inputs:sac2/SAC_JOY2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_JOY2'}), (b:KG {id: 'inputs:sac2/SAC_JOY2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_JOY2'}), (b:KG {id: 'inputs:sac2/SAC_JOY2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_JOY2'}), (b:KG {id: 'inputs:sac2/SAC_JOY2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_JOY2'}), (b:KG {id: 'inputs:sac2/SAC_JOY2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_JOY2'}), (b:KG {id: 'inputs:sac2/SAC_JOY2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sac2/SAC_SLIDE2'}), (b:KG {id: 'inputs:sac2/SAC_SLIDE2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:driv1/DRIV_WHEEL1'}), (b:KG {id: 'inputs:driv1/DRIV_WHEEL1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:driv1/DRIV_PEDAL1'}), (b:KG {id: 'inputs:driv1/DRIV_PEDAL1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:driv1/DRIV_PEDAL1'}), (b:KG {id: 'inputs:driv1/DRIV_PEDAL1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:driv2/DRIV_WHEEL2'}), (b:KG {id: 'inputs:driv2/DRIV_WHEEL2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:driv2/DRIV_PEDAL2'}), (b:KG {id: 'inputs:driv2/DRIV_PEDAL2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:driv2/DRIV_PEDAL2'}), (b:KG {id: 'inputs:driv2/DRIV_PEDAL2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:roller/ROLLER_X'}), (b:KG {id: 'inputs:roller/ROLLER_X/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:roller/ROLLER_Y'}), (b:KG {id: 'inputs:roller/ROLLER_Y/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_map/range2'}), (b:KG {id: 'handler:coleco_state.cart_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_map/range2'}), (b:KG {id: 'handler:coleco_state.cart_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map/range0'}), (b:KG {id: 'handler:coleco_state.paddle_off_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map/range1'}), (b:KG {id: 'handler:tms9928a_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'tms9928a'};
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map/range1'}), (b:KG {id: 'handler:tms9928a_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'tms9928a'};
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map/range2'}), (b:KG {id: 'handler:coleco_state.paddle_on_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map/range3'}), (b:KG {id: 'handler:sn76489a_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn76489a'};
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map/range4'}), (b:KG {id: 'handler:coleco_state.paddle_1_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:coleco_state.coleco_io_map/range5'}), (b:KG {id: 'handler:coleco_state.paddle_2_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'handler:coleco_state.paddle_1_r'}), (b:KG {id: 'handler:coleco_state.coleco_paddle_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:coleco_state.paddle_2_r'}), (b:KG {id: 'handler:coleco_state.coleco_paddle_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
