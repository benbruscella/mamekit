import assert from 'node:assert/strict';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice, constructorInitialValues, memberDeclarations, structDeclarations, unresolvedNamespaceNames } from './device-compiler.ts';
import { generatedDeviceMethodsSource } from './device-codegen.ts';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../runtime/generated-device.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const hardware = indexMameHardware(mameSrc);
assert.deepEqual(
  constructorInitialValues('derived_device', `
    base_device::base_device() :
      m_first(1), // source note
      m_second(2),
      m_third(3), /* another note */
      m_four(4)
    {
    }
    derived_device::derived_device() :
      base_device()
    {
    }
  `),
  { m_first: 1, m_second: 2, m_third: 3, m_four: 4 },
  'comments between constructor initializers must not hide following member defaults',
);
// A derived class's member of a base member's name is its own: the Irem
// G-101's `m_prg_mask(prg_mask)`, reached through its delegating constructor,
// sets the G-101's mask, not the cartridge interface's (#184).
assert.deepEqual(
  constructorInitialValues('g101_device', `
    cart_interface::cart_interface() : m_prg_mask(0xffff) { }
    g101_device::g101_device(const machine_config &mconfig, device_type type, u8 prg_mask) :
      cart_interface(), m_prg_mask(prg_mask) { }
    g101_device::g101_device(const machine_config &mconfig) :
      g101_device(mconfig, G101, 0x1f) { }
  `, {}, undefined, undefined, undefined,
  (className, name) => className === 'g101_device' && name === 'm_prg_mask' ? 'm_prg_mask__g101_device' : name),
  { m_prg_mask: 0xffff, m_prg_mask__g101_device: 0x1f },
  'a constructor initializer sets the member its own class declares',
);
// An array bound MAME writes as arithmetic is still the member's length. The
// VIC-II declares `m_border_color_sample[0x400 / 8]`; read with Number() the
// bound was NaN, the member had no length, and every per-cycle store into it
// took the name-addressed path instead of a direct one.
{
  const span = { file: 'src/devices/video/test.h', start: 0, end: 0, line: 1, column: 1, endLine: 1, endColumn: 1 };
  const members = memberDeclarations({
    kind: 'class',
    name: 'test_device',
    bases: [],
    body: `
      uint8_t m_reg[0x80];
      uint8_t m_border_color_sample[0x400 / 8];
      uint16_t m_first[2 * 4], m_second[1 << 3];
    `,
    span,
    bodySpan: span,
  });
  const length = (name: string) => members.find(member => member.name === name)?.arrayLength;
  assert.equal(length('m_reg'), 128);
  assert.equal(length('m_border_color_sample'), 128);
  assert.equal(length('m_first'), 8, 'a grouped declarator evaluates its bound too');
  assert.equal(length('m_second'), 8);
}
const definition = hardware.get('LS259');
assert.ok(definition, 'MAME hardware index should resolve LS259');

const generated = compileMameDevice(mameSrc, definition);
assert.deepEqual(
  generated.hierarchy,
  ['addressable_latch_device', 'ls259_device'],
);
assert.equal(
  generated.summary.methods,
  38,
  'overridden methods must retain their qualified base implementations',
);
assert.equal(generated.summary.compiledMethods, generated.summary.methods);
assert.equal(generated.summary.diagnostics, 0);
assert.ok(generated.sourceFiles.every(file => file.startsWith('src/')));
assert.ok(generated.methods.every(method => method.source.file && method.source.line > 0));

clearGeneratedDevices();
registerGeneratedDevice(generated);
const latch = createDevice('LS259');
const states: number[] = [];
latch.on('q_out_cb', state => states.push(state), 3);
assert.equal(latch.get('m_q'), 0);
latch.call('write_d0', 3, 1);
assert.equal(latch.get('m_q'), 0x08);
assert.deepEqual(states, [1]);
latch.call('write_d0', 3, 0);
assert.equal(latch.call('output_state'), 0);
assert.deepEqual(states, [1, 0]);

