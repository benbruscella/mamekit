// Self-test for the console-aware parser extensions. Run with:
//   node src/kg/parse.spec.ts
// Covers: CONS/SYST/COMP game rows (the SYST macro family has a COMPAT field
// and no MONITOR), SOFTWARE_LIST config declarations, the console screen
// setter trio (set_refresh_hz/set_size/set_visarea), and slot-device default
// option capture — plus a GAME-row regression so the arcade path can't drift.

import {
  evalExpr,
  parseAddressMaps,
  parseDefines,
  parseGames,
  parseGfxLayouts,
  parseInitRomTransforms,
  parseInputPorts,
  parseInstalledHandlers,
  parseMachineConfigs,
  parseMemberTags,
  parseMemoryBanks,
  parseEnumConstants,
  parseRomSets,
} from './parse.ts';

let totalPass = 0;
let totalFail = 0;

function eq(label: string, actual: unknown, expected: unknown): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    totalPass++;
  } else {
    totalFail++;
    console.log(`  FAIL ${label}: got ${a}, want ${e}`);
  }
}

eq('driver-init address-space installs lower as executable map overrides',
  parseInstalledHandlers(`
    m_maincpu->space(AS_PROGRAM).install_write_handler(0x5004, 0x5004,
      write8smo_delegate(*this, FUNC(board_state::protection_w)));
    m_maincpu->space(AS_PROGRAM).install_read_handler(0x5080, 0x50bf,
      read8sm_delegate(*this, FUNC(board_state::protection_r)));
  `, {}), [
    { space: 'AS_PROGRAM', kind: 'write', start: 0x5004, end: 0x5004,
      className: 'board_state', method: 'protection_w' },
    { space: 'AS_PROGRAM', kind: 'read', start: 0x5080, end: 0x50bf,
      className: 'board_state', method: 'protection_r' },
  ]);

// --- machine config: inherited address-map removal --------------------------
{
  const [cfg] = parseMachineConfigs(`
void system1_state::sys1pio(machine_config &config)
{
  sys1ppi(config);
  config.device_remove("ppi8255");
}
`, {}, {});
  eq('device_remove keeps the inherited device tag', cfg.removedDevices, [{
    tag: 'ppi8255',
    raw: 'config.device_remove("ppi8255")',
  }]);
}

{
  const [cfg] = parseMachineConfigs(`
void pengo_state::pengou(machine_config &config)
{
  pengo(config);
  m_maincpu->remove_addrmap(AS_OPCODES);
}
`, { m_maincpu: 'maincpu' }, {});
  eq('remove_addrmap keeps the inherited device tag and space', cfg.removedAddrMaps, [{
    tag: 'maincpu',
    space: 'AS_OPCODES',
    raw: 'm_maincpu->remove_addrmap(AS_OPCODES)',
  }]);
}

{
  const [cfg] = parseMachineConfigs(`
void system1_state::upndown(machine_config &config)
{
  sys1ppi(config);
  segacrpt_z80_device &z80(SEGA_315_5098(config.replace(), m_maincpu, MASTER_CLOCK / 5));
  encrypted_sys1ppi_maps(config);
  z80.set_decrypted_tag(":decrypted_opcodes");
}
`, { m_maincpu: 'maincpu' }, { MASTER_CLOCK: 15_468_480 });
  eq('config.replace device patch', cfg?.devicePatches[0], {
    tag: 'maincpu',
    config: [
      'segacrpt_z80_device &z80(SEGA_315_5098(config.replace(), m_maincpu, MASTER_CLOCK / 5))',
      'z80.set_decrypted_tag(":decrypted_opcodes")',
    ],
    replacementType: 'SEGA_315_5098',
    clock: 3_093_696,
  });
}

{
  const [cfg] = parseMachineConfigs(`
void board_state::board(machine_config &config)
{
  Z80(config, ":audiocpu", 4000000);
}
`, {}, {});
  eq('absolute MAME device tags normalize to their device and ROM name', cfg.devices[0]?.tag,
    'audiocpu');
}

