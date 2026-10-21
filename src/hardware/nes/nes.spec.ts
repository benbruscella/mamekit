import assert from 'node:assert/strict';
import { extractNes } from './extract.ts';
import { inheritCardInterface } from '../../ir/card-interface.ts';
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
const cardArtifact = (key: string) => extraction.artifacts.find(artifact =>
  artifact.path === `devices/nes_cart_slot/${key}`);
const txromExecutable = cardArtifact('nes_txrom.ts');
assert.ok(txromExecutable, 'each card type is a module of its own');
assert.match(
  txromExecutable.contents,
  // The fixed array may be indexed directly (and, as nothing rebinds it, read
  // once into a local), but the resulting nametable address must still retain
  // its pointer base and offset.
  /runtime\.addressOf\(base_ptr, (?:runtime\.readIndex\()?\(?(?:members\.|h_)m_nt_orig\b/,
  'runtime MMC3 mirroring changes must retain offset nametable pointers',
);
assert.equal(slotDefinition.role, 'cartridge');
const cardsFor = (pcbList: string) => slotDefinition.bus.ranges
  .find((range: { cards?: string[] }) => range.cards?.includes(pcbList))?.cards as string[] | undefined;
assert.deepEqual(
  slotDefinition.bus.ranges.map(({ cards: _cards, ...range }: { cards?: string[] }) => range),
  [
    { start: 0x4100, end: 0x5fff, read: 'read_l', write: 'write_l' },
    { start: 0x6000, end: 0x7fff, read: 'read_m', write: 'write_m' },
    { start: 0x8000, end: 0x9fff, bank: 'prg0', write: 'write_h' },
    { start: 0xa000, end: 0xbfff, bank: 'prg1', write: 'write_h' },
    { start: 0xc000, end: 0xdfff, bank: 'prg2', write: 'write_h' },
    { start: 0xe000, end: 0xffff, bank: 'prg3', write: 'write_h' },
    // machine_start's per-board installs, after the banks they override
    { start: 0x8000, end: 0xffff, read: 'read_h' },
    { start: 0x4020, end: 0x40ff, write: 'write_ex' },
    { start: 0x4020, end: 0x40ff, read: 'read_ex', write: 'write_ex' },
  ],
);
assert.ok(cardsFor('exrom'), 'MMC5 reads its own PRG window (read_h)');
assert.ok(cardsFor('ade'), 'the Aladdin deck enhancer reads its own PRG window (read_h)');
assert.ok(cardsFor('smb2j'), 'SMB2J decodes $4020-$40ff');
assert.equal(cardsFor('txrom'), undefined, 'MMC3 keeps the common banked reads');

// Every board MAME's nes_cart lists is a card, or says why it is not.
const cards = slotDefinition.slot.cards as Record<string, string>;
const unsupported = (slotDefinition.slot.unsupported ?? {}) as Record<string, string>;
assert.ok(Object.keys(cards).length > 390, `${Object.keys(cards).length} NES boards compile`);
for (const option of ['nrom', 'sxrom', 'uxrom', 'cnrom', 'txrom', 'exrom', 'jyc_a', 'vrc6', 'namcot_163', 'sunsoft_fme7']) {
  assert.ok(cards[option], `${option} is a supported board`);
}
for (const [option, reason] of Object.entries(unsupported)) {
  assert.ok(!cards[option] && reason.length, `${option} is either a card or a reason`);
}
assert.deepEqual(slotDefinition.slot.options, {}, 'no card ships inline with the slot');
const txrom = JSON.parse(cardArtifact('nes_txrom.device.ir.json')!.contents);
assert.equal(txrom.summary.diagnostics, 0);
assert.equal(txrom.inheritsCardInterface, true, 'MMC3 inherits the interface the slot carries');
const txromMethods = inheritCardInterface(txrom.methods, slotDefinition.slot.cardInterface) as
  { name: string; source: { file: string } }[];
assert.ok(
  JSON.stringify(txrom.methods).length < JSON.stringify(txromMethods).length / 3,
  'a card carries a reference, not a copy, for each interface method it compiled identically',
);
assert.ok(
  txrom.members.some((member: { name: string }) => member.name === 'm_prg_mask__nes_txrom_device'),
  'derived MMC3 mask must not alias the base cartridge PRG mask',
);
// The slot's own PCB lookup runs over MAME's file-scope tables: call_load_pcb
// sets a board's wiring only `if (m_pcb_id == KONAMI_VRC6)` and the like, and
// with pcb_list unbound every such branch was skipped -- the VRC6 decoded its
// sound registers on the wrong address lines and played nothing.
{
  const tables = Object.fromEntries((slotDefinition.members as { name: string; arrayLength?: number }[])
    .filter(member => ['pcb_list', 'mmc_list'].includes(member.name))
    .map(member => [member.name, member.arrayLength]));
  assert.ok((tables.pcb_list ?? 0) > 390 && (tables.mmc_list ?? 0) > 350, `slot tables lifted: ${JSON.stringify(tables)}`);
  clearGeneratedDevices();
  registerGeneratedDevice(slotDefinition);
  const lookup = createDevice('NES_CART_SLOT') as unknown as { invoke(name: string, ...args: unknown[]): unknown };
  assert.equal(lookup.invoke('nes_get_pcb_id', 'vrc6'), slotDefinition.constants.KONAMI_VRC6);
  assert.equal(lookup.invoke('nes_get_pcb_id', 'txrom'), slotDefinition.constants.STD_TXROM);
  clearGeneratedDevices();
}

// A cartridge's own sound chip is a child of its card, with the clock and the
// route MAME's device_add_mconfig gives it: the board mixes it beside the APU.
for (const [key, type, gain] of [
  ['nes_exrom', 'MMC5_SOUND', 0.9], ['nes_vrc6', 'VRC6', 1], ['nes_namcot163', 'NAMCO_163', 0.5],
] as const) {
  const card = JSON.parse(cardArtifact(`${key}.device.ir.json`)!.contents);
  const chip = card.children?.find((child: { type: string }) => child.type === type);
  assert.ok(chip, `${key} carries its ${type}`);
  assert.equal(Math.round(chip.clock), 1_789_773, `${type} runs at XTAL(21'477'272)/12`);
  assert.deepEqual(chip.routes, [{ output: -1, target: 'addon', gain }], `${type} is routed to the cartridge's speaker`);
  assert.equal(chip.definition.summary.diagnostics, 0);
}

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
  txromMethods.some(method => method.name === 'write_h' && method.source.file.endsWith('/mmc3.h')),
  'MMC3 inline write_h override must replace the base no-op',
);
assert.ok(
  txromMethods.some(method => method.name === 'device_nes_cart_interface::write_h'),
  'the overridden base write_h stays reachable under its qualified name',
);
assert.ok(
  extraction.artifacts.every(artifact => !artifact.path.endsWith('.txt')),
);

console.log(`nes.spec: PPU, controllers, ${Object.keys(cards).length} cartridge boards and RP2A03 APU lower cleanly`);
