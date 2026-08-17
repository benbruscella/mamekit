import assert from 'node:assert/strict';
import { GeneratedM68705P5Device } from './generated-m68705.ts';

const rom = new Uint8Array(0x800).fill(0x9d);
// LDA #$0f; STA $06 (DDRC); LDA #$05; STA $02 (PORTC);
// LDA $01 (PORTB); WAIT.
rom.set([0xa6, 0x0f, 0xb7, 0x06, 0xa6, 0x05, 0xb7, 0x02, 0xb6, 0x01, 0x8e], 0x80);
rom[0x7fe] = 0x00;
rom[0x7ff] = 0x80;

const device = new GeneratedM68705P5Device({
  clock: 3_000_000,
  tag: 'mcu:mcu',
  regions: { 'mcu:mcu': rom },
});
let portC = -1;
device.on('portb_r', () => 0x5a);
device.on('portc_w', value => { portC = value; });
device.set('m_icount', 40);
device.call('execute_run');

assert.equal(portC, 0x05, 'port C output callback receives the driven latch');
assert.equal(device.get('A'), 0x5a, 'port B input callback supplies the MCU read');
assert.ok(device.signalNames().includes('portb_r'));
assert.ok(device.signalNames().includes('portc_w'));
device.set('LATCHA', 0x117);
device.set('DDRC', 0xff);
device.set('TDR', 0x93);
device.set('TCR', 0x07);
assert.equal(device.get('LATCHA'), 0x17, 'port-latch state is restorable');
assert.equal(device.get('DDRC'), 0x0f, 'port C DDR keeps its physical width');
assert.equal(device.get('TDR'), 0x93, 'timer data state is restorable');
assert.equal(device.get('TCR'), 0x07, 'timer control state is restorable');

console.log('generated-m68705.spec: 8 passed, 0 failed');
