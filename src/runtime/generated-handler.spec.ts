import assert from 'node:assert/strict';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import { normalizeMameExecutionSource } from '../mame/cpu-compiler.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import {
  executeGeneratedHandler,
  executeGeneratedMachineHandler,
  executeGeneratedMachineProgram,
  generatedHandlerRegistry,
  wireGeneratedDevice,
} from './generated-handler.ts';
import type { BoardIr } from '../ir/board.ts';

const shares = { m_videoram: new Uint8Array(8) };
const program = compileMameHandler(`
  m_videoram[offset] = data;
  m_bg_tilemap->mark_tile_dirty(offset);
`);
executeGeneratedHandler(program, { members: shares }, { offset: 3, data: 0xa5 });
assert.equal(shares.m_videoram[3], 0xa5);

const dsw = compileMameHandler(`
  int bit0, bit1;
  bit0 = (ioport("DSWB")->read() >> offset) & 1;
  bit1 = (ioport("DSWA")->read() >> offset) & 1;
  return bit0 | (bit1 << 1);
`);
assert.equal(executeGeneratedHandler(dsw, {
  inputs: { read: tag => tag === 'DSWA' ? 0b10 : 0b01 },
}, { offset: 0 }), 1);
assert.equal(executeGeneratedHandler(dsw, {
  inputs: { read: tag => tag === 'DSWA' ? 0b10 : 0b01 },
}, { offset: 1 }), 2);

let bank = -1;
const bankProgram = compileMameHandler(`
  if (data == 4) m_mainbank->set_entry(4);
  else m_mainbank->set_entry(data & 0x03);
`);
executeGeneratedHandler(bankProgram, {
  calls: { 'm_mainbank.set_entry': value => { bank = value; } },
}, { data: 7 });
assert.equal(bank, 3);

const adpcmWrites: Array<[string, number]> = [];
const selectedDeviceProgram = compileMameHandler(`
  msm5205_device *adpcm = (offset & 1) ? m_adpcm2.target() : m_adpcm1.target();
  if (adpcm != nullptr)
    adpcm->data_w(data);
`);
assert.deepEqual(selectedDeviceProgram.diagnostics, []);
for (const offset of [0, 1]) {
  executeGeneratedHandler(selectedDeviceProgram, {
    calls: {
      'm_adpcm1.data_w': data => { adpcmWrites.push(['msm1', data]); },
      'm_adpcm2.data_w': data => { adpcmWrites.push(['msm2', data]); },
    },
  }, { offset, data: 0xa0 + offset });
}
assert.deepEqual(adpcmWrites, [['msm1', 0xa0], ['msm2', 0xa1]]);

let enabled = 0;
executeGeneratedHandler(compileMameHandler('m_irq_enabled = data & 1;'), {
  setters: { m_irq_enabled: value => { enabled = value; } },
}, { data: 3 });
assert.equal(enabled, 1);

const values = new Uint8Array(4);
executeGeneratedHandler(compileMameHandler(`
  for (int i = 0; i < 4; i++)
    m_values[i] = i + 1;
`), { members: { m_values: values } });
assert.deepEqual([...values], [1, 2, 3, 4]);

const pointerMemory = Uint8Array.of(0x11, 0x22, 0x33, 0x44);
assert.equal(executeGeneratedHandler(compileMameHandler(`
  uint8_t *cursor = m_memory + 2;
  cursor[0] = 0xaa;
  return cursor[1];
`), { members: { m_memory: pointerMemory } }), 0x44);
assert.deepEqual([...pointerMemory], [0x11, 0x22, 0xaa, 0x44]);

const pixels: number[] = [];
const bitmapProgram = compileMameHandler(`
  uint8_t x = 0xfe;
  while (1) {
    x = x + 1;
    bitmap.pix(0, x) = x;
    if (x == 0) break;
  }
  return ((offs_t)x << 5) | 1;
`);
assert.equal(executeGeneratedHandler(bitmapProgram, {
  calls: { 'bitmap.pix=': (_y, _x, value) => { pixels.push(value); } },
}), 1);
assert.deepEqual(pixels, [0xff, 0]);