const latchDefinition = hardware.get('GENERIC_LATCH_8');
assert.ok(latchDefinition, 'MAME hardware index should resolve GENERIC_LATCH_8');
const generatedLatch = compileMameDevice(mameSrc, latchDefinition);
assert.equal(generatedLatch.summary.diagnostics, 0);
registerGeneratedDevice(generatedLatch);
const soundLatch = createDevice('GENERIC_LATCH_8');
soundLatch.call('write', 0xa5);
assert.equal(soundLatch.call('pending_r'), 1);
assert.equal(soundLatch.call('read'), 0xa5);
assert.equal(soundLatch.call('pending_r'), 0);

const picDefinition = hardware.get('PIC8259');
assert.ok(picDefinition, 'MAME hardware index should resolve PIC8259');
const generatedPic = compileMameDevice(mameSrc, picDefinition);
assert.deepEqual(
  Object.fromEntries(Object.entries(generatedPic.constants)
    .filter(([name]) => name.startsWith('state_t::'))),
  {
    'state_t::ICW1': 0,
    'state_t::ICW2': 1,
    'state_t::ICW3': 2,
    'state_t::ICW4': 3,
    'state_t::READY': 4,
  },
  'scoped enum values must retain the qualified names used by device methods',
);
registerGeneratedDevice(generatedPic);
const pic = createDevice('PIC8259');
assert.equal(pic.get('m_state'), generatedPic.constants['state_t::READY']);
pic.call('write', 0, 0x17);
assert.equal(pic.get('m_state'), generatedPic.constants['state_t::ICW2']);
pic.call('write', 1, 0x20);
assert.equal(pic.get('m_state'), generatedPic.constants['state_t::ICW4']);
pic.call('write', 1, 0x0f);
assert.equal(pic.get('m_state'), generatedPic.constants['state_t::READY']);
assert.equal(pic.get('m_base'), 0x20);

const earomDefinition = hardware.get('ER2055');
assert.ok(earomDefinition, 'MAME hardware index should resolve ER2055');
const generatedEarom = compileMameDevice(mameSrc, earomDefinition);
assert.equal(generatedEarom.summary.diagnostics, 0);
assert.equal(generatedEarom.summary.compiledMethods, generatedEarom.summary.methods);
assert.equal(
  generatedEarom.members.find(member => member.name === 'm_rom_data')?.values?.length,
  64,
  'dynamic MAME device arrays must lower to fixed generated storage',
);

// A struct's scalar conversion and assignment operators are methods its
// values run: the uPD7725's status register is `operator unsigned()` over its
// flag bits and `unsigned operator=(unsigned)` back into them, so `regs.sr =
// 0x0000` sets the flags and `regs.sr >> 8` reads them (the SNES DSP-1).
{
  const upd7725 = hardware.get('UPD7725');
  assert.ok(upd7725, 'MAME hardware index should resolve UPD7725');
  const compiled = compileMameDevice(mameSrc, upd7725);
  for (const type of ['Status', 'Flag']) {
    const names = (compiled.structMethods?.[type] ?? []).map(method => method.name).sort();
    assert.deepEqual(names, ['__assign', '__convert'], `${type} keeps its conversion and assignment, and no method named unsigned`);
  }
  registerGeneratedDevice(compiled);
  const dsp = createDevice('UPD7725', { clock: 8_000_000 }) as unknown as { members: Record<string, any> };
  const status = dsp.members.regs.sr;
  status.__assign(0x8400);
  assert.equal(status.rqm, 1, 'operator= narrows each flag to a bool');
  assert.equal(status.drc, 1);
  assert.equal(Number(status), 0x8400, 'operator unsigned() is the value the struct reads as');
  assert.equal(status >> 8, 0x84, 'arithmetic on the struct converts it');
  clearGeneratedDevices();
}

const mb8844Definition = hardware.get('MB8844');
assert.ok(mb8844Definition, 'MAME hardware index should resolve MB8844');
const generatedMb8844 = compileMameDevice(mameSrc, mb8844Definition);
assert.equal(generatedMb8844.summary.diagnostics, 0);
for (const name of ['m_cache', 'm_data']) {
  assert.ok(generatedMb8844.members.some(member => member.name === name),
    `template-qualified memory_access members must retain ${name} for host address-space binding`);
}
assert.equal(
  generatedMb8844.members.find(member => member.name === 'm_SP')?.values?.length,
  4,
  'fixed MAME MCU arrays must retain their source-declared size',
);
assert.equal(
  generatedMb8844.dataAddressBits,
  6,
  'MB8844 data address width must come from its MAME constructor',
);
assert.equal(
  generatedMb8844.members.find(member => member.name === 'm_icount')?.signed,
  true,
  'signed MAME execution counters must remain signed in device IR',
);
registerGeneratedDevice(generatedMb8844);
const mb8844 = createDevice('MB8844');
assert.equal(mb8844.dataAddressBits(), 6);
mb8844.set('m_icount', -1);
assert.equal(mb8844.get('m_icount'), -1);