eq('expression bitwise precedence', evalExpr('(3 << 4) | (7 & 3) ^ 1'), 48 | (3 ^ 1));

eq('memory-region finder configures a source-derived bank entry', parseMemoryBanks(`
  m_bank1->configure_entry(0, m_maincpu_region->base() + 0x8000);
`, { m_bank1: 'bank1', m_maincpu_region: 'maincpu' }, {}), [{
  member: 'm_bank1', tag: 'bank1', startEntry: 0, entries: 1,
  region: 'maincpu', offset: 0x8000, stride: 0,
  raw: 'm_bank1->configure_entry(0, m_maincpu_region->base() + 0x8000)',
}]);

eq('service DIP keeps its source default and polarity', parseInputPorts(`
INPUT_PORTS_START( board )
  PORT_START("DSW")
  PORT_SERVICE_DIPLOC( 0x80, 0x80, "SW:8" )
INPUT_PORTS_END
`)[0]?.ports[0]?.fields[0], {
  kind: 'service',
  mask: 0x80,
  defaultValue: 0x80,
  activeLow: true,
});

eq('PORT_SERVICE active-low token produces a released-high default', parseInputPorts(`
INPUT_PORTS_START( board )
  PORT_START("SERVICE")
  PORT_SERVICE( 0x01, IP_ACTIVE_LOW )
INPUT_PORTS_END
`)[0]?.ports[0]?.fields[0], {
  kind: 'service',
  mask: 0x01,
  defaultValue: 0x01,
  activeLow: true,
});

eq('PORT_SERVICE_NO_TOGGLE active-low token produces a released-high default', parseInputPorts(`
INPUT_PORTS_START( board )
  PORT_START("SERVICE")
  PORT_SERVICE_NO_TOGGLE( 0x10, IP_ACTIVE_LOW )
INPUT_PORTS_END
`)[0]?.ports[0]?.fields[0], {
  kind: 'service',
  mask: 0x10,
  defaultValue: 0x10,
  activeLow: true,
});

eq('all PORT_INCLUDE declarations are preserved in source order', parseInputPorts(`
INPUT_PORTS_START( board )
  PORT_INCLUDE( controls )
  PORT_INCLUDE( system )
  PORT_INCLUDE( dips )
INPUT_PORTS_END
`)[0]?.includes, ['controls', 'system', 'dips']);

eq('nested symbolic STEP gfx offsets expand', parseGfxLayouts(`
static const gfx_layout sprites = {
  16, 1, RGN_FRAC(1,4), 1,
  { 0 },
  { STEP8(0,1), STEP8(RGN_FRAC(1,4),1) },
  { 0 },
  16
};
`)[0]?.xOffsets, [
  0, 1, 2, 3, 4, 5, 6, 7,
  'RGN_FRAC(1,4)', 'RGN_FRAC(1,4)+1', 'RGN_FRAC(1,4)+2',
  'RGN_FRAC(1,4)+3', 'RGN_FRAC(1,4)+4', 'RGN_FRAC(1,4)+5',
  'RGN_FRAC(1,4)+6', 'RGN_FRAC(1,4)+7',
]);

eq('disabled diagnostic ROM is excluded', parseRomSets(`
ROM_START( board )
  ROM_REGION( 0x4000, "maincpu", 0 )
  ROM_LOAD( "program.bin", 0, 0x2000, CRC(11111111) )
#if 0
  ROM_LOAD( "diagnostic.bin", 0x2000, 0x2000, CRC(22222222) )
#endif
  ROM_REGION( 0x2000, "tiles", 0 )
  ROM_LOAD( "tiles.bin", 0, 0x2000, CRC(33333333) )
ROM_END
`)[0]?.regions.map(region => region.loads.map(load => load.file)), [
  ['program.bin'],
  ['tiles.bin'],
]);