assert.equal(executeGeneratedHandler(compileMameHandler(`
  if (!m_cpu->suspended(7)) return 1;
  return 0;
`), {}), 1);
assert.equal(executeGeneratedHandler(compileMameHandler(`
  attotime period = attotime::from_hz(1500) / 2;
  return period;
`), {}), 1 / 3000);
const tableProgram = compileMameHandler(normalizeMameExecutionSource(`
  static const int offsets[2][2] = {{ 0, 1 }, { 2, 3 }};
  return offsets[row][column];
`));
assert.deepEqual(tableProgram.diagnostics, []);
assert.equal(executeGeneratedHandler(tableProgram, {}, { row: 1, column: 0 }), 2);

const tileFlags = compileMameHandler(`
  return ((attr & 0x40) ? TILE_FLIPX : 0) |
    ((attr & 0x20) ? TILE_FLIPY : 0);
`);
assert.equal(executeGeneratedHandler(tileFlags, {}, { attr: 0x00 }), 0);
assert.equal(executeGeneratedHandler(tileFlags, {}, { attr: 0x40 }), 1);
assert.equal(executeGeneratedHandler(tileFlags, {}, { attr: 0x20 }), 2);
assert.equal(executeGeneratedHandler(tileFlags, {}, { attr: 0x60 }), 3);

const machine: BoardIr = {
  schemaVersion: BOARD_IR_SCHEMA_VERSION,
  connections: [],
  game: 'fixture',
  family: 'fixture',
  driverFile: 'fixture.cpp',
  execution: {
    cpus: [],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
    frameEvents: [],
  },
  callbacks: [],
  handlers: [{
    id: 'handler:fixture_state:read',
    ownerClass: 'fixture_state',
    method: 'read',
    program: compileMameHandler('return 0xbf;'),
  }],
  maps: [{
    id: 'map',
    className: 'fixture_state',
    name: 'main',
    ranges: [{
      id: 'range',
      start: 0,
      end: 0,
      raw: '',
      read: 'fixture_state.read',
      props: {},
    }],
  }],
};
const registry = generatedHandlerRegistry(machine);
assert.equal(registry.read['fixture_state.read']!(0, 0), 0xbf);

const installedMachine: BoardIr = {
  ...machine,
  execution: {
    ...machine.execution,
    cpus: [{
      tag: 'maincpu',
      type: 'fixture',
      clock: 1,
      region: 'maincpu',
      ranges: [{
        start: 0x5000,
        end: 0x50ff,
        kind: 'handler',
        read: 'fixture_state.read',
      }],
    }],
  },
  maps: [],
};
assert.equal(
  generatedHandlerRegistry(installedMachine).read['fixture_state.read']!(0x5000, 0),
  0xbf,
  'driver-init handlers appended to the executable CPU map must be registered',
);

{
  const directCalls: string[] = [];
  const directRam = new Uint8Array(8);
  const directMachine: BoardIr = {
    ...machine,
    handlers: [{
      id: 'handler:fixture_state:videoram_w',
      ownerClass: 'fixture_state',
      method: 'videoram_w',
      parameters: 'offs_t offset, uint8_t data',
      program: compileMameHandler(`
        m_screen->update_partial(m_screen->vpos());
        m_videoram[offset] = data;
        m_bg_tilemap->mark_tile_dirty(offset);
      `),
    }],
    maps: [{
      id: 'map',
      className: 'fixture_state',
      name: 'main',
      ranges: [{
        id: 'video',
        start: 0,
        end: 7,
        raw: '',
        write: 'fixture_state.videoram_w',
        props: {},
      }],
    }],
  };
  const directRegistry = generatedHandlerRegistry(directMachine, {
    members: {
      m_screen: {
        vpos: () => 4,
        update_partial: (line: number) => { directCalls.push(`partial:${line}`); },
      },
      m_videoram: directRam,
      m_bg_tilemap: {
        mark_tile_dirty: (offset: number) => { directCalls.push(`dirty:${offset}`); },
      },
    },
  });
  directRegistry.write['fixture_state.videoram_w']!(3, 3, 0xa5);
  assert.equal(directRam[3], 0xa5);
  assert.deepEqual(directCalls, ['partial:4', 'dirty:3']);
  directRegistry.write['fixture_state.videoram_w']!(3, 3, 0xa5);
  assert.deepEqual(directCalls, [
    'partial:4',
    'dirty:3',
    'partial:4',
    'dirty:3',
  ]);
}

