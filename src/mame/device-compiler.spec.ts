import assert from 'node:assert/strict';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice, constructorInitialValues } from './device-compiler.ts';
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

console.log('device-compiler.spec: source-derived latch, ER2055, MB8844 and TMS9928A devices passed');