{
  const regions = parseRomSets(`
ROM_START( splitgfx )
  ROM_REGION( 0x0800, "gfx1", 0 )
  ROM_LOAD( "graphics.bin", 0x0000, 0x0800, CRC(11111111) )
  ROM_IGNORE( 0x0800 )
  ROM_REGION( 0x0800, "gfx2", 0 )
  ROM_LOAD( "graphics.bin", 0x0000, 0x0800, CRC(11111111) )
  ROM_CONTINUE(               0x0000, 0x0800 )
ROM_END
`)[0]!.regions;
  eq('ROM_IGNORE leaves the first half in the first region',
    regions[0]!.loads[0]!.continueSegments, []);
  eq('ROM_CONTINUE reads the next file half into the second region',
    regions[1]!.loads[0]!.continueSegments,
    [{ offset: 0, size: 0x800, fileOffset: 0x800 }]);
}

eq('memory bank configure_entries', parseMemoryBanks(
  'm_mainbank->configure_entries(0, 16, memregion("maincpu")->base() + 0x10000, 0x1000);',
  { m_mainbank: 'mainbank' },
  {},
), [{
  member: 'm_mainbank',
  tag: 'mainbank',
  startEntry: 0,
  entries: 16,
  region: 'maincpu',
  offset: 0x10000,
  stride: 0x1000,
  raw: 'm_mainbank->configure_entries(0, 16, memregion("maincpu")->base() + 0x10000, 0x1000)',
}]);

eq('tagged memory bank configured from driver init', parseMemoryBanks(
  `
  uint8_t *ROM = memregion("maincpu")->base();
  membank("bank1")->configure_entries(0, 8, &ROM[0x10000], 0x4000);
  `,
  {},
  {},
), [{
  member: 'bank1',
  tag: 'bank1',
  startEntry: 0,
  entries: 8,
  region: 'maincpu',
  offset: 0x10000,
  stride: 0x4000,
  raw: 'membank("bank1")->configure_entries(0, 8, &ROM[0x10000], 0x4000)',
}]);

eq('indexed memory-bank array entries', parseMemoryBanks(
  `
  m_rombanks[0]->configure_entries(0, 2, memregion("maincpu")->base() + 0x2000, 0x1000);
  m_rombanks[1]->configure_entries(0, 2, memregion("maincpu")->base() + 0x2000, 0x1000);
  `,
  {
    'm_rombanks[0]': 'bank1',
    'm_rombanks[1]': 'bank2',
  },
  {},
).map(bank => ({
  member: bank.member,
  tag: bank.tag,
  entryOffsets: Array.from(
    { length: bank.entries },
    (_unused, index) => bank.offset + index * bank.stride,
  ),
})), [
  { member: 'm_rombanks[0]', tag: 'bank1', entryOffsets: [0x2000, 0x3000] },
  { member: 'm_rombanks[1]', tag: 'bank2', entryOffsets: [0x2000, 0x3000] },
]);

// --- extended graphics layout offsets ---------------------------------------
{
  const [layout] = parseGfxLayouts(`
static const uint32_t wide_xoffset[4] = { STEP4(0x20, 2) };
static const uint32_t wide_yoffset[2] = { 0x100, 0x180 };
static const gfx_layout wide_layout = {
  4, 2, 1, 2, { 4, 0 },
  EXTENDED_XOFFS, EXTENDED_YOFFS, 0x200,
  wide_xoffset, wide_yoffset
};
`);
  eq('extended gfx x offsets', layout?.xOffsets, [0x20, 0x22, 0x24, 0x26]);
  eq('extended gfx y offsets', layout?.yOffsets, [0x100, 0x180]);
}