const mb8843Definition = hardware.get('MB8843');
assert.ok(mb8843Definition, 'MAME hardware index should resolve MB8843');
const generatedMb8843 = compileMameDevice(mameSrc, mb8843Definition);
assert.equal(generatedMb8843.summary.diagnostics, 0);
assert.equal(
  generatedMb8843.dataAddressBits,
  6,
  'MB8843 data address width must come from its MAME constructor',
);

const adc0804Definition = hardware.get('ADC0804');
assert.ok(adc0804Definition, 'MAME hardware index should resolve ADC0804');
const generatedAdc0804 = compileMameDevice(mameSrc, adc0804Definition);
assert.equal(
  generatedAdc0804.constants.s_conversion_cycles,
  74,
  'out-of-class static constant definitions must remain available to device methods',
);
registerGeneratedDevice(generatedAdc0804);
const adc0804 = createDevice('ADC0804', { clock: 192_000 });
adc0804.on('vin_callback', () => 0x90);
adc0804.call('write', 0);
adc0804.tick(73 / 192_000);
assert.equal(adc0804.get('m_result'), 0);
adc0804.tick(2 / 192_000);
assert.equal(adc0804.get('m_result'), 0x90);

// An unbound devcb read returns the default its constructor gives it
// (`m_vin_callback(*this, 0)`), not a guess from its width.
assert.equal(generatedAdc0804.callbacks.find(callback => callback.member === 'm_vin_callback')?.initial, 0);
const pia6821Definition = hardware.get('PIA6821');
assert.ok(pia6821Definition, 'MAME hardware index should resolve PIA6821');
const pia6821Callbacks = compileMameDevice(mameSrc, pia6821Definition).callbacks;
assert.equal(pia6821Callbacks.find(callback => callback.member === 'm_in_a_handler')?.initial, 0);
assert.equal(pia6821Callbacks.find(callback => callback.member === 'm_in_ca1_handler')?.initial, 1);

const namco54Definition = hardware.get('NAMCO_54XX');
assert.ok(namco54Definition, 'MAME hardware index should resolve NAMCO_54XX');
const generatedNamco54 = compileMameDevice(mameSrc, namco54Definition);
assert.equal(
  generatedNamco54.callbacks.find(callback => callback.signal === 'reset')?.member,
  'm_reset',
  'MAME INPUT_LINE_RESET callbacks must remain distinct from IRQ callbacks',
);

const namco52Definition = hardware.get('NAMCO_52XX');
assert.ok(namco52Definition, 'MAME hardware index should resolve NAMCO_52XX');
const generatedNamco52 = compileMameDevice(mameSrc, namco52Definition);
assert.equal(generatedNamco52.summary.diagnostics, 0);
assert.ok(
  ['K_r', 'SI_r', 'R0_r', 'R1_r', 'P_w', 'R2_w', 'R3_w', 'O_w', 'write', 'chip_select']
    .every(method => generatedNamco52.methods.some(candidate => candidate.name === method)),
  'Namco 52xx sample-player host must retain its firmware and DAC protocol',
);

const namco51Definition = hardware.get('NAMCO_51XX');
assert.ok(namco51Definition, 'MAME hardware index should resolve NAMCO_51XX');
const generatedNamco51 = compileMameDevice(mameSrc, namco51Definition);
assert.deepEqual(
  generatedNamco51.methods
    .map(method => method.name)
    .filter(name => name.startsWith('R_r_')),
  ['R_r_0', 'R_r_1', 'R_r_2', 'R_r_3'],
  'numeric MAME function-template callback bindings must emit executable specializations',
);
assert.ok(
  generatedNamco51.methods
    .filter(method => method.name.startsWith('R_r_'))
    .every(method => !method.program.diagnostics.length && method.program.operations.length > 0),
  'function-template specializations must lower without unresolved parameters',
);