{
  const objectCalls: string[] = [];
  const objectRam = new Uint8Array(0x100);
  const objectMachine: BoardIr = {
    ...machine,
    handlers: [{
      id: 'handler:galaxian_state:galaxian_objram_w',
      ownerClass: 'galaxian_state',
      method: 'galaxian_objram_w',
      parameters: 'offs_t offset, uint8_t data',
      body: `
        m_screen->update_partial(m_screen->vpos());
        m_spriteram[offset] = data;
        if (offset < 0x40) {
          if ((offset & 0x01) == 0) {
            if (m_frogger_adjust) data = (data >> 4) | (data << 4);
            if (!m_sfx_adjust) m_bg_tilemap->set_scrolly(offset >> 1, data);
            else m_bg_tilemap->set_scrollx(offset >> 1, m_x_scale*data);
          } else {
            for (offset >>= 1; offset < 0x0400; offset += 32)
              m_bg_tilemap->mark_tile_dirty(offset);
          }
        }
      `,
      program: compileMameHandler(`
        m_screen->update_partial(m_screen->vpos());
        m_spriteram[offset] = data;
        if (offset < 0x40) {
          if ((offset & 0x01) == 0) {
            if (m_frogger_adjust) data = (data >> 4) | (data << 4);
            if (!m_sfx_adjust) m_bg_tilemap->set_scrolly(offset >> 1, data);
            else m_bg_tilemap->set_scrollx(offset >> 1, m_x_scale*data);
          } else {
            for (offset >>= 1; offset < 0x0400; offset += 32)
              m_bg_tilemap->mark_tile_dirty(offset);
          }
        }
      `),
    }],
    maps: [{
      id: 'map',
      className: 'galaxian_state',
      name: 'main',
      ranges: [{
        id: 'objects',
        start: 0,
        end: 0xff,
        raw: '',
        write: 'galaxian_state.galaxian_objram_w',
        props: {},
      }],
    }],
  };
  const objectRegistry = generatedHandlerRegistry(objectMachine, {
    members: {
      m_screen: {
        vpos: () => 12,
        update_partial: (line: number) => { objectCalls.push(`partial:${line}`); },
      },
      m_spriteram: objectRam,
      m_frogger_adjust: 0,
      m_sfx_adjust: 0,
      m_x_scale: 3,
      m_bg_tilemap: {
        set_scrolly: (column: number, value: number) =>
          { objectCalls.push(`scrolly:${column}:${value}`); },
        set_scrollx: (row: number, value: number) =>
          { objectCalls.push(`scrollx:${row}:${value}`); },
        mark_tile_dirty: (offset: number) =>
          { objectCalls.push(`dirty:${offset}`); },
      },
    },
  });
  objectRegistry.write['galaxian_state.galaxian_objram_w']!(2, 2, 0x55);
  assert.equal(objectRam[2], 0x55);
  assert.deepEqual(objectCalls, ['partial:12', 'scrolly:1:85']);
  objectRegistry.write['galaxian_state.galaxian_objram_w']!(2, 2, 0x55);
  assert.deepEqual(objectCalls, [
    'partial:12',
    'scrolly:1:85',
    'partial:12',
    'scrolly:1:85',
  ]);
}