// --- CONS row (nes.cpp:775) --------------------------------------------------
{
  const src = `
CONS( 1985, nes, 0, 0, nes, nes, nes_state, empty_init, "Nintendo", "Nintendo Entertainment System / Famicom (NTSC)", MACHINE_IMPERFECT_GRAPHICS | MACHINE_SUPPORTS_SAVE )
CONS( 1983, famicom, 0, nes, famicom, famicom, nes_state, init_famicom, "Nintendo", "Famicom", MACHINE_IMPERFECT_GRAPHICS | MACHINE_SUPPORTS_SAVE )
`;
  const games = parseGames(src);
  eq('cons count', games.length, 2);
  const nes = games[0];
  eq('cons kind', nes.kind, 'console');
  eq('cons name', nes.name, 'nes');
  eq('cons parent', nes.parent, '0');
  eq('cons compat', nes.compat, '0');
  eq('cons machine', nes.machine, 'nes');
  eq('cons input', nes.input, 'nes');
  eq('cons cls', nes.cls, 'nes_state');
  eq('cons init', nes.init, 'empty_init');
  eq('cons monitor implied ROT0', nes.monitor, 'ROT0');
  eq('cons company', nes.company, 'Nintendo');
  eq('cons flags', nes.flags, 'MACHINE_IMPERFECT_GRAPHICS | MACHINE_SUPPORTS_SAVE');
  const fam = games[1];
  eq('famicom compat group', fam.compat, 'nes');
  eq('famicom machine', fam.machine, 'famicom');
  eq('famicom init', fam.init, 'init_famicom');
}

// --- "19??" year rows parse (question-mark years occur in console lists) -----
{
  const games = parseGames(`CONS( 198?, mysys, 0, 0, mysys, mysys, my_state, empty_init, "Acme", "Mystery", 0 )`);
  eq('?-year row parses', games.length, 1);
  eq('?-year value', games[0]?.year, '198?');
}

// --- GAME row regression (galaga.cpp shape must not drift) --------------------
{
  const src = `GAME( 1981, galaga, 0, galaga, galaga, galaga_state, init_galaga, ROT90, "Namco", "Galaga (Namco rev. B)", MACHINE_SUPPORTS_SAVE )`;
  const [gm] = parseGames(src);
  eq('game kind', gm.kind, 'arcade');
  eq('game compat', gm.compat, '0');
  eq('game monitor', gm.monitor, 'ROT90');
  eq('game machine', gm.machine, 'galaga');
  eq('game company', gm.company, 'Namco');
}

// --- machine config: SOFTWARE_LIST + screen setters + slot defaults ----------
{
	const body = `
void nes_state::nes(machine_config &config)
{
	rp2a03_device &maincpu(RP2A03G(config, m_maincpu, NTSC_APU_CLOCK));
	maincpu.set_addrmap(AS_PROGRAM, &nes_state::nes_map);
	maincpu.add_route(0, "mono", 0.60, 2);
	DAC_8BIT_R2R(config, "dac", 0).add_route(ALL_OUTPUTS, "mono", 0.25);

	MCFG_MACHINE_START_OVERRIDE(nes_state, nes)
	MCFG_MACHINE_RESET_OVERRIDE(nes_state, nes)

	SCREEN(config, m_screen, SCREEN_TYPE_RASTER);
	m_screen->set_video_attributes(VIDEO_UPDATE_SCANLINE);
	m_screen->set_refresh_hz(60.0988);
	m_screen->set_size(32*8, 262);
	m_screen->set_visarea(0*8, 32*8-1, 0*8, 30*8-1);

	NES_CONTROL_PORT(config, m_ctrl1, nes_control_port1_devices, "joypad").set_screen_tag(m_screen);
	NES_CONTROL_PORT(config, m_special, nes_control_special_devices, nullptr).set_screen_tag(m_screen);
	NES_CART_SLOT(config, m_cartslot, NTSC_APU_CLOCK, nes_cart, nullptr).set_must_be_loaded(true);

	SOFTWARE_LIST(config, "cart_list").set_original("nes").set_filter("!EXP");
	SOFTWARE_LIST(config, "famibox_list").set_compatible("famibox");
}
`;
  const memberTags = {
    m_maincpu: 'maincpu', m_screen: 'screen', m_ctrl1: 'ctrl1',
    m_special: 'special', m_cartslot: 'nes_slot',
  };
  const consts = parseDefines('#define NTSC_APU_CLOCK (XTAL(21\'477\'272)/12)');
  const [cfg] = parseMachineConfigs(body, memberTags, consts);

  eq('softlist count', cfg.softwareLists.length, 2);
  eq('softlist original', cfg.softwareLists[0],
    { tag: 'cart_list', name: 'nes', status: 'original', filter: '!EXP' });
  eq('softlist compatible', cfg.softwareLists[1],
    { tag: 'famibox_list', name: 'famibox', status: 'compatible' });
  eq('softlist not a device', cfg.devices.some(d => d.type === 'SOFTWARE_LIST'), false);

  const cpu = cfg.devices.find(d => d.tag === 'maincpu')!;
  eq('cpu clock from external define', Math.round(cpu.clock!), Math.round(21477272 / 12));
  eq('audio route', cpu.audioRoutes, [{
    output: '0', target: 'mono', gain: 0.6, input: 2,
    raw: 'maincpu.add_route(0, "mono", 0.60, 2)',
  }]);
  const dac = cfg.devices.find(d => d.tag === 'dac')!;
  eq('chained constructor audio route', dac.audioRoutes, [{
    output: 'ALL_OUTPUTS', target: 'mono', gain: 0.25,
    raw: 'DAC_8BIT_R2R(config, "dac", 0).add_route(ALL_OUTPUTS, "mono", 0.25)',
  }]);

  const screen = cfg.devices.find(d => d.tag === 'screen')!;
  eq('screen refresh hz', screen.screenRefreshHz, 60.0988);
  eq('screen size (32*8 arithmetic)', screen.screenSize, { w: 256, h: 262 });
  eq('screen visarea', screen.screenVisarea, { x0: 0, x1: 255, y0: 0, y1: 239 });
  eq('screen video attributes', screen.screenVideoAttributes, ['VIDEO_UPDATE_SCANLINE']);

  const ctrl1 = cfg.devices.find(d => d.tag === 'ctrl1')!;
  eq('slot options table', ctrl1.slotOptions, 'nes_control_port1_devices');
  eq('slot default option', ctrl1.slotDefault, 'joypad');
  const special = cfg.devices.find(d => d.tag === 'special')!;
  eq('nullptr default not captured', special.slotDefault, undefined);
  const cart = cfg.devices.find(d => d.tag === 'nes_slot')!;
  eq('cart slot not mistaken for options slot', cart.slotOptions, undefined);
}