const namco53Definition = hardware.get('NAMCO_53XX');
assert.ok(namco53Definition, 'MAME hardware index should resolve NAMCO_53XX');
const generatedNamco53 = compileMameDevice(mameSrc, namco53Definition);
assert.equal(generatedNamco53.summary.diagnostics, 0);
assert.ok(
  generatedNamco53.members.some(member =>
    member.name === 'm_cpu' && member.finder?.tag === 'mcu'),
  'Namco 53xx must retain its source-declared MB8843 firmware device',
);
assert.ok(
  generatedNamco53.methods.some(method => method.name === 'K_r'),
  'Namco 53xx firmware port callbacks must lower from current MAME source',
);
assert.ok(
  ['K_r', 'O_w', 'P_w', 'R_r_0', 'R_r_1', 'R_r_2', 'R_r_3']
    .every(method => generatedNamco53.hotMethods?.includes(method)),
  'source-installed child firmware callbacks must be selected for direct execution',
);

const tunitVideoDefinition = hardware.get('MIDTUNIT_VIDEO');
assert.ok(tunitVideoDefinition, 'MAME hardware index should resolve MIDTUNIT_VIDEO');
const generatedTunitVideo = compileMameDevice(mameSrc, tunitVideoDefinition);
const generatedDmaDraws = generatedTunitVideo.methods.filter(method =>
  method.name.startsWith('dma_draw_') && method.name !== 'dma_draw_none');
assert.equal(
  generatedDmaDraws.length,
  512,
  'T-Unit DMA macro tables must materialize every source-selected template specialization',
);
assert.ok(
  generatedDmaDraws.every(method =>
    method.parameters === '' && method.program.operations.length > 0),
  'T-Unit DMA template constants must fold into executable handler artifacts',
);

const cnromDefinition = hardware.get('NES_CNROM');
assert.ok(cnromDefinition, 'MAME hardware index should resolve NES_CNROM');
const generatedCnrom = compileMameDevice(mameSrc, cnromDefinition);
assert.ok(
  generatedCnrom.methods.some(method =>
    method.name === 'device_nes_cart_interface::chr_r'),
  'an overridden source method must retain its qualified base implementation',
);

// A device_memory_interface device keeps its display memory off the CPU bus.
// The declaration is split three ways in MAME source -- the address_space_config
// in the constructor initializer, the space index in memory_space_config(), and
// the map itself -- and all three have to agree for the runtime to back it.
const vdpDefinition = hardware.get('TMS9928A');
assert.ok(vdpDefinition, 'MAME hardware index should resolve TMS9928A');
const generatedVdp = compileMameDevice(mameSrc, vdpDefinition, 'TMS9928A');
assert.deepEqual(generatedVdp.spaces, [{
  index: 1, // AS_DATA, read from src/emu/emumem.h rather than restated here
  name: 'vram',
  addressBits: 14,
  dataBits: 8,
  endianness: 'big', // address_space_config("vram", ENDIANNESS_BIG, ...)
  ram: true,
}], 'the TMS9928A must carry its own 16K VRAM space');
assert.equal(
  generatedVdp.summary.diagnostics,
  0,
  'every TMS9928A method must lower, the per-scanline renderer included',
);
assert.ok(
  generatedVdp.methods.some(method => method.name === 'update_line') &&
  generatedVdp.methods.some(method => method.name === 'screen_update'),
  'the VDP rendering entry points must be present',
);
// The constructor-injected constants pick the NTSC/PAL branch of
// device_config_complete, so they have to survive the delegating constructor.
assert.deepEqual(
  ['m_total_horz', 'm_50hz'].map(name =>
    generatedVdp.members.find(member => member.name === name)?.initial),
  [342, 0],
);

// A device with no address space of its own must not gain one.
const latchSpaces = compileMameDevice(mameSrc, hardware.get('LS259')!, 'LS259').spaces;
assert.equal(latchSpaces, undefined, 'a device without a declared space must have none');