let irqMask = 0;
let q0: ((state: number) => void) | undefined;
const device = {
  on: (_signal: string, callback: (state: number) => void, slot = 0) => {
    if (slot === 0) q0 = callback;
  },
};
const latchMachine: BoardIr = {
  ...machine,
  callbacks: [{
    id: 'callback:latch:0',
    ownerTag: 'latch',
    signal: 'q_out_cb',
    slot: 0,
    operation: 'set',
    targetClass: 'fixture_state',
    targetMethod: 'irq_w',
  }],
  connections: [{
    callbackId: 'callback:latch:0',
    effect: { kind: 'handler', handler: 'fixture_state.irq_w' },
    transforms: [],
  }],
  handlers: [{
    id: 'handler:fixture_state:irq_w',
    ownerClass: 'fixture_state',
    method: 'irq_w',
    program: compileMameHandler('m_irq_mask = state;'),
  }],
};
const latchHandler = latchMachine.handlers![0]!;
wireGeneratedDevice(device, latchMachine, 'latch', 'q_out_cb', new Map([
  ['callback:latch:0', {
    run: (state: number) => {
      executeGeneratedMachineHandler(
        latchMachine,
        latchHandler,
        { setters: { m_irq_mask: value => { irqMask = value; } } },
        { state, data: state },
      );
    },
    transforms: [],
    reads: false,
  }],
]));
q0?.(1);
assert.equal(irqMask, 1);

const compositeState: Record<string, unknown> = { m_last_irq_state: 0 };
const compositeMachine: BoardIr = {
  ...machine,
  devices: [{
    id: 'device:audio',
    tag: 'audio',
    type: 'AUDIO',
    member: 'm_audio',
  }],
  handlers: [{
    id: 'handler:driver:sound_on_w',
    ownerClass: 'driver_state',
    method: 'sound_on_w',
    program: compileMameHandler('m_audio->sh_irqtrigger_w(1);'),
  }, {
    id: 'handler:audio:sh_irqtrigger_w',
    ownerClass: 'audio_device',
    method: 'sh_irqtrigger_w',
    parameters: 'int state',
    program: compileMameHandler('m_last_irq_state = state;'),
  }],
};
executeGeneratedMachineHandler(
  compositeMachine,
  compositeMachine.handlers![0]!,
  { members: compositeState },
  {},
);
assert.equal(
  compositeState.m_last_irq_state,
  1,
  'a source handler may call a uniquely resolved method on a configured composite device member',
);

const concreteDeviceState: Record<string, unknown> = {};
const concreteDeviceMachine: BoardIr = {
  ...machine,
  devices: [{ id: 'device:dac', tag: 'dac', type: 'AD7533', member: 'm_dac' }],
  handlers: [{
    id: 'handler:csd:porta_w',
    ownerClass: 'csd_device',
    method: 'porta_w',
    program: compileMameHandler('m_dac->write(data);'),
  }, {
    id: 'handler:ssio:write',
    ownerClass: 'ssio_device',
    method: 'write',
    parameters: 'uint8_t data',
    program: compileMameHandler('m_wrong_source_handler = data;'),
  }],
};
executeGeneratedMachineHandler(
  concreteDeviceMachine,
  concreteDeviceMachine.handlers![0]!,
  { members: concreteDeviceState },
  { data: 0x5a },
);
assert.equal(
  concreteDeviceState.m_wrong_source_handler,
  undefined,
  'a concrete hardware finder must not fall back to an unrelated source method',
);

const frameworkSinkMachine: BoardIr = {
  ...machine,
  handlers: [{
    id: 'handler:driver:coin_counter_w',
    ownerClass: 'driver_state',
    method: 'coin_counter_w',
    program: compileMameHandler('machine().bookkeeping().coin_counter_w(0, state);'),
  }],
};
assert.doesNotThrow(() => executeGeneratedMachineHandler(
  frameworkSinkMachine,
  frameworkSinkMachine.handlers![0]!,
  {},
  { state: 1 },
), 'framework service calls must not resolve back to a source wrapper with the same method name');