// --- parseDefines seeding (externals first, local wins) ----------------------
{
  const seeded = parseDefines('#define LOCAL (BASE*2)\n#define BASE 7', { BASE: 3 });
  eq('seeded constant resolves', seeded.LOCAL, 6);   // uses seed BASE=3 at eval time
  eq('local redefinition wins', seeded.BASE, 7);
  eq(
    'enum constants resolve included values',
    parseEnumConstants('enum { TIN = LINE_MAX, IS3, STBY };', { LINE_MAX: 1 }),
    { LINE_MAX: 1, TIN: 1, IS3: 2, STBY: 3 },
  );
}

// --- MAME inline address-map lambdas become named generated handlers ---------
{
  const [map] = parseAddressMaps(`
void timeplt_state::main_map(address_map &map)
{
  map(0xc300, 0xc30f).lw8(NAME([this](offs_t offset, u8 data) {
    m_mainlatch->write_d0(offset >> 1, data);
  }));
}
`);
  const handler = map.ranges[0]?.write;
  eq('lw8 inline handler name', handler?.method, '__inline_main_map_c300_lw8');
  eq('lw8 inline parameters', handler?.inlineParameters, 'offs_t offset, u8 data');
  eq('lw8 inline body', handler?.inlineBody, 'm_mainlatch->write_d0(offset >> 1, data);');
}

{
  const [map] = parseAddressMaps(`
void qix_state::video_map(address_map &map)
{
  map(0x9800, 0x9800).mirror(0x03ff).readonly().share(m_scanline_latch);
}
`);
  eq('readonly shared range', map.ranges[0]?.readonly, true);
  eq('readonly shared tag', map.ranges[0]?.share, 'scanline_latch');
}

{
  const [map] = parseAddressMaps(`
void seicross_state::mcu_map(address_map &map)
{
  map(0x8000, 0xf7ff).rom().region("maincpu", 0x20);
}
`);
  eq('explicit ROM region tag', map.ranges[0]?.region, 'maincpu');
  eq('explicit ROM region offset', map.ranges[0]?.regionOffset, 0x20);
}