const vicDefinition = compileMameDevice(mameSrc, hardware.get('MOS6567')!, 'MOS6567');
assert.deepEqual(vicDefinition.members.filter(member => ['m_colors', 'm_spritemulti'].includes(member.name))
  .map(member => [member.name, member.arrayLength]), [['m_colors', 4], ['m_spritemulti', 4]],
  'comma-separated array declarations must allocate both VIC colour tables');
const vicMethods = generatedDeviceMethodsSource(vicDefinition).methods;
for (const method of ['execute_run', 'read', 'write']) {
  assert.ok(vicMethods.includes(method), `${method} must compile with its source-owned memory and colour tables`);
}
assert.deepEqual(vicDefinition.spaces?.map(space => [space.index, space.addressBits]), [[0, 14], [1, 10]],
  'numeric space indices must retain both source-declared VIC memory spaces');
registerGeneratedDevice(vicDefinition);
const mappedVic = createDevice('MOS6567');
mappedVic.bindAddressSpace!(0, address => address === 0x1234 ? 0xa5 : 0, () => {});
mappedVic.bindAddressSpace!(1, address => address === 0x234 ? 7 : 0, () => {});
assert.equal(mappedVic.call('read_videoram', 0x5234), 0xa5,
  'VIC DMA reads must reach the configured machine map with source address masking');
assert.equal(mappedVic.call('read_colorram', 0x6234), 7,
  'colour RAM must use the independent configured space');
assert.equal(vicDefinition.clockDivider, undefined,
  'MOS6567 must not inherit a clock divider from its MOS8564 sibling');
assert.equal(compileMameDevice(mameSrc, hardware.get('MOS8564')!, 'MOS8564').clockDivider, 8,
  'MOS8564 retains its own source-declared divider');

// A struct declared inside another is its own type under its C++ name, and
// its fields do not leak into the outer one. nes_defs.h declares a different
// `square_t` inside both `apu_t` and `mmc5_sound_t`; MMC5's `squ[2]` is its
// own, and read as fields of `mmc5_sound_t` the MMC5 could not even reset.
{
  const structs = structDeclarations([{ file: 'defs.h', source: `
    struct apu_t { struct square_t { u8 regs[4]; s32 freq = 0; }; square_t squ[2]; u8 mode; };
    struct mmc5_sound_t {
      struct square_t { square_t() { for (auto & elem : regs) elem = 0; } u8 regs[4]; bool enabled = false; };
      struct pcm_t { u8 regs[2]; };
      square_t squ[2];
      pcm_t pcm;
    };` }], {});
  const shape = (name: string) => structs.get(name)?.map(field =>
    `${field.name}${field.length ? `[${field.length}]` : ''}${field.valueType ? `:${field.valueType}` : ''}`);
  assert.deepEqual(shape('mmc5_sound_t'), ['squ[2]:mmc5_sound_t::square_t', 'pcm:mmc5_sound_t::pcm_t']);
  assert.deepEqual(shape('mmc5_sound_t::square_t'), ['regs[4]', 'enabled']);
  assert.deepEqual(shape('apu_t'), ['squ[2]:apu_t::square_t', 'mode']);
  assert.deepEqual(shape('apu_t::square_t'), ['regs[4]', 'freq']);
}

// The Sunsoft 5B is an AY-3-8910 whose levels come from what its constructor
// does, not only from its initializer list: the body sets three resistor
// loads and calls set_type(), and the initializer points m_par at a
// file-scope resistor table. Missing any of these left every level zero.
{
  const ay = compileMameDevice(mameSrc, hardware.get('SUNSOFT_5B_SOUND')!, 'SUNSOFT_5B_SOUND');
  const member = (name: string) => ay.members.find(candidate => candidate.name === name);
  assert.equal(ay.summary.diagnostics, 0);
  assert.deepEqual(member('m_res_load')?.values, [1000, 1000, 1000]);
  assert.equal(member('m_step')?.initial, 1);
  assert.equal(member('m_env_step_mask')?.initial, 0x1f);
  assert.equal((member('m_par')?.initialValue as { res_count?: number } | undefined)?.res_count, 16);
  assert.equal((member('m_par_env')?.initialValue as { res_count?: number } | undefined)?.res_count, 32);
  assert.deepEqual(member('m_vol3d_table')?.valueType, 'std::unique_ptr<sound_stream::sample_t[]>');
  assert.deepEqual(member('m_vol_table')?.arrayShape, [3, 16]);
}

