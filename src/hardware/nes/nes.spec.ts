import assert from 'node:assert/strict';
import { extractNes } from './extract.ts';
import { indexMameHardware } from '../../mame/hardware.ts';
import { compileNesApu } from '../../mame/nes-apu-compiler.ts';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../../runtime/generated-device.ts';
import {
  DUTY,
  NES_DMC_RATES,
  NES_LENGTH_TABLE,
  NES_NOISE_PERIODS,
  NesApu,
} from './apu.ts';

const mameSource = process.env.MAME_SRC ??
  new URL('../../../../mame/', import.meta.url).pathname;
const definitions = indexMameHardware(mameSource);
const types = ['PPU_2C02', 'NES_CONTROL_PORT', 'NES_CART_SLOT'];
const extraction = extractNes({
  mameSource,
  entries: [...types, 'RP2A03G'].map(type => ({
    type,
    definition: definitions.get(type),
    methods: [],
  })),
});

assert.ok(extraction);
assert.deepEqual(extraction.executableTypes.sort(), [...types].sort());
for (const type of types) {
  assert.equal(extraction.executable[type]?.kind, 'device');
}
const ppu = extraction.artifacts.find(artifact =>
  artifact.path.endsWith('ppu_2c02.device.ir.json'));
assert.ok(ppu);
const ppuDefinition = JSON.parse(ppu.contents);
assert.equal(ppuDefinition.summary.diagnostics, 0);
assert.equal(ppuDefinition.summary.methods, ppuDefinition.summary.compiledMethods);
assert.equal(
  ppuDefinition.members.find(
    (member: { name: string }) => member.name === 'm_videoram_addr_mask',
  )?.initial,
  0x3fff,
  'the generated PPU must retain its source constructor video address mask',
);
assert.deepEqual(
  ppuDefinition.links.filter((link: { method?: string }) => link.method)
    .map((link: { call: string; method: string }) => [link.call, link.method]),
  [
    ['m_scanline_callback_proc', 'scanline_irq'],
    ['m_hblank_callback_proc', 'hblank_irq'],
    ['m_latch', 'ppu_latch'],
  ],
);
const drawBackground = ppuDefinition.methods.find(
  (method: { name: string }) => method.name === 'draw_background',
);
assert.equal(
  drawBackground?.program.operations.find(
    (operation: { op: string; name?: string }) =>
      operation.op === 'declare' && operation.name === 'dest',
  )?.valueType,
  'u32*',
  'the generated PPU renderer must retain its framebuffer pointer',
);

clearGeneratedDevices();
registerGeneratedDevice(ppuDefinition);
let currentLine = 0;
const screen = {
  time_until_pos(position: number) {
    const target = ((Math.floor(position) % 262) + 262) % 262;
    let lines = target - currentLine;
    if (lines <= 0) lines += 262;
    return lines / (60 * 262);
  },
  vpos: () => currentLine,
  hpos: () => 0,
};
const ppuRuntime = createDevice('PPU_2C02', {
  clock: 5_369_318,
  finder: () => ({
    cycles_to_attotime: (cycles: number) => cycles / 1_789_773,
    reset: () => undefined,
    set_input_line: () => undefined,
  }),
  calls: {
    screen: () => screen,
    exists: () => 1,
  },
});
for (currentLine = 0; currentLine <= 241; currentLine++) {
  ppuRuntime.tick(1 / (60 * 262));
}
assert.equal(
  ppuRuntime.call('read', 2) & 0x80,
  0x80,
  'the generated PPU scanline timer must re-arm itself and enter vblank',
);
clearGeneratedDevices();

const slot = extraction.artifacts.find(artifact =>
  artifact.path.endsWith('nes_cart_slot.device.ir.json'));
assert.ok(slot);
const slotDefinition = JSON.parse(slot.contents);
assert.equal(slotDefinition.role, 'cartridge');
assert.deepEqual(slotDefinition.bus.ranges, [
  { start: 0x4100, end: 0x5fff, read: 'read_l', write: 'write_l' },
  { start: 0x6000, end: 0x7fff, read: 'read_m', write: 'write_m' },
  { start: 0x8000, end: 0x9fff, bank: 'prg0', write: 'write_h' },
  { start: 0xa000, end: 0xbfff, bank: 'prg1', write: 'write_h' },
  { start: 0xc000, end: 0xdfff, bank: 'prg2', write: 'write_h' },
  { start: 0xe000, end: 0xffff, bank: 'prg3', write: 'write_h' },
]);
assert.deepEqual(Object.keys(slotDefinition.slot.options), ['0', '1', '2', '3', '4']);
for (const mapper of Object.values(slotDefinition.slot.options) as { summary: { diagnostics: number } }[]) {
  assert.equal(mapper.summary.diagnostics, 0);
}
assert.ok(
  slotDefinition.slot.options['4'].members.some(
    (member: { name: string }) => member.name === 'm_prg_mask__nes_txrom_device',
  ),
  'derived MMC3 mask must not alias the base cartridge PRG mask',
);
const apuPlan = compileNesApu(mameSource);
assert.deepEqual(
  apuPlan.internalMap.ranges.map(range => ({
    start: range.start,
    end: range.end,
    read: range.read,
    write: range.write,
  })),
  [
    { start: 0x4000, end: 0x4013, read: undefined, write: 'nesapu.write' },
    { start: 0x4015, end: 0x4015, read: 'nesapu.status_r', write: 'nesapu.write' },
    { start: 0x4017, end: 0x4017, read: undefined, write: 'nesapu.write' },
  ],
);
assert.deepEqual(apuPlan.lengthTable, NES_LENGTH_TABLE);
assert.deepEqual(apuPlan.noisePeriods.ntsc, NES_NOISE_PERIODS);
assert.deepEqual(apuPlan.dmcPeriods.ntsc, NES_DMC_RATES);
assert.deepEqual(
  apuPlan.dutyPatterns,
  DUTY.map(row => row.reduce((value, bit) => (value << 1) | bit, 0)),
);
assert.ok(extraction.artifacts.some(artifact =>
  artifact.path === 'audio/nes-apu.audio.ir.json'));
assert.ok(extraction.artifacts.some(artifact =>
  artifact.path === 'audio/nes-worklet.ts' &&
  artifact.contents.includes("registerProcessor('nes'")));

const apu = new NesApu(apuPlan.clocks.ntsc);
apu.write(0x15, 0x01);
apu.write(0x00, 0x1f);
apu.write(0x02, 0x20);
apu.write(0x03, 0x08);
assert.equal(apu.read4015() & 1, 1, '$4015 must report an active pulse length counter');
apu.tick(apuPlan.frameClocks.ntsc);
assert.equal(apu.irqAsserted(), true, 'four-step frame counter must assert the APU IRQ');
assert.equal(apu.read4015() & 0x40, 0x40);
assert.equal(apu.irqAsserted(), false, '$4015 status read must acknowledge frame IRQ');
assert.ok(
  slotDefinition.slot.options['4'].methods.some(
    (method: { name: string; source: { file: string } }) =>
      method.name === 'write_h' && method.source.file.endsWith('/mmc3.h'),
  ),
  'MMC3 inline write_h override must replace the base no-op',
);
assert.ok(
  extraction.artifacts.every(artifact => !artifact.path.endsWith('.txt')),
);

console.log('nes.spec: PPU, controllers, mappers and RP2A03 APU lower cleanly');
