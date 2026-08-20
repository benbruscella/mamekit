import assert from 'node:assert/strict';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
  type GeneratedDeviceDefinition,
} from './generated-device.ts';

const method = (name: string, parameters: string) => ({
  name,
  parameters,
  program: { operations: [], diagnostics: [] },
});

const definition: GeneratedDeviceDefinition = {
  type: 'Z80PIO',
  constants: {},
  members: [],
  callbacks: [
    { signal: 'out_int_callback', member: 'm_out_int_cb', slots: 1, initial: 0 },
    { signal: 'in_pa_callback', member: 'm_in_pa_cb', slots: 1, initial: 0xff },
    { signal: 'out_pa_callback', member: 'm_out_pa_cb', slots: 1, initial: 0 },
    { signal: 'out_ardy_callback', member: 'm_out_ardy_cb', slots: 1, initial: 0 },
    { signal: 'in_pb_callback', member: 'm_in_pb_cb', slots: 1, initial: 0xff },
    { signal: 'out_pb_callback', member: 'm_out_pb_cb', slots: 1, initial: 0 },
    { signal: 'out_brdy_callback', member: 'm_out_brdy_cb', slots: 1, initial: 0 },
  ],
  timers: [],
  methods: [
    method('read', 'offs_t offset'),
    method('write', 'offs_t offset, u8 data'),
    method('port_read', 'int offset'),
    method('strobe', 'int which, bool state'),
    method('z80daisy_irq_state', ''),
  ],
  summary: { diagnostics: 0 },
};

clearGeneratedDevices();
registerGeneratedDevice(definition);
const pio = createDevice('Z80PIO', { clock: 4_000_000 });
const data: number[] = [];
const ready: number[] = [];
pio.on('out_pa_callback', (_offset, value) => data.push(value));
pio.on('out_ardy_callback', value => ready.push(value));

// A-control selects output mode, then A-data performs the source-defined
// ready-low/data/ready-high handshake.
pio.call('write', 2, 0x0f);
pio.call('write', 0, 0x5a);
assert.deepEqual(data, [0, 0x5a]);
assert.deepEqual(ready, [1, 0, 1]);
assert.equal(pio.call('port_read', 0), 0x5a);

// The sound CPU acknowledges by raising ASTB; that consumes ready and clears
// the level-driven NMI output on System 1.
pio.call('strobe', 0, 0);
pio.call('strobe', 0, 1);
assert.equal(ready.at(-1), 0);
assert.equal(pio.call('z80daisy_irq_state'), 0);
assert.equal(pio.cycleClock(), 4_000_000);

console.log('generated-z80pio.spec: dual-port output and ready/strobe handshake passed');