// #203: only the Exidy sound board names `set_clk<0>`, in its machine
// configuration, so the PIT's own source has no instance of the template.
// Given the configuration, each instance is a method of its own, and the
// configured clock is the channel's.
const pitDefinition = hardware.get('PIT8253');
assert.ok(pitDefinition, 'MAME hardware index should resolve PIT8253');
const generatedPit = compileMameDevice(mameSrc, pitDefinition, 'PIT8253', new Set(), {
  configuration: [0, 1, 2].map(channel => `m_pit->set_clk<${channel}>(SH8253_CLOCK)`),
});
assert.equal(generatedPit.summary.diagnostics, 0);
assert.deepEqual(
  generatedPit.methods.filter(method => /^set_clk_\d$/.test(method.name))
    .map(method => `${method.name}(${method.parameters})`),
  [
    'set_clk_0(const XTAL &xtal)', 'set_clk_1(const XTAL &xtal)', 'set_clk_2(const XTAL &xtal)',
    'set_clk_0(double clk)', 'set_clk_1(double clk)', 'set_clk_2(double clk)',
  ],
  'an XTAL overload goes ahead of the arithmetic one it forwards to',
);
registerGeneratedDevice(generatedPit);
const pit = createDevice('PIT8253', {
  tag: 'pit',
  clock: 894_886,
  configure: device => [0, 1, 2].forEach(channel => device.invoke(`set_clk_${channel}`, 1_789_772.5 + channel)),
});
assert.deepEqual(
  Array.from((pit.instance!() as { m_clk: ArrayLike<number> }).m_clk),
  [1_789_772.5, 1_789_773.5, 1_789_774.5],
  'set_clk<N> sets channel N clock',
);
// Its three counters are the PIT_COUNTERs device_add_mconfig adds by tag
// (`"counter0"`...), matched to `m_counter(*this, "counter%u", 0U)`, and
// device_resolve_objects hands each its index and clock before the PIT starts.
assert.deepEqual(generatedPit.children?.map(child => [child.member, child.type, child.tags]),
  [['m_counter', 'PIT_COUNTER', ['counter0', 'counter1', 'counter2']]]);
const counters = (pit.instance!() as { m_counter: { m_index: number; m_clockin: number }[] }).m_counter;
assert.deepEqual(counters.map(counter => [counter.m_index, counter.m_clockin]),
  [[0, 1_789_772.5], [1, 1_789_773.5], [2, 1_789_774.5]],
  'each counter takes its index and clock in device_resolve_objects');

console.log('device-compiler.spec: source-derived latch, ER2055, MB8844, TMS9928A and AY-3-8910 devices passed');

// A method returning a reference is assigned through, and what is stored is
// converted to the reference's type: the 6809's `uint8_t &regop8()`, and
// Musashi's `u32 &DX()`, whose `DX() |= ...` otherwise kept JavaScript's
// signed result of `|` (Marble Madness, #255).
{
  const cpu = compileMameDevice(mameSrc, hardware.get('MC6809E')!, 'MC6809E');
  const setter = cpu.methods.find(method => method.name.endsWith('regop8='));
  assert.ok(setter, 'the 6809 has an assigning form of regop8()');
  const stored = JSON.stringify(setter.program.operations);
  assert.match(stored, /"kind":"cast","valueType":"uint8_t","operand":\{"kind":"identifier","name":"__assigned"\}/,
    'the stored value is cast to the reference\'s type');
}