const filterCalls: number[][] = [];
const filterMachine: BoardIr = {
  ...machine,
  handlers: [{
    id: 'handler:audio:filter_w',
    ownerClass: 'audio_device',
    method: 'filter_w',
    parameters: 'offs_t offset, uint8_t data',
    program: compileMameHandler('set_filter(0, 0, offset & 3);'),
  }, {
    id: 'handler:audio:set_filter',
    ownerClass: 'audio_device',
    method: 'set_filter',
    parameters: 'int no, int ch, int data',
    program: compileMameHandler(`
      int C = 0;
      if (BIT(data, 0)) C += 220000;
      if (BIT(data, 1)) C += 47000;
      m_filter[no][ch]->filter_rc_set_RC(
        filter_rc_device::LOWPASS_3R, 1000, 5100, 0, CAP_P(C));
    `),
  }],
};
executeGeneratedMachineProgram(
  filterMachine,
  filterMachine.handlers![0]!,
  {
    members: {
      m_filter: [[{
        filter_rc_set_RC: (...values: number[]) => { filterCalls.push(values); },
      }]],
    },
  },
  { offset: 3, data: 0 },
);
assert.deepEqual(filterCalls[0]?.slice(0, 4), [0, 1000, 5100, 0]);
assert.ok(Math.abs(filterCalls[0]![4]! - 267000e-12) < 1e-15);

const spriteRam = Uint8Array.from({ length: 32 }, (_, index) => index);
const pointerSlice = compileMameHandler(`
  auto spritebase = &m_spriteram[m_sprites_base];
  auto base = &spritebase[4];
  base[2] = 0xa5;
  return *base + base[2];
`);
assert.deepEqual(pointerSlice.diagnostics, []);
assert.equal(executeGeneratedHandler(pointerSlice, {
  members: { m_spriteram: spriteRam, m_sprites_base: 8 },
}), 12 + 0xa5);
assert.equal(spriteRam[14], 0xa5);

const sourceRectangle = {
  min_x: 10,
  max_x: 20,
  min_y: 30,
  max_y: 40,
  contains() { return 1; },
};
assert.equal(executeGeneratedHandler(compileMameHandler(`
  rectangle clip = cliprect;
  clip.min_y = 0;
  clip = cliprect;
  clip.max_y = 127;
  return cliprect.min_y + cliprect.max_y;
`), {}, { cliprect: sourceRectangle }), 70);
assert.deepEqual(
  [sourceRectangle.min_x, sourceRectangle.max_x, sourceRectangle.min_y, sourceRectangle.max_y],
  [10, 20, 30, 40],
  'C++ rectangle locals must copy rather than alias their source value',
);

let requiredDeviceState = 0;
const requiredDeviceCall = compileMameHandler('m_cpu->set_input_line(0, 1);');
executeGeneratedHandler(requiredDeviceCall, {
  members: { m_cpu: 0 },
  calls: {
    'm_cpu.set_input_line': (_line, state) => {
      requiredDeviceState = Number(state);
      return 0;
    },
  },
});
assert.equal(requiredDeviceState, 1);

let indexedDeviceData = 0;
executeGeneratedHandler(
  compileMameHandler('m_ay8910[0]->data_address_w(1, 0x2a);'),
  {
    calls: {
      'm_ay8910[0].data_address_w': (_offset, data) => {
        indexedDeviceData = Number(data);
        return 0;
      },
    },
  },
);
assert.equal(indexedDeviceData, 0x2a);

// C and C++ library primitives MAME device sources rely on.
const buffered = new Uint8Array(8);
const live = Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8]);
executeGeneratedHandler(
  compileMameHandler(
    'memcpy(&m_buffered[0], m_live + 2, (std::min<size_t>)(3, 8) * sizeof(uint8_t));',
  ),
  { members: { m_buffered: buffered, m_live: live } },
);
assert.deepEqual([...buffered], [3, 4, 5, 0, 0, 0, 0, 0]);

const clamped = executeGeneratedHandler(
  compileMameHandler('return std::max(3, std::min(9, 5));'),
  { members: {} },
);
assert.equal(clamped, 5);

// A memory container assigned to a member must stay a container: numeric
// setters exist to apply bit widths and would flatten it to zero.
const resized: Record<string, unknown> = { m_buffered: new Uint8Array(0) };
executeGeneratedHandler(
  compileMameHandler('m_buffered.resize(4);'),
  {
    members: resized,
    getters: { m_buffered: () => resized.m_buffered },
    setters: { m_buffered: value => { resized.m_buffered = value; } },
  },
);
assert.ok(ArrayBuffer.isView(resized.m_buffered), 'resize must preserve the container');
assert.equal((resized.m_buffered as Uint8Array).length, 4);

console.log('generated-handler.spec: 21 passed');
