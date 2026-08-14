import assert from 'node:assert/strict';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice, constructorInitialValues } from './device-compiler.ts';
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
    .every(method => !method.program.diagnostics.length),
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

const cnromDefinition = hardware.get('NES_CNROM');
assert.ok(cnromDefinition, 'MAME hardware index should resolve NES_CNROM');
const generatedCnrom = compileMameDevice(mameSrc, cnromDefinition);
assert.ok(
  generatedCnrom.methods.some(method =>
    method.name === 'device_nes_cart_interface::chr_r'),
  'an overridden source method must retain its qualified base implementation',
);

console.log('device-compiler.spec: source-derived latch, ER2055 and MB8844 devices passed');