{
  const [map] = parseAddressMaps(`
void defender_state::main_map(address_map &map)
{
  map(0xc000, 0xcfff).view(m_rom_view);
  m_rom_view[0](0xc000, 0xc00f).mirror(0x03e0).writeonly().share(m_paletteram);
}
`);
  eq('memory-view entry tag', map.ranges[1]?.viewTag, 'm_rom_view');
  eq('memory-view entry index', map.ranges[1]?.viewEntry, 0);
  eq('memory-view entry share', map.ranges[1]?.share, 'paletteram');
}

{
  const maps = parseAddressMaps(`
void driver_state::io_map(address_map &map)
{
  midway_ssio_device::ssio_input_ports(map, "ssio");
}
void midway_ssio_device::ssio_input_ports(address_map &map, const char *ssio)
{
  map(0x00, 0x04).r(ssio, FUNC(midway_ssio_device::ioport_read));
}
`);
  eq('qualified address-map helper call', maps[0]?.calls, [
    'midway_ssio_device::ssio_input_ports',
  ]);
  eq('address-map helper with tag parameter', maps[1]?.ranges[0]?.read, {
    method: 'ioport_read',
    deviceClass: 'midway_ssio_device',
    deviceRef: 'ssio',
  });
}

// MAME array finders format their tags from a printf pattern and a starting
// index; the machine config references elements by subscript while the address
// map uses the formatted tag, so both spellings must resolve.
eq('device array finder tags', parseMemberTags(`
	gng_state(const machine_config &mconfig, device_type type, const char *tag) :
		m_maincpu(*this, "maincpu"),
		m_ym(*this, "ym%u", 1)
	{ }
	required_device_array<ym2203_device, 2> m_ym;
`), {
  m_maincpu: 'maincpu',
  m_ym: 'ym%u',
  'm_ym[0]': 'ym1',
  'm_ym[1]': 'ym2',
});

eq('memory-bank array finder tags', parseMemberTags(`
class board_state
{
  required_memory_bank_array<2> m_rombanks;
};
board_state::board_state()
  : m_rombanks(*this, "bank%u", 1U)
{
}
`), {
  m_rombanks: 'bank%u',
  'm_rombanks[0]': 'bank1',
  'm_rombanks[1]': 'bank2',
});

{
  const [cfg] = parseMachineConfigs(`
void board_state::derived(machine_config &config)
{
  base(config);
  m_gfxdecode->set_info(gfx_separate);
}
`, { m_gfxdecode: 'gfxdecode' }, {});
  eq('inherited GFX decode set_info patch', cfg?.gfxDecodePatches, [{
    tag: 'gfxdecode',
    name: 'gfx_separate',
    raw: 'm_gfxdecode->set_info(gfx_separate)',
  }]);
}

{
  const [cfg] = parseMachineConfigs(`
void board_state::derived(machine_config &config)
{
  base(config);
  m_maincpu->set_clock(18.432_MHz_XTAL / 6);
  subdevice<screen_device>("screen")->set_raw(
    18.432_MHz_XTAL / 3, 384, 128, 384, 284, 0, 256);
  subdevice<screen_device>("screen")->set_screen_update(
    FUNC(board_state::screen_update_derived));
}
`, { m_maincpu: 'maincpu' }, {
    '18.432_MHz_XTAL': 18_432_000,
  });
  eq('inherited device setter patches', cfg?.devicePatches, [
    {
      tag: 'maincpu',
      config: ['m_maincpu->set_clock(18.432_MHz_XTAL / 6)'],
      clock: 3_072_000,
    },
    {
      tag: 'screen',
      config: [
        'subdevice<screen_device>("screen")->set_raw(\n    18.432_MHz_XTAL / 3, 384, 128, 384, 284, 0, 256)',
        'subdevice<screen_device>("screen")->set_screen_update(\n    FUNC(board_state::screen_update_derived))',
      ],
      screenRaw: {
        pixclock: 6_144_000,
        htotal: 384,
        hbend: 128,
        hbstart: 384,
        vtotal: 284,
        vbend: 0,
        vbstart: 256,
      },
    },
  ]);
}

