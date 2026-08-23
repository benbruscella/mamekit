import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseDacGenerators } from './extract.ts';
import { generatedDacWorkletSource } from './worklet-source.ts';

// The shape of MAME's src/devices/sound/dac.h: gain constants, the macro
// definition itself (which must not be mistaken for a declaration), and the
// DAC_GENERATOR lines that declare each chip.
const HEADER = `
constexpr sound_stream::sample_t dac_gain_r2r = 1.0;
constexpr sound_stream::sample_t dac_gain_bw = 2.0;

#define DAC_GENERATOR(_dac_type, _dac_class, _dac_base_class, _dac_mapper, _dac_bits, _dac_gain, _dac_description, _dac_shortname) \\
DECLARE_DEVICE_TYPE(_dac_type, _dac_class) \\
DAC_GENERATOR_EPILOG(_dac_type, _dac_class, _dac_description, _dac_shortname)

DAC_GENERATOR(AD7533,    ad7533_device,    dac_word_device_base, dac_mapper_unsigned, 10, dac_gain_r2r, "AD7533 DAC",    "ad7533")
DAC_GENERATOR(MC1408,    mc1408_device,    dac_byte_device_base, dac_mapper_unsigned,  8, dac_gain_r2r, "MC1408 DAC",    "mc1408")
DAC_GENERATOR(DAC_1BIT,  dac_1bit_device,  dac_bit_device_base,  dac_mapper_unsigned,  1, 1.0,          "1-Bit DAC",     "dac")
DAC_GENERATOR(DAC_4BIT_BINARY_WEIGHTED, dac_4bit_bw_device, dac_byte_device_base, dac_mapper_unsigned, 4, dac_gain_bw, "4-Bit Binary Weighted DAC", "dac_4bit_bw")
DAC_GENERATOR(DAC_8BIT_R2R_TWOS_COMPLEMENT, dac_8bit_tc_device, dac_byte_device_base, dac_mapper_signed, 8, dac_gain_r2r, "8-Bit R-2R Twos Complement DAC", "dac_8bit_r2r_tc")
`;

const table = parseDacGenerators(HEADER);
assert.deepEqual(table.AD7533, { bits: 10, mapper: 'unsigned', gain: 1 });
assert.deepEqual(table.MC1408, { bits: 8, mapper: 'unsigned', gain: 1 });
assert.deepEqual(table.DAC_1BIT, { bits: 1, mapper: 'unsigned', gain: 1 });
assert.deepEqual(table.DAC_4BIT_BINARY_WEIGHTED, { bits: 4, mapper: 'unsigned', gain: 2 });
assert.deepEqual(
  table.DAC_8BIT_R2R_TWOS_COMPLEMENT,
  { bits: 8, mapper: 'signed', gain: 1 },
);
assert.equal(
  Object.keys(table).length,
  5,
  'the macro definition and its epilog are not chip declarations',
);

// The emitted mixer must reproduce dac_device_base: a value map of
// mapper(code, bits) * gain scaled into the chip's output range, and a code
// masked to the chip's own resolution rather than to a byte.
(globalThis as Record<string, unknown>).AudioWorkletProcessor = class {
  readonly port = { onmessage: null, postMessage: () => {} };
};
(globalThis as Record<string, unknown>).registerProcessor = () => {};
(globalThis as Record<string, unknown>).sampleRate = 48_000;

const directory = mkdtempSync(join(tmpdir(), 'mamekit-dac-'));
const modulePath = join(directory, 'dac-worklet.ts');
writeFileSync(modulePath, generatedDacWorkletSource(table));
const { GeneratedDacMixer } = await import(pathToFileURL(modulePath).href) as {
  GeneratedDacMixer: new (
    chips?: number,
    routes?: readonly { chip: number; gain: number }[],
    auxiliary?: readonly { type: string; gain: number }[],
    deviceTypes?: readonly string[],
  ) => { write(chip: number, data: number, method?: string): void; sample(): number };
};

// Ten bits: MCR's Sounds Good drives 0..1023 through an AD7533. Masking that
// to a byte wrapped the waveform four times per sweep, which is what made
// Rampage sound like a sawtooth (issue #74).
const ad7533 = new GeneratedDacMixer(1, [], [], ['AD7533']);
ad7533.write(0, 0);
assert.equal(ad7533.sample(), -1);
ad7533.write(0, 512);
assert.equal(ad7533.sample(), 0);
ad7533.write(0, 1023);
assert.ok(Math.abs(ad7533.sample() - 0.998046875) < 1e-9);
ad7533.write(0, 256);
assert.equal(ad7533.sample(), -0.5, 'a ten-bit code must not collapse to its low byte');

// Eight bits behaves exactly as the byte path always did.
const mc1408 = new GeneratedDacMixer(1, [], [], ['MC1408']);
for (const code of [0, 1, 128, 255]) {
  mc1408.write(0, code);
  assert.equal(mc1408.sample(), (code - 128) / 128);
}

// One-bit DACs sit in MAME's 0..1 range, not -1..1.
const oneBit = new GeneratedDacMixer(1, [], [], ['DAC_1BIT']);
oneBit.write(0, 0);
assert.equal(oneBit.sample(), 0);
oneBit.write(0, 1);
assert.equal(oneBit.sample(), 1);

// Binary-weighted ladders carry twice the R-2R gain, so MAME's own value map
// runs past full scale — dac_gain_bw is 2.0 against a -1..1 range.
const weighted = new GeneratedDacMixer(1, [], [], ['DAC_4BIT_BINARY_WEIGHTED']);
weighted.write(0, 0);
assert.equal(weighted.sample(), -1);
weighted.write(0, 8);
assert.equal(weighted.sample(), 1);
weighted.write(0, 15);
assert.ok(Math.abs(weighted.sample() - 2.75) < 1e-9);

// Twos-complement coding flips the top bit before mapping.
const twos = new GeneratedDacMixer(1, [], [], ['DAC_8BIT_R2R_TWOS_COMPLEMENT']);
twos.write(0, 0);
assert.equal(twos.sample(), 0);
twos.write(0, 0x80);
assert.equal(twos.sample(), -1);

assert.throws(
  () => new GeneratedDacMixer(1, [], [], ['NOT_A_DAC']),
  /no MAME DAC definition/,
  'an unknown chip must fail rather than render at a guessed width',
);

console.log('dac.spec: DAC_GENERATOR lowering and value maps passed');
