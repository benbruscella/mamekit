// mamekit knowledge graph — driver src/mame/atari/bzone.cpp
// generated 2026-09-24T02:26:47.775Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/atari/bzone.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/atari/bzone.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:bzone.h'}) SET n:SourceFile SET n += {path: 'bzone.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:video/avgdvg.h'}) SET n:SourceFile SET n += {path: 'video/avgdvg.h', external: true};
MERGE (n:KG {id: 'file:video/vector.h'}) SET n:SourceFile SET n += {path: 'video/vector.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:sound/pokey.h'}) SET n:SourceFile SET n += {path: 'sound/pokey.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:bzone.lh'}) SET n:SourceFile SET n += {path: 'bzone.lh', external: true};
MERGE (n:KG {id: 'file:redbaron.lh'}) SET n:SourceFile SET n += {path: 'redbaron.lh', external: true};
MERGE (n:KG {id: 'file:sound/discrete.h'}) SET n:SourceFile SET n += {path: 'sound/discrete.h', external: true};
MERGE (n:KG {id: 'file:src/mame/atari/bzone_a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/atari/bzone_a.cpp'};
MERGE (n:KG {id: 'game:bzone'}) SET n:Game SET n += {name: 'bzone', year: '1980', company: 'Atari', fullname: 'Battlezone (rev 2)', monitor: 'ROT0', cls: 'bzone_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE, layout_bzone', kind: 'arcade', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 1014, sourceColumn: 1, sourceEndLine: 1014};
MERGE (n:KG {id: 'romset:bzone'}) SET n:RomSet SET n += {name: 'bzone', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 713, sourceColumn: 1, sourceEndLine: 713};
MERGE (n:KG {id: 'region:bzone/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 32768, flags: '0', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 714, sourceColumn: 2, sourceEndLine: 714};
MERGE (n:KG {id: 'rom:bzone/maincpu/036414-02.e1'}) SET n:Rom SET n += {file: '036414-02.e1', offset: 20480, size: 2048, crc: '13de36d5', sha1: '40e356ddc5c042bc1ce0b71f51e8b6de72daf1e4', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 715, sourceColumn: 2, sourceEndLine: 715};
MERGE (n:KG {id: 'rom:bzone/maincpu/036413-01.h1'}) SET n:Rom SET n += {file: '036413-01.h1', offset: 22528, size: 2048, crc: '5d9d9111', sha1: '42638cff53a9791a0f18d316f62a0ea8eea4e194', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 716, sourceColumn: 2, sourceEndLine: 716};
MERGE (n:KG {id: 'rom:bzone/maincpu/036412-01.j1'}) SET n:Rom SET n += {file: '036412-01.j1', offset: 24576, size: 2048, crc: 'ab55cbd2', sha1: '6bbb8316d9f8588ea0893932f9174788292b8edc', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 717, sourceColumn: 2, sourceEndLine: 717};
MERGE (n:KG {id: 'rom:bzone/maincpu/036411-01.k1'}) SET n:Rom SET n += {file: '036411-01.k1', offset: 26624, size: 2048, crc: 'ad281297', sha1: '54c5e06b2e69eb731a6c9b1704e4340f493e7ea5', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 718, sourceColumn: 2, sourceEndLine: 718};
MERGE (n:KG {id: 'rom:bzone/maincpu/036410-01.lm1'}) SET n:Rom SET n += {file: '036410-01.lm1', offset: 28672, size: 2048, crc: '0b7bfaa4', sha1: '33ae0f68b4e2eae9f3aecbee2d0b29003ce460b2', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 719, sourceColumn: 2, sourceEndLine: 719};
MERGE (n:KG {id: 'rom:bzone/maincpu/036409-01.n1'}) SET n:Rom SET n += {file: '036409-01.n1', offset: 30720, size: 2048, crc: '1e14e919', sha1: '448fab30535e6fad7e0ab4427bc06bbbe075e797', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 720, sourceColumn: 2, sourceEndLine: 720};
MERGE (n:KG {id: 'rom:bzone/maincpu/036422-01.bc3'}) SET n:Rom SET n += {file: '036422-01.bc3', offset: 12288, size: 2048, crc: '7414177b', sha1: '147d97a3b475e738ce00b1a7909bbd787ad06eda', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 722, sourceColumn: 2, sourceEndLine: 722};
MERGE (n:KG {id: 'rom:bzone/maincpu/036421-01.a3'}) SET n:Rom SET n += {file: '036421-01.a3', offset: 14336, size: 2048, crc: '8ea8f939', sha1: 'b71e0ab0e220c3e64dc2b094c701fb1a960b64e4', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 723, sourceColumn: 2, sourceEndLine: 723};
MERGE (n:KG {id: 'region:bzone/avg:prom'}) SET n:RomRegion SET n += {tag: 'avg:prom', size: 256, flags: '0', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 726, sourceColumn: 2, sourceEndLine: 726};
MERGE (n:KG {id: 'rom:bzone/avg:prom/036408-01.k7'}) SET n:Rom SET n += {file: '036408-01.k7', offset: 0, size: 256, crc: '5903af03', sha1: '24bc0366f394ad0ec486919212e38be0f08d0239', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 727, sourceColumn: 2, sourceEndLine: 727};
MERGE (n:KG {id: 'region:bzone/user2'}) SET n:RomRegion SET n += {tag: 'user2', size: 32, flags: '0', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 730, sourceColumn: 2, sourceEndLine: 730};
MERGE (n:KG {id: 'rom:bzone/user2/036174-01.b1'}) SET n:Rom SET n += {file: '036174-01.b1', offset: 0, size: 32, crc: '8b04f921', sha1: '317b3397482f13b2d1bc21f296d3b3f9a118787b', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 731, sourceColumn: 2, sourceEndLine: 731};
MERGE (n:KG {id: 'region:bzone/user3'}) SET n:RomRegion SET n += {tag: 'user3', size: 1024, flags: '0'};
MERGE (n:KG {id: 'rom:bzone/user3/036175-01.m1'}) SET n:Rom SET n += {file: '036175-01.m1', offset: 0, size: 256, crc: '2af82e87', sha1: '3816835a9ccf99a76d246adf204989d9261bb065', skip: 3};
MERGE (n:KG {id: 'rom:bzone/user3/036176-01.l1'}) SET n:Rom SET n += {file: '036176-01.l1', offset: 0, size: 256, crc: 'b31f6e24', sha1: 'ce5f8ca34d06a5cfa0076b47400e61e0130ffe74', skip: 3};
MERGE (n:KG {id: 'rom:bzone/user3/036177-01.k1'}) SET n:Rom SET n += {file: '036177-01.k1', offset: 1, size: 256, crc: '8119b847', sha1: 'c4fbaedd4ce1ad6a4128cbe902b297743edb606a', skip: 3};
MERGE (n:KG {id: 'rom:bzone/user3/036178-01.j1'}) SET n:Rom SET n += {file: '036178-01.j1', offset: 1, size: 256, crc: '09f5a4d5', sha1: 'd6f2ac07ca9ee385c08831098b0dcaf56808993b', skip: 3};
MERGE (n:KG {id: 'rom:bzone/user3/036179-01.h1'}) SET n:Rom SET n += {file: '036179-01.h1', offset: 2, size: 256, crc: '823b61ae', sha1: 'd99a839874b45f64e14dae92a036e47a53705d16', skip: 3};
MERGE (n:KG {id: 'rom:bzone/user3/036180-01.f1'}) SET n:Rom SET n += {file: '036180-01.f1', offset: 2, size: 256, crc: '276eadd5', sha1: '55718cd8ec4bcf75076d5ef0ee1ed2551e19d9ba', skip: 3};
MERGE (n:KG {id: 'map:bzone_state.bzone_map'}) SET n:AddressMap SET n += {cls: 'bzone_state', name: 'bzone_map', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 339, sourceColumn: 1, sourceEndLine: 358, globalMask: 32767};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1023, raw: 'map(0x0000, 0x03ff).ram()', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 342, sourceColumn: 2, sourceEndLine: 342, ram: true};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range1'}) SET n:AddressRange SET n += {start: 2048, end: 2048, raw: 'map(0x0800, 0x0800).portr("IN0")', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 343, sourceColumn: 2, sourceEndLine: 343, portRead: 'IN0'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range2'}) SET n:AddressRange SET n += {start: 2560, end: 2560, raw: 'map(0x0a00, 0x0a00).portr("DSW0")', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 344, sourceColumn: 2, sourceEndLine: 344, portRead: 'DSW0'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range3'}) SET n:AddressRange SET n += {start: 3072, end: 3072, raw: 'map(0x0c00, 0x0c00).portr("DSW1")', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 345, sourceColumn: 2, sourceEndLine: 345, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range4'}) SET n:AddressRange SET n += {start: 4096, end: 4096, raw: 'map(0x1000, 0x1000).w(FUNC(bzone_state::bzone_coin_counter_w))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 346, sourceColumn: 2, sourceEndLine: 346};
MERGE (n:KG {id: 'handler:bzone_state.bzone_coin_counter_w'}) SET n:Handler SET n += {method: 'bzone_coin_counter_w', ownerClass: 'bzone_state', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 281, sourceColumn: 1, sourceEndLine: 284, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'machine().bookkeeping().coin_counter_w(offset,data);'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range5'}) SET n:AddressRange SET n += {start: 4608, end: 4608, raw: 'map(0x1200, 0x1200).w("avg", FUNC(avg_device::go_w))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 347, sourceColumn: 2, sourceEndLine: 347};
MERGE (n:KG {id: 'handler:avg_device.go_w'}) SET n:Handler SET n += {method: 'go_w', ownerClass: 'avg_device', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 400, sourceColumn: 2, sourceEndLine: 400};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range6'}) SET n:AddressRange SET n += {start: 5120, end: 5120, raw: 'map(0x1400, 0x1400).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 348, sourceColumn: 2, sourceEndLine: 348};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 401, sourceColumn: 2, sourceEndLine: 401};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range7'}) SET n:AddressRange SET n += {start: 5632, end: 5632, raw: 'map(0x1600, 0x1600).w("avg", FUNC(avg_device::reset_w))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 349, sourceColumn: 2, sourceEndLine: 349};
MERGE (n:KG {id: 'handler:avg_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'avg_device', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 402, sourceColumn: 2, sourceEndLine: 402};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range8'}) SET n:AddressRange SET n += {start: 6144, end: 6144, raw: 'map(0x1800, 0x1800).r(m_mathbox, FUNC(mathbox_device::status_r))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 350, sourceColumn: 2, sourceEndLine: 350};
MERGE (n:KG {id: 'handler:mathbox_device.status_r'}) SET n:Handler SET n += {method: 'status_r', ownerClass: 'mathbox_device', sourceFile: 'src/mame/atari/mathbox.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 295, sourceParameters: '', sourceBody: 'return 0x00; /* always done! */'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range9'}) SET n:AddressRange SET n += {start: 6160, end: 6160, raw: 'map(0x1810, 0x1810).r(m_mathbox, FUNC(mathbox_device::lo_r))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351};
MERGE (n:KG {id: 'handler:mathbox_device.lo_r'}) SET n:Handler SET n += {method: 'lo_r', ownerClass: 'mathbox_device', sourceFile: 'src/mame/atari/mathbox.cpp', sourceLine: 297, sourceColumn: 1, sourceEndLine: 300, sourceParameters: '', sourceBody: 'return m_result & 0xff;'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range10'}) SET n:AddressRange SET n += {start: 6168, end: 6168, raw: 'map(0x1818, 0x1818).r(m_mathbox, FUNC(mathbox_device::hi_r))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 352, sourceColumn: 2, sourceEndLine: 352};
MERGE (n:KG {id: 'handler:mathbox_device.hi_r'}) SET n:Handler SET n += {method: 'hi_r', ownerClass: 'mathbox_device', sourceFile: 'src/mame/atari/mathbox.cpp', sourceLine: 302, sourceColumn: 1, sourceEndLine: 305, sourceParameters: '', sourceBody: 'return (m_result >> 8) & 0xff;'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range11'}) SET n:AddressRange SET n += {start: 6176, end: 6191, raw: 'map(0x1820, 0x182f).rw("pokey", FUNC(pokey_device::read), FUNC(pokey_device::write))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 353, sourceColumn: 2, sourceEndLine: 353};
MERGE (n:KG {id: 'handler:pokey_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 410, sourceColumn: 2, sourceEndLine: 410};
MERGE (n:KG {id: 'handler:pokey_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 410, sourceColumn: 2, sourceEndLine: 410};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range12'}) SET n:AddressRange SET n += {start: 6208, end: 6208, raw: 'map(0x1840, 0x1840).w(FUNC(bzone_state::bzone_sounds_w))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 354, sourceColumn: 2, sourceEndLine: 354};
MERGE (n:KG {id: 'handler:bzone_state.bzone_sounds_w'}) SET n:Handler SET n += {method: 'bzone_sounds_w', ownerClass: 'bzone_state', sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 391, sourceColumn: 1, sourceEndLine: 397, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(BZ_INPUT, data);

	m_startled = BIT(data, 6);
	machine().sound().system_mute(!BIT(data, 5));'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range13'}) SET n:AddressRange SET n += {start: 6240, end: 6271, raw: 'map(0x1860, 0x187f).w(m_mathbox, FUNC(mathbox_device::go_w))', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 355, sourceColumn: 2, sourceEndLine: 355};
MERGE (n:KG {id: 'handler:mathbox_device.go_w'}) SET n:Handler SET n += {method: 'go_w', ownerClass: 'mathbox_device', sourceFile: 'src/mame/atari/mathbox.cpp', sourceLine: 69, sourceColumn: 1, sourceEndLine: 290, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int32_t mb_temp;  /* temp 32-bit multiply results */
	int16_t mb_q;     /* temp used in division */
	int msb;

	LOG(("math box command %02x data %02x  ", offset, data));

	switch (offset)
	{
	case 0x00: m_result = m_reg [0x00] = (m_reg [0x00] & 0xff00) | data;        break;
	case 0x01: m_result = m_reg [0x00] = (m_reg [0x00] & 0x00ff) | (data << 8); break;
	case 0x02: m_result = m_reg [0x01] = (m_reg [0x01] & 0xff00) | data;        break;
	case 0x03: m_result = m_reg [0x01] = (m_reg [0x01] & 0x00ff) | (data << 8); break;
	case 0x04: m_result = m_reg [0x02] = (m_reg [0x02] & 0xff00) | data;        break;
	case 0x05: m_result = m_reg [0x02] = (m_reg [0x02] & 0x00ff) | (data << 8); break;
	case 0x06: m_result = m_reg [0x03] = (m_reg [0x03] & 0xff00) | data;        break;
	case 0x07: m_result = m_reg [0x03] = (m_reg [0x03] & 0x00ff) | (data << 8); break;
	case 0x08: m_result = m_reg [0x04] = (m_reg [0x04] & 0xff00) | data;        break;
	case 0x09: m_result = m_reg [0x04] = (m_reg [0x04] & 0x00ff) | (data << 8); break;

	case 0x0a: m_result = m_reg [0x05] = (m_reg [0x05] & 0xff00) | data;        break;
		/* note: no function loads low part of m_reg [0x05] without performing a computation */

	case 0x0c: m_result = m_reg [0x06] = data; break;
		/* note: no function loads high part of m_reg [0x06] */

	case 0x15: m_result = m_reg [0x07] = (m_reg [0x07] & 0xff00) | data;        break;
	case 0x16: m_result = m_reg [0x07] = (m_reg [0x07] & 0x00ff) | (data << 8); break;

	case 0x1a: m_result = m_reg [0x08] = (m_reg [0x08] & 0xff00) | data;        break;
	case 0x1b: m_result = m_reg [0x08] = (m_reg [0x08] & 0x00ff) | (data << 8); break;

	case 0x0d: m_result = REGa = (REGa & 0xff00) | data;        break;
	case 0x0e: m_result = REGa = (REGa & 0x00ff) | (data << 8); break;
	case 0x0f: m_result = REGb = (REGb & 0xff00) | data;        break;
	case 0x10: m_result = REGb = (REGb & 0x00ff) | (data << 8); break;

	case 0x17: m_result = m_reg [0x07]; break;
	case 0x19: m_result = m_reg [0x08]; break;
	case 0x18: m_result = m_reg [0x09]; break;

	case 0x0b:

		m_reg [0x05] = (m_reg [0x05] & 0x00ff) | (data << 8);

		REGf = (int16_t)0xffff;
		m_reg [0x04] -= m_reg [0x02];
		m_reg [0x05] -= m_reg [0x03];

	step_048:

		mb_temp = ((int32_t) m_reg [0x00]) * ((int32_t) m_reg [0x04]);
		REGc = mb_temp >> 16;
		REGe = mb_temp & 0xffff;

		mb_temp = ((int32_t) -m_reg [0x01]) * ((int32_t) m_reg [0x05]);
		m_reg [0x07] = mb_temp >> 16;
		mb_q = mb_temp & 0xffff;

		m_reg [0x07] += REGc;

		/* rounding */
		REGe = (REGe >> 1) & 0x7fff;
		REGc = (mb_q >> 1) & 0x7fff;
		mb_q = REGc + REGe;
		if (mb_q < 0)
			m_reg [0x07]++;

		m_result = m_reg [0x07];

		if (REGf < 0)
			break;

		m_reg [0x07] += m_reg [0x02];

		/* fall into command 12 */
		[[fallthrough]];

	case 0x12:

		mb_temp = ((int32_t) m_reg [0x01]) * ((int32_t) m_reg [0x04]);
		REGc = mb_temp >> 16;
		m_reg [0x09] = mb_temp & 0xffff;

		mb_temp = ((int32_t) m_reg [0x00]) * ((int32_t) m_reg [0x05]);
		m_reg [0x08] = mb_temp >> 16;
		mb_q = mb_temp & 0xffff;

		m_reg [0x08] += REGc;

		/* rounding */
		m_reg [0x09] = (m_reg [0x09] >> 1) & 0x7fff;
		REGc = (mb_q >> 1) & 0x7fff;
		m_reg [0x09] += REGc;
		if (m_reg [0x09] < 0)
			m_reg [0x08]++;
		m_reg [0x09] <<= 1;  /* why? only to get the desired load address? */

		m_result = m_reg [0x08];

		if (REGf < 0)
			break;

		m_reg [0x08] += m_reg [0x03];

		m_reg [0x09] &= 0xff00;

		/* fall into command 13 */
		[[fallthrough]];

	case 0x13:
		LOG(("\\nR7: %04x  R8: %04x  R9: %04x\\n", m_reg [0x07], m_reg [0x08], m_reg [0x09]));

		REGc = m_reg [0x09];
		mb_q = m_reg [0x08];
		goto step_0bf;

	case 0x14:
		REGc = REGa;
		mb_q = REGb;

	step_0bf:
		REGe = m_reg [0x07] ^ mb_q;  /* save sign of result */
		REGd = mb_q;
		if (mb_q >= 0)
			mb_q = REGc;
		else
		{
			REGd = - mb_q - 1;
			mb_q = - REGc - 1;
			if ((mb_q < 0) && ((mb_q + 1) < 0))
				REGd++;
			mb_q++;
		}

	/* step 0c9: */
		/* REGc = abs (m_reg [0x07]) */
		if (m_reg [0x07] >= 0)
			REGc = m_reg [0x07];
		else
			REGc = -m_reg [0x07];

		REGf = m_reg [0x06];  /* step counter */

		do
		{
			REGd -= REGc;
			msb = ((mb_q & 0x8000) != 0);
			mb_q <<= 1;
			if (REGd >= 0)
				mb_q++;
			else
				REGd += REGc;
			REGd <<= 1;
			REGd += msb;
		}
		while (--REGf >= 0);

		if (REGe >= 0)
			m_result = mb_q;
		else
			m_result = - mb_q;
		break;

	case 0x11:
		m_reg [0x05] = (m_reg [0x05] & 0x00ff) | (data << 8);
		REGf = 0x0000;  /* do everything in one step */
		goto step_048;
		//break; // never reached

	case 0x1c:
		/* window test? */
		m_reg [0x05] = (m_reg [0x05] & 0x00ff) | (data << 8);
		do
		{
			REGe = (m_reg [0x04] + m_reg [0x07]) >> 1;
			REGf = (m_reg [0x05] + m_reg [0x08]) >> 1;
			if ((REGb < REGe) && (REGf < REGe) && ((REGe + REGf) >= 0))
			{ m_reg [0x07] = REGe; m_reg [0x08] = REGf; }
			else
			{ m_reg [0x04] = REGe; m_reg [0x05] = REGf; }
		}
		while (--m_reg [0x06] >= 0);

		m_result = m_reg [0x08];
		break;

	case 0x1d:
		m_reg [0x03] = (m_reg [0x03] & 0x00ff) | (data << 8);

		m_reg [0x02] -= m_reg [0x00];
		if (m_reg [0x02] < 0)
			m_reg [0x02] = -m_reg [0x02];

		m_reg [0x03] -= m_reg [0x01];
		if (m_reg [0x03] < 0)
			m_reg [0x03] = -m_reg [0x03];

		/* fall into command 1e */
		[[fallthrough]];

	case 0x1e:
		/* result = max (m_reg [0x02], m_reg [0x03]) + 3/8 * min (m_reg [0x02], m_reg [0x03]) */
		if (m_reg [0x03] >= m_reg [0x02])
		{ REGc = m_reg [0x02]; REGd = m_reg [0x03]; }
		else
		{ REGd = m_reg [0x02]; REGc = m_reg [0x03]; }
		REGc >>= 2;
		REGd += REGc;
		REGc >>= 1;
		m_result = REGd = (REGc + REGd);
		break;

	case 0x1f:
		logerror("math box function 0x1f\\n");
		/* $$$ do some computation here (selftest? signature analysis? */
		break;
	}

	LOG(("  result %04x\\n", m_result & 0xffff));'};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range14'}) SET n:AddressRange SET n += {start: 8192, end: 12287, raw: 'map(0x2000, 0x2fff).ram()', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 356, sourceColumn: 2, sourceEndLine: 356, ram: true};
MERGE (n:KG {id: 'map:bzone_state.bzone_map/range15'}) SET n:AddressRange SET n += {start: 12288, end: 32767, raw: 'map(0x3000, 0x7fff).rom()', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 357, sourceColumn: 2, sourceEndLine: 357, rom: true};
MERGE (n:KG {id: 'machine:bzone_state.bzone_base'}) SET n:MachineConfig SET n += {cls: 'bzone_state', name: 'bzone_base', calls: [], stateMembers: ['{"name":"m_analog_data","bits":8}'], sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 608, sourceColumn: 1, sourceEndLine: 631};
MERGE (n:KG {id: 'device:bzone_state.bzone_base/maincpu'}) SET n:Device SET n += {type: 'M6502', tag: 'maincpu', clock: 1512000, config: ['M6502(config, m_maincpu, BZONE_MASTER_CLOCK / 8)', 'm_maincpu->set_addrmap(AS_PROGRAM, &bzone_state::bzone_map)', 'm_maincpu->set_periodic_int(FUNC(bzone_state::bzone_interrupt), attotime::from_hz(BZONE_CLOCK_3KHZ / 12))'], member: 'm_maincpu', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 611, sourceColumn: 2, sourceEndLine: 611};
MERGE (n:KG {id: 'device:bzone_state.bzone_base/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_periodic_int', operation: 'set_periodic_int', raw: 'm_maincpu->set_periodic_int(FUNC(bzone_state::bzone_interrupt), attotime::from_hz(BZONE_CLOCK_3KHZ / 12))', ownerTag: 'maincpu', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 613, sourceColumn: 2, sourceEndLine: 613, periodHz: 246.09375, periodExpr: 'attotime::from_hz(BZONE_CLOCK_3KHZ / 12)', targetClass: 'bzone_state', targetMethod: 'bzone_interrupt'};
MERGE (n:KG {id: 'handler:bzone_state.bzone_interrupt'}) SET n:Handler SET n += {method: 'bzone_interrupt', ownerClass: 'bzone_state', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 265, sourceParameters: 'device_t &device', sourceBody: 'if (ioport("IN0")->read() & 0x10)
		device.execute().pulse_input_line(INPUT_LINE_NMI, attotime::zero);'};
MERGE (n:KG {id: 'device:bzone_state.bzone_base/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 615, sourceColumn: 2, sourceEndLine: 615};
MERGE (n:KG {id: 'device:bzone_state.bzone_base/vector'}) SET n:Device SET n += {type: 'VECTOR', tag: 'vector', clock: null, config: ['VECTOR(config, "vector")'], sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618};
MERGE (n:KG {id: 'device:bzone_state.bzone_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_VECTOR)', 'm_screen->set_refresh_hz(BZONE_CLOCK_3KHZ / 12 / 6)', 'm_screen->set_size(400, 300)', 'm_screen->set_visarea(0, 580, 0, 400)', 'm_screen->set_screen_update("vector", FUNC(vector_device::screen_update))'], member: 'm_screen', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 619, sourceColumn: 2, sourceEndLine: 619, configCalls: ['set_refresh_hz(41.015625)', 'set_size(400,300)', 'set_visarea(0,580,0,400)'], clockExpr: 'SCREEN_TYPE_VECTOR', screenRefreshHz: 41.015625, screenSize: [400, 300], screenVisarea: [0, 580, 0, 400]};
MERGE (n:KG {id: 'device:bzone_state.bzone_base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update("vector", FUNC(vector_device::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 623, sourceColumn: 2, sourceEndLine: 623, targetTag: 'vector', targetClass: 'vector_device', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:vector_device.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'vector_device', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 623, sourceColumn: 2, sourceEndLine: 623};
MERGE (n:KG {id: 'device:bzone_state.bzone_base/avg'}) SET n:Device SET n += {type: 'AVG_BZONE', tag: 'avg', clock: null, config: ['avg_device &avg(AVG_BZONE(config, "avg"))', 'avg.set_vector("vector")', 'avg.set_memory(m_maincpu, AS_PROGRAM, 0x2000)'], sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 625, sourceColumn: 2, sourceEndLine: 625, configCalls: ['set_vector("vector")', 'set_memory("maincpu",0,8192)']};
MERGE (n:KG {id: 'device:bzone_state.bzone_base/mathbox'}) SET n:Device SET n += {type: 'MATHBOX', tag: 'mathbox', clock: 0, config: ['MATHBOX(config, m_mathbox)'], member: 'm_mathbox', cls: 'mathbox_device', clsHierarchy: ['mathbox_device'], sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 630, sourceColumn: 2, sourceEndLine: 630, startHandler: 'mathbox_device.device_start'};
MERGE (n:KG {id: 'machine:bzone_state.bzone'}) SET n:MachineConfig SET n += {cls: 'bzone_state', name: 'bzone', calls: ['bzone_base', 'bzone_audio'], stateMembers: ['{"name":"m_analog_data","bits":8}'], sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 633, sourceColumn: 1, sourceEndLine: 639};
MERGE (n:KG {id: 'machine:bzone_state.bzone_audio'}) SET n:MachineConfig SET n += {cls: 'bzone_state', name: 'bzone_audio', calls: [], stateMembers: ['{"name":"m_analog_data","bits":8}'], sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 399, sourceColumn: 1, sourceEndLine: 409};
MERGE (n:KG {id: 'device:bzone_state.bzone_audio/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 401, sourceColumn: 2, sourceEndLine: 401};
MERGE (n:KG {id: 'device:bzone_state.bzone_audio/pokey'}) SET n:Device SET n += {type: 'POKEY', tag: 'pokey', clock: 1512000, config: ['pokey_device &pokey(POKEY(config, "pokey", BZONE_MASTER_CLOCK / 8))', 'pokey.allpot_r().set_ioport("IN3")', 'pokey.set_output_rc(RES_K(10), CAP_U(0.015), 5.0)', 'pokey.add_route(0, "discrete", 1.0, 0)'], sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 403, sourceColumn: 2, sourceEndLine: 403, configCalls: ['add_route(0,"discrete",1,0)']};
MERGE (n:KG {id: 'audioroute:device:bzone_state.bzone_audio/pokey/0'}) SET n:AudioRoute SET n += {output: '0', target: 'discrete', gain: 1, input: 0, raw: 'pokey.add_route(0, "discrete", 1.0, 0)', sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 406, sourceColumn: 2, sourceEndLine: 406};
MERGE (n:KG {id: 'device:bzone_state.bzone_audio/pokey/callback:pokey:0'}) SET n:Callback SET n += {signal: 'allpot_r', operation: 'set_ioport', raw: 'pokey.allpot_r().set_ioport("IN3")', ownerTag: 'pokey', sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 404, sourceColumn: 2, sourceEndLine: 404, targetTag: 'IN3', targetPort: 'IN3'};
MERGE (n:KG {id: 'device:bzone_state.bzone_audio/discrete'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'discrete', clock: null, config: ['DISCRETE(config, "discrete", bzone_discrete).add_route(ALL_OUTPUTS, "mono", 1.0)'], member: 'm_discrete', sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 408, sourceColumn: 2, sourceEndLine: 408, clockExpr: 'bzone_discrete'};
MERGE (n:KG {id: 'audioroute:device:bzone_state.bzone_audio/discrete/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'DISCRETE(config, "discrete", bzone_discrete).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 408, sourceColumn: 2, sourceEndLine: 408};
MERGE (n:KG {id: 'handler:mathbox_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'mathbox_device', sourceFile: 'src/mame/atari/mathbox.cpp', sourceLine: 51, sourceColumn: 1, sourceEndLine: 56, sourceParameters: '', sourceBody: '/* register for save states */
	save_item(NAME(m_result));
	save_item(NAME(m_reg));'};
MERGE (n:KG {id: 'inputs:bzone'}) SET n:InputPorts SET n += {name: 'bzone', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 488, sourceColumn: 8, sourceEndLine: 488};
MERGE (n:KG {id: 'inputs:bzone/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:bzone/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:bzone/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:bzone/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 12, activeLow: true, type: 'IPT_UNUSED', defaultValue: 12};
MERGE (n:KG {id: 'inputs:bzone/IN0/f3'}) SET n:PortField SET n += {kind: 'service', mask: 16, activeLow: true, defaultValue: 16};
MERGE (n:KG {id: 'inputs:bzone/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_SERVICE1', modifiers: ['PORT_NAME("Diagnostic Step")'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:bzone/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("avg", FUNC(avg_device::done_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(bzone_state::clock_r))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:bzone_state.clock_r'}) SET n:Handler SET n += {method: 'clock_r', ownerClass: 'bzone_state', sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 275, sourceColumn: 1, sourceEndLine: 278, sourceParameters: '', sourceBody: 'return (m_maincpu->total_cycles() & 0x100) ? 1 : 0;'};
MERGE (n:KG {id: 'inputs:bzone/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:bzone/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("M10:1,2")'], name: 'Lives', defaultValue: 1, location: 'M10:1,2', settings: ['0=2', '1=3', '2=4', '3=5']};
MERGE (n:KG {id: 'inputs:bzone/DSW0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("M10:3,4")'], name: 'Missile appears at', defaultValue: 4, location: 'M10:3,4', settings: ['0=5000', '4=10000', '8=20000', '12=30000']};
MERGE (n:KG {id: 'inputs:bzone/DSW0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("M10:5,6")'], name: 'Bonus Life', defaultValue: 16, location: 'M10:5,6', settings: ['16=15k and 100k', '32=25k and 100k', '48=50k and 100k', '0=None']};
MERGE (n:KG {id: 'inputs:bzone/DSW0/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION("M10:7,8")'], name: 'Language', defaultValue: 0, location: 'M10:7,8', settings: ['0=English', '64=German', '128=French', '192=Spanish']};
MERGE (n:KG {id: 'inputs:bzone/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:bzone/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("P10:1,2")'], name: 'Coinage', defaultValue: 3, location: 'P10:1,2', settings: ['3=2C 1C', '2=1C 1C', '1=1C 2C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:bzone/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("P10:3,4")'], name: 'Coin B', defaultValue: 0, location: 'P10:3,4', settings: ['0=*1', '4=*4', '8=*5', '12=*6']};
MERGE (n:KG {id: 'inputs:bzone/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("P10:5")'], name: 'Coin A', defaultValue: 0, location: 'P10:5', settings: ['0=*1', '16=*2']};
MERGE (n:KG {id: 'inputs:bzone/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 224, modifiers: ['PORT_DIPLOCATION("P10:6,7,8")'], name: 'Bonus Coins', defaultValue: 0, location: 'P10:6,7,8', settings: ['0=None', '32=3 credits/2 coins', '64=5 credits/4 coins', '96=6 credits/4 coins', '128=6 credits/5 coins']};
MERGE (n:KG {id: 'inputs:bzone/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: false};
MERGE (n:KG {id: 'inputs:bzone/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICKRIGHT_DOWN', modifiers: ['PORT_2WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/IN3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICKRIGHT_UP', modifiers: ['PORT_2WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/IN3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICKLEFT_DOWN', modifiers: ['PORT_2WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/IN3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICKLEFT_UP', modifiers: ['PORT_2WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/IN3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/IN3/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_START1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/IN3/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_START2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/IN3/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bzone/R11'}) SET n:Port SET n += {tag: 'R11', modify: false};
MATCH (a:KG {id: 'game:bzone'}), (b:KG {id: 'file:src/mame/atari/bzone.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 1014, sourceColumn: 1, sourceEndLine: 1014};
MATCH (a:KG {id: 'game:bzone'}), (b:KG {id: 'machine:bzone_state.bzone'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:bzone'}), (b:KG {id: 'inputs:bzone'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:bzone'}), (b:KG {id: 'romset:bzone'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:bzone.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:video/avgdvg.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:video/vector.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:sound/pokey.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:bzone.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone.cpp'}), (b:KG {id: 'file:redbaron.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone'}), (b:KG {id: 'file:src/mame/atari/bzone.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 633, sourceColumn: 1, sourceEndLine: 639};
MATCH (a:KG {id: 'machine:bzone_state.bzone'}), (b:KG {id: 'machine:bzone_state.bzone_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:bzone_state.bzone'}), (b:KG {id: 'machine:bzone_state.bzone_audio'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'inputs:bzone'}), (b:KG {id: 'file:src/mame/atari/bzone.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 488, sourceColumn: 8, sourceEndLine: 488};
MATCH (a:KG {id: 'inputs:bzone'}), (b:KG {id: 'inputs:bzone/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bzone'}), (b:KG {id: 'inputs:bzone/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bzone'}), (b:KG {id: 'inputs:bzone/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bzone'}), (b:KG {id: 'inputs:bzone/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bzone'}), (b:KG {id: 'inputs:bzone/R11'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:bzone'}), (b:KG {id: 'file:src/mame/atari/bzone.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 713, sourceColumn: 1, sourceEndLine: 713};
MATCH (a:KG {id: 'romset:bzone'}), (b:KG {id: 'region:bzone/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bzone'}), (b:KG {id: 'region:bzone/avg:prom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bzone'}), (b:KG {id: 'region:bzone/user2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bzone'}), (b:KG {id: 'region:bzone/user3'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_base'}), (b:KG {id: 'file:src/mame/atari/bzone.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 608, sourceColumn: 1, sourceEndLine: 631};
MATCH (a:KG {id: 'machine:bzone_state.bzone_base'}), (b:KG {id: 'device:bzone_state.bzone_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_base'}), (b:KG {id: 'device:bzone_state.bzone_base/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_base'}), (b:KG {id: 'device:bzone_state.bzone_base/vector'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_base'}), (b:KG {id: 'device:bzone_state.bzone_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_base'}), (b:KG {id: 'device:bzone_state.bzone_base/avg'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_base'}), (b:KG {id: 'device:bzone_state.bzone_base/mathbox'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_audio'}), (b:KG {id: 'file:src/mame/atari/bzone_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/bzone_a.cpp', sourceLine: 399, sourceColumn: 1, sourceEndLine: 409};
MATCH (a:KG {id: 'machine:bzone_state.bzone_audio'}), (b:KG {id: 'device:bzone_state.bzone_audio/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_audio'}), (b:KG {id: 'device:bzone_state.bzone_audio/pokey'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bzone_state.bzone_audio'}), (b:KG {id: 'device:bzone_state.bzone_audio/discrete'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN0'}), (b:KG {id: 'inputs:bzone/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN0'}), (b:KG {id: 'inputs:bzone/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN0'}), (b:KG {id: 'inputs:bzone/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN0'}), (b:KG {id: 'inputs:bzone/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN0'}), (b:KG {id: 'inputs:bzone/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN0'}), (b:KG {id: 'inputs:bzone/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN0'}), (b:KG {id: 'inputs:bzone/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/DSW0'}), (b:KG {id: 'inputs:bzone/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/DSW0'}), (b:KG {id: 'inputs:bzone/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/DSW0'}), (b:KG {id: 'inputs:bzone/DSW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/DSW0'}), (b:KG {id: 'inputs:bzone/DSW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/DSW1'}), (b:KG {id: 'inputs:bzone/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/DSW1'}), (b:KG {id: 'inputs:bzone/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/DSW1'}), (b:KG {id: 'inputs:bzone/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/DSW1'}), (b:KG {id: 'inputs:bzone/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN3'}), (b:KG {id: 'inputs:bzone/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN3'}), (b:KG {id: 'inputs:bzone/IN3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN3'}), (b:KG {id: 'inputs:bzone/IN3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN3'}), (b:KG {id: 'inputs:bzone/IN3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN3'}), (b:KG {id: 'inputs:bzone/IN3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN3'}), (b:KG {id: 'inputs:bzone/IN3/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN3'}), (b:KG {id: 'inputs:bzone/IN3/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN3'}), (b:KG {id: 'inputs:bzone/IN3/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:bzone/maincpu'}), (b:KG {id: 'rom:bzone/maincpu/036414-02.e1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/maincpu'}), (b:KG {id: 'rom:bzone/maincpu/036413-01.h1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/maincpu'}), (b:KG {id: 'rom:bzone/maincpu/036412-01.j1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/maincpu'}), (b:KG {id: 'rom:bzone/maincpu/036411-01.k1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/maincpu'}), (b:KG {id: 'rom:bzone/maincpu/036410-01.lm1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/maincpu'}), (b:KG {id: 'rom:bzone/maincpu/036409-01.n1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/maincpu'}), (b:KG {id: 'rom:bzone/maincpu/036422-01.bc3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/maincpu'}), (b:KG {id: 'rom:bzone/maincpu/036421-01.a3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/avg:prom'}), (b:KG {id: 'rom:bzone/avg:prom/036408-01.k7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/user2'}), (b:KG {id: 'rom:bzone/user2/036174-01.b1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/user3'}), (b:KG {id: 'rom:bzone/user3/036175-01.m1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/user3'}), (b:KG {id: 'rom:bzone/user3/036176-01.l1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/user3'}), (b:KG {id: 'rom:bzone/user3/036177-01.k1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/user3'}), (b:KG {id: 'rom:bzone/user3/036178-01.j1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/user3'}), (b:KG {id: 'rom:bzone/user3/036179-01.h1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bzone/user3'}), (b:KG {id: 'rom:bzone/user3/036180-01.f1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_base/maincpu'}), (b:KG {id: 'device:bzone_state.bzone_base/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_base/maincpu'}), (b:KG {id: 'map:bzone_state.bzone_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:bzone_state.bzone_base/screen'}), (b:KG {id: 'device:bzone_state.bzone_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_base/mathbox'}), (b:KG {id: 'handler:mathbox_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone_a.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone_a.cpp'}), (b:KG {id: 'file:bzone.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone_a.cpp'}), (b:KG {id: 'file:sound/discrete.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone_a.cpp'}), (b:KG {id: 'file:sound/pokey.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/bzone_a.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_audio/pokey'}), (b:KG {id: 'audioroute:device:bzone_state.bzone_audio/pokey/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_audio/pokey'}), (b:KG {id: 'device:bzone_state.bzone_audio/pokey/callback:pokey:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_audio/discrete'}), (b:KG {id: 'audioroute:device:bzone_state.bzone_audio/discrete/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:bzone/IN0/f6'}), (b:KG {id: 'handler:bzone_state.clock_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_base/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:bzone_state.bzone_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'file:src/mame/atari/bzone.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/bzone.cpp', sourceLine: 339, sourceColumn: 1, sourceEndLine: 358};
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map'}), (b:KG {id: 'map:bzone_state.bzone_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_base/screen/callback:screen:0'}), (b:KG {id: 'handler:vector_device.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bzone_state.bzone_base/screen/callback:screen:0'}), (b:KG {id: 'device:bzone_state.bzone_base/vector'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range4'}), (b:KG {id: 'handler:bzone_state.bzone_coin_counter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range5'}), (b:KG {id: 'handler:avg_device.go_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'avg'};
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range6'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range7'}), (b:KG {id: 'handler:avg_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'avg'};
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range8'}), (b:KG {id: 'handler:mathbox_device.status_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'mathbox'};
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range9'}), (b:KG {id: 'handler:mathbox_device.lo_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'mathbox'};
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range10'}), (b:KG {id: 'handler:mathbox_device.hi_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'mathbox'};
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range11'}), (b:KG {id: 'handler:pokey_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range11'}), (b:KG {id: 'handler:pokey_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range12'}), (b:KG {id: 'handler:bzone_state.bzone_sounds_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bzone_state.bzone_map/range13'}), (b:KG {id: 'handler:mathbox_device.go_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mathbox'};