// add_route on an array element must still lower, and a bank may be configured
// by several calls through a local pointer alias to a region base.
{
  const [cfg] = parseMachineConfigs(`
void gng_state::gng(machine_config &config)
{
	YM2203(config, m_ym[0], 1500000);
	m_ym[0]->add_route(0, "mono", 0.40);
	m_ym[0]->add_route(3, "mono", 0.20);
}
`, { 'm_ym[0]': 'ym1' }, {});
  eq('array-element device tag', cfg?.devices[0]?.tag, 'ym1');
  eq('array-element add_route gains',
    cfg?.devices[0]?.audioRoutes?.map(route => route.gain), [0.4, 0.2]);
}

eq('bank windows from a pointer alias', parseMemoryBanks(`
	uint8_t *rombase = memregion("maincpu")->base();
	m_mainbank->configure_entries(0, 4, &rombase[0x10000], 0x2000);
	m_mainbank->configure_entry(4, &rombase[0x4000]);
`, { m_mainbank: 'mainbank' }, {}).map(bank => ({
  tag: bank.tag,
  region: bank.region,
  startEntry: bank.startEntry,
  entries: bank.entries,
  offset: bank.offset,
  stride: bank.stride,
})), [
  { tag: 'mainbank', region: 'maincpu', startEntry: 0, entries: 4, offset: 0x10000, stride: 0x2000 },
  { tag: 'mainbank', region: 'maincpu', startEntry: 4, entries: 1, offset: 0x4000, stride: 0 },
]);

eq('conditional driver-init byte swap', parseInitRomTransforms(`
void galaga_state::init_galaga()
{
  uint8_t *rom = memregion("gfx1")->base();
  int len = memregion("gfx1")->bytes();
  for (int i = 0; i < len; i++)
  {
    if ((i & 0x0808) == 0x0800)
    {
      int t = rom[i];
      rom[i] = rom[i+8];
      rom[i+8] = t;
    }
  }
}
`), {
  init_galaga: [{
    kind: 'conditional-byte-swap',
    region: 'gfx1',
    indexMask: 0x0808,
    indexValue: 0x0800,
    displacement: 8,
  }],
});

eq('driver-init helper byte bitswap', parseInitRomTransforms(`
void frog_state::decode_sound()
{
  uint8_t *rombase = memregion("audiocpu")->base();
  for (uint32_t offs = 0; offs < 0x800; offs++)
    rombase[offs] = bitswap<8>(rombase[offs], 7,6,5,4,3,2,0,1);
}
void frog_state::init_frog()
{
  decode_sound();
}
`), {
  init_frog: [{
    kind: 'byte-bitswap',
    region: 'audiocpu',
    start: 0,
    end: 0x800,
    bits: [7, 6, 5, 4, 3, 2, 0, 1],
  }],
});

const opcodeTransforms = parseInitRomTransforms(`
void commando_state::init_commando()
{
  uint8_t *rom = memregion("maincpu")->base();
  m_decrypted_opcodes[0] = rom[0];
  for (int A = 1; A < 0xc000; A++)
  {
    uint8_t src = rom[A];
    m_decrypted_opcodes[A] =
      (src & 0x11) | ((src & 0xe0) >> 4) | ((src & 0x0e) << 4);
  }
}
`);
const opcodeTransform = opcodeTransforms.init_commando?.[0];
eq('driver-init opcode substitution shape', opcodeTransform && {
  ...opcodeTransform,
  table: undefined,
}, {
  kind: 'byte-substitution',
  sourceRegion: 'maincpu',
  targetRegion: 'decrypted_opcodes',
  start: 1,
  end: 0xc000,
  table: undefined,
});
eq(
  'driver-init opcode substitution table',
  opcodeTransform?.kind === 'byte-substitution'
    ? [opcodeTransform.table[0x00], opcodeTransform.table[0x02], opcodeTransform.table[0x80]]
    : undefined,
  [0x00, 0x20, 0x08],
);

console.log(`\nparse.spec: ${totalPass} passed, ${totalFail} failed`);
if (totalFail > 0) process.exitCode = 1;
