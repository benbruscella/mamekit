import assert from 'node:assert/strict';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice } from './device-compiler.ts';
import { clearGeneratedDevices, createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

// k053260.cpp compiled whole (#242): its four voices are a nested class
// declared with its member, `class KDSC_Voice { ... } m_voice[4];`, whose
// methods are defined out of the class (`k053260_device::KDSC_Voice::play`)
// and reach their chip through `k053260_device &m_device`. Masked away with
// the class body, the member was never declared and the chip rendered silence.
const mameSrc = process.env.MAME_SRC ?? '../mame';
const definition = compileMameDevice(mameSrc, indexMameHardware(mameSrc).get('K053260')!, 'K053260');
const voice = definition.members.find(member => member.name === 'm_voice');
assert.equal(voice?.object, 'KDSC_Voice', 'the voices are objects of their nested class');
assert.equal(voice?.arrayLength, 4);

clearGeneratedDevices();
registerGeneratedDevice(definition as never);

interface Chip {
  invoke(method: string, ...args: unknown[]): unknown;
  streams(): { rate: number; samples: () => number; put: (c: number, i: number, v: number) => number }[];
}

// An 8-bit PCM ramp at the start of the sample ROM.
const rom = new Uint8Array(0x1000);
for (let index = 0; index < 0x100; index++) rom[index] = (index * 4) & 0xff;
const chip = createDevice('K053260', { tag: 'k053260', clock: 3_579_545, regions: { k053260: rom } } as never) as unknown as Chip;

const write = (offset: number, data: number) => chip.invoke('write', offset, data);
write(0x2f, 0x02);           // sound output on
write(0x08, 0x00);           // voice 0 pitch
write(0x09, 0x0f);
write(0x0a, 0xff);           // length
write(0x0b, 0x00);
write(0x0c, 0x00);           // start 0
write(0x0d, 0x00);
write(0x0e, 0x00);
write(0x0f, 0x7f);           // volume
write(0x2c, 0x04);           // pan centre
write(0x28, 0x01);           // key on

const stream = chip.streams()[0]!;
const left: number[] = new Array(64).fill(0);
stream.samples = () => left.length;
stream.put = (channel, index, value) => { if (channel === 0) left[index] = value; return 0; };
(stream as unknown as { put_int_clamp: (c: number, i: number, v: number, m: number) => number }).put_int_clamp =
  (channel, index, value, max) => stream.put(channel, index, Math.max(-max, Math.min(max - 1, value)) / max);
chip.invoke('sound_stream_update', stream);
assert.ok(new Set(left).size > 8, `a keyed-on voice plays its samples (${left.slice(0, 8).join(', ')})`);