// A header of namespace-scope inline functions and constants, with no .cpp
// (#294): cartheader.h joins a Game Boy cartridge board's sources because the
// board calls into it or reads its constants, each function is bound under
// the qualified name its caller writes, and each constant under its
// namespace -- gbxfile.h's `TYPE_MBC1` is a FourCC, cartheader.h's is 0x01.
{
  const mbc1 = compileMameDevice(mameSrc, hardware.get('GB_ROM_MBC1')!, 'GB_ROM_MBC1');
  assert.equal(mbc1.summary.diagnostics, 0);
  assert.ok(mbc1.sourceFiles.includes('src/devices/bus/gameboy/cartheader.h'), 'the header joins the board');
  const verify = mbc1.methods.find(method => method.name === 'cartheader::verify_header_checksum');
  assert.ok(verify, 'the header check is bound under its qualified name');
  assert.match(verify.parameters, /auto \*begin/, 'its iterator is the pointer every caller hands it');
  assert.doesNotMatch(JSON.stringify(verify.program), /std::advance/, 'std::advance moves the pointer');
  assert.match(JSON.stringify(verify.program), /"name":"cartheader::OFFSET_TITLE"/, 'its own names are its namespace\'s');
  assert.equal(mbc1.constants['cartheader::OFFSET_TYPE'], 0x0147);
  assert.equal(mbc1.constants['cartheader::TYPE_MBC1'], 0x01);
  assert.equal(mbc1.constants['gbxfile::TYPE_MBC1'], 0x4d424331, 'gbxfile.h\'s is the FourCC "MBC1"');
  // The board's slot, aimed at the owner by the interface's constructor.
  assert.equal(mbc1.members.find(member => member.name === 'm_slot')?.owner, true);

  // An MBC3 calls neither function and still reads the header's constants.
  const mbc3 = compileMameDevice(mameSrc, hardware.get('GB_ROM_MBC3')!, 'GB_ROM_MBC3');
  assert.equal(mbc3.summary.diagnostics, 0);
  assert.equal(mbc3.constants['cartheader::TYPE_MBC3_RTC_BATT'], 0x0f);
  assert.ok(mbc3.methods.some(method => method.name === 'gbxfile::get_data'), 'gbxfile.cpp\'s reader is bound as it is called');
}

// A name in a namespace the device's headers declare, which nothing
// collected answers, is a diagnostic on the method that reads it: never a
// silent nothing.
{
  const program = (name: string) => ({ operations: [{ op: 'return' as const, value: { kind: 'identifier' as const, name } }], diagnostics: [] as string[] });
  const methods = ['cartheader::OFFSET_TYPE', 'cartheader::OFFSET_NOWHERE', 'elsewhere::NAME'].map((name, index) => ({
    name: `reads_${index}`, parameters: '', source: { file: 'x.cpp', line: 1 }, program: program(name),
  }));
  const sources = [{ file: 'src/devices/bus/gameboy/mbc.cpp', source: '#include "cartheader.h"\n' }];
  unresolvedNamespaceNames(mameSrc, sources, methods as never, name => name === 'cartheader::OFFSET_TYPE');
  assert.deepEqual(methods[0]!.program.diagnostics, []);
  assert.match(methods[1]!.program.diagnostics[0] ?? '', /"cartheader::OFFSET_NOWHERE" names nothing/);
  assert.deepEqual(methods[2]!.program.diagnostics, [], 'a qualifier no included header declares is not this check\'s');
}

// A constructor chain through class template bases (#294): a board derives
// `flat_ram_device_base<mbc_dual_device_base>`, which inherits its base's
// constructors with `using Base::Base;`, and mbc_dual_device_base starts its
// coarse masks with a braced initializer. Lost on the way, the masks were 0
// and the boards' low ROM window never left bank 0.
{
  const source = `
    class dual_base { public: dual_base(int clock); u16 m_mask[2]; u16 m_sel[2]; };
    dual_base::dual_base(int clock) : m_mask{ 0xffffU, 0xffffU }, m_sel{ 0U, 0U } { }
    template <typename Base> class ram_base : public Base { protected: using Base::Base; };
    template <typename Base> class rom_base : public Base { public: rom_base(int clock); };
    template <typename Base> rom_base<Base>::rom_base(int clock) : Base(clock) { }
    class flat_board : public ram_base<dual_base> { public: flat_board(int clock) : ram_base<dual_base>(clock) { } };
    class rom_board : public rom_base<dual_base> { public: rom_board(int clock) : rom_base<dual_base>(clock) { } };`;
  for (const board of ['flat_board', 'rom_board']) {
    const chain = { structs: {}, spaceConfigs: {} } as Parameters<typeof constructorInitialValues>[7] & object;
    constructorInitialValues(board, source, {}, {}, {}, [], undefined, chain);
    assert.deepEqual(chain.tables?.m_mask, [0xffff, 0xffff], `${board} reaches its template base's braced initializer`);
    assert.deepEqual(chain.tables?.m_sel, [0, 0]);
  }
}
