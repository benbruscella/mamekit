import assert from 'node:assert/strict';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice } from './device-compiler.ts';
import { clearGeneratedDevices, createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

// okim6295.cpp compiled whole (#242). Each voice decodes through okiadpcm.cpp's
// oki_adpcm_state, whose step table is non-const static storage defined out of
// the class (`int oki_adpcm_state::s_diff_lookup[49*16];`) and filled by
// compute_tables(). Never declared, it read as nothing: every voice decoded to
// 0 and the chip was silent on every board that has one.
const mameSrc = process.env.MAME_SRC ?? '../mame';
const definition = compileMameDevice(mameSrc, indexMameHardware(mameSrc).get('OKIM6295')!, 'OKIM6295');
const decoder = (definition as { allocations?: Record<string, { allocations?: Record<string, { members: { name: string; arrayLength?: number }[] }> }> })
  .allocations?.okim_voice?.allocations?.oki_adpcm_state;
assert.equal(decoder?.members.find(member => member.name === 's_diff_lookup')?.arrayLength, 49 * 16,
  'the decoder keeps its out-of-line static step table');
assert.ok(decoder?.members.some(member => member.name === 's_tables_computed'));

clearGeneratedDevices();
registerGeneratedDevice(definition as never);

// Sample 1's table entry at 0x008 points at 0x400-0x800, filled with large steps.
const rom = new Uint8Array(0x40000);
rom.set([0x00, 0x04, 0x00, 0x00, 0x08, 0x00], 8);
for (let index = 0x400; index < 0x800; index++) rom[index] = 0x77;
const chip = createDevice('OKIM6295', { tag: 'oki', clock: 1_000_000, regions: { oki: rom } } as never) as unknown as {
  invoke(method: string, ...args: unknown[]): unknown;
  streams(): { samples: () => number; put: (c: number, i: number, v: number) => number; add: (c: number, i: number, v: number) => number }[];
};
chip.invoke('write', 0x81); // select sample 1
chip.invoke('write', 0x10); // start it on voice 1 at full volume

const stream = chip.streams()[0]!;
const out: number[] = new Array(32).fill(0);
stream.samples = () => out.length;
stream.put = (_channel, index, value) => { out[index] = value; return 0; };
stream.add = (_channel, index, value) => { out[index]! += value; return 0; };
chip.invoke('sound_stream_update', stream);
assert.ok(out.some(value => value > 0.5), `a playing voice decodes its ADPCM (${out.slice(0, 8).map(value => value.toFixed(3)).join(', ')})`);

// okiadpcm.cpp defines two decoders, and each has a static s_index_shift:
// oki_adpcm_state's {-1,-1,-1,-1,2,4,6,8} and oki_adpcm2_state's
// {-2,-2,-2,-2,2,6,9,11}. Taken by name, the OKIM6295 stepped by the second,
// overshot within a phrase and saturated: Final Fight's attract voice came
// out in holes. Nibble 7 every sample, MAME's decoder gives these.
assert.deepEqual(out.slice(0, 5).map(value => Math.round(value * 2048)), [30, 93, 229, 522, 1153],
  `the OKIM6295 decodes with oki_adpcm_state's own step shifts (${out.slice(0, 5).map(value => Math.round(value * 2048)).join(', ')})`);
