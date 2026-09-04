import assert from 'node:assert/strict';
import { dereferenceGeneratedValue } from '../ir/execute.ts';
import type { GeneratedDeviceDefinition } from './device-compiler.ts';
import { generatedDeviceMethodsSource } from './device-codegen.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';

const definition: GeneratedDeviceDefinition = {
  schemaVersion: 1,
  type: 'TEST_DEVICE',
  className: 'test_device',
  hierarchy: ['test_device'],
  sourceFiles: ['src/devices/test.cpp'],
  constants: { LIMIT: 4 },
  members: [
    { name: 'm_total', valueType: 'uint16_t', bits: 16, initial: 0 },
    { name: 'm_budget', valueType: 'int', bits: 32, signed: true, initial: 0 },
  ],
  callbacks: [],
  timers: [],
  methods: [
    {
      name: 'step',
      parameters: 'uint16_t value',
      source: { file: 'src/devices/test.cpp', line: 1 },
      program: {
        diagnostics: [],
        operations: [{
          op: 'return',
          value: {
            kind: 'binary',
            operator: '+',
            left: { kind: 'identifier', name: 'value' },
            right: { kind: 'number', value: 1 },
          },
        }],
      },
    },
    {
      name: 'render',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 2 },
      program: {
        diagnostics: [],
        operations: [{
          op: 'for',
          initialize: [{
            op: 'declare',
            name: 'y',
            valueType: 'int',
            value: { kind: 'number', value: 0 },
          }],
          condition: {
            kind: 'binary',
            operator: '<',
            left: { kind: 'identifier', name: 'y' },
            right: { kind: 'identifier', name: 'LIMIT' },
          },
          iterate: [{
            op: 'assign',
            target: { kind: 'identifier', name: 'y' },
            operator: '+=',
            value: { kind: 'number', value: 1 },
          }],
          body: [{
            op: 'for',
            initialize: [{
              op: 'declare',
              name: 'x',
              valueType: 'int',
              value: { kind: 'number', value: 0 },
            }],
            condition: {
              kind: 'binary',
              operator: '<',
              left: { kind: 'identifier', name: 'x' },
              right: { kind: 'identifier', name: 'LIMIT' },
            },
            iterate: [{
              op: 'assign',
              target: { kind: 'identifier', name: 'x' },
              operator: '+=',
              value: { kind: 'number', value: 1 },
            }],
            body: [{
              op: 'assign',
              target: { kind: 'identifier', name: 'm_total' },
              operator: '+=',
              value: {
                kind: 'call',
                callee: { kind: 'identifier', name: 'step' },
                args: [{ kind: 'identifier', name: 'x' }],
              },
            }, {
              op: 'assign',
              target: { kind: 'identifier', name: 'm_budget' },
              operator: '-=',
              value: { kind: 'number', value: 1 },
            }],
          }],
        }],
      },
    },
    {
      name: 'cold_path',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 3 },
      program: {
        diagnostics: [],
        operations: [{
          op: 'assign',
          target: { kind: 'identifier', name: 'm_total' },
          operator: '=',
          value: { kind: 'number', value: 0 },
        }],
      },
    },
  ],
  summary: { methods: 3, compiledMethods: 3, diagnostics: 0 },
};

const emitted = generatedDeviceMethodsSource(definition);
assert.deepEqual(emitted.methods.sort(), ['render', 'step']);
assert.doesNotMatch(emitted.source, /method_cold_path/);
const timerEmitted = generatedDeviceMethodsSource({
  ...definition,
  timers: [{ member: 'm_timer', callback: 'cold_path' }],
});
assert.ok(
  timerEmitted.methods.includes('cold_path'),
  'source-declared timer callbacks must compile even when they contain no loop',
);
const callbackEmitted = generatedDeviceMethodsSource({
  ...definition,
  callbacks: [{
    member: 'm_out_de_cb',
    signal: 'out_de_callback',
    slots: 1,
    initial: 0,
  }],
  hotMethods: ['emit_display_enable'],
  methods: [{
    name: 'emit_display_enable',
    parameters: 'int state',
    source: { file: 'src/devices/test.cpp', line: 4 },
    program: compileMameHandler('m_out_de_cb(state);'),
  }],
});
assert.match(
  callbackEmitted.source,
  /runtime\.invoke\("m_out_de_cb", state\)/,
  'compiled device callback members must dispatch through the runtime member emitter',
);

const methods = Function(`return ${emitted.source}`)() as Record<
  string,
  (runtime: { members: Record<string, unknown> }) => unknown
>;
const runtime = { members: { m_total: 0, m_budget: 0 } };
methods.render!(runtime);
assert.equal(runtime.members.m_total, 40);
assert.equal(runtime.members.m_budget, -16);

const reservedLocal = generatedDeviceMethodsSource({
  ...definition,
  hotMethods: ['reserved_local'],
  methods: [{
    name: 'reserved_local',
    parameters: '',
    source: { file: 'src/devices/test.cpp', line: 5 },
    program: compileMameHandler('uint8_t in = 3; in |= 4; return in;'),
  }],
});
assert.match(reservedLocal.source, /let \$in =/);
assert.equal(
  (Function(`return ${reservedLocal.source}`)() as Record<string, (runtime: unknown) => number>)
    .reserved_local!({ members: {} }),
  7,
);

const unsafeDefinition: GeneratedDeviceDefinition = {
  ...definition,
  delegates: { set_callback: 'm_callback' },
  members: [
    ...definition.members,
    { name: 'm_latch', valueType: 'latch_delegate', initial: 0 },
    { name: 'm_pixels', valueType: 'std::array<u32, 4>', values: [0, 0, 0, 0] },
  ],
  methods: [
    {
      name: 'mutate',
      parameters: 'uint8_t &value',
      source: { file: 'src/devices/test.cpp', line: 4 },
      program: compileMameHandler('value = 7;'),
    },
    {
      name: 'render_with_reference',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 5 },
      program: compileMameHandler(`
        for (int y = 0; y < 2; y++)
          for (int x = 0; x < 2; x++)
            mutate(m_total);
      `),
    },
    {
      name: 'render_with_delegate',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 6 },
      program: compileMameHandler(`
        for (int y = 0; y < 2; y++)
          for (int x = 0; x < 2; x++)
        if (!m_latch.isnull()) m_latch(x);
      `),
    },
    {
      name: 'render_with_mutating_delegate',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 7 },
      program: compileMameHandler(`
        for (int y = 0; y < 2; y++)
          for (int x = 0; x < 2; x++)
            m_callback(m_total);
      `),
    },
    {
      name: 'write_pixel',
      parameters: 'u32 *&dest',
      source: { file: 'src/devices/test.cpp', line: 7 },
      program: compileMameHandler('*dest = 9; dest += 1;'),
    },
    {
      name: 'render_with_pointer',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 8 },
      program: compileMameHandler(`
        u32 *dest = &m_pixels[0];
        for (int y = 0; y < 2; y++)
          for (int x = 0; x < 2; x++)
            write_pixel(dest);
      `),
    },
  ],
};
const unsafeEmitted = generatedDeviceMethodsSource(unsafeDefinition);
assert.deepEqual(
  unsafeEmitted.methods.sort(),
  [
    'mutate',
    'render_with_delegate',
    'render_with_mutating_delegate',
    'render_with_pointer',
    'render_with_reference',
    'write_pixel',
  ],
  'direct codegen must include reference and delegate method closures safely',
);
const optimized = Function(`return ${unsafeEmitted.source}`)() as Record<
  string,
  (runtime: {
    members: Record<string, unknown>;
    calls: Record<string, (...args: unknown[]) => unknown>;
    invoke(name: string, ...args: unknown[]): unknown;
  }) => unknown
>;
// `readIndex`/`writeIndex` carry the host's pointer semantics, which is how
// emitted code stores through a dereference: a generated pointer writes at
// source[offset + index], and plain memory writes at the index itself.
const indexed = {
  pointerStore(pointer: unknown, value: unknown): unknown {
    const p = pointer as { generatedPointer?: true; source?: unknown[]; offset?: number };
    if (p?.generatedPointer) p.source![p.offset!] = value;
    else if (pointer && typeof pointer === 'object') (pointer as Record<number, unknown>)[0] = value;
    return value;
  },
  readIndex(value: unknown, index: number): unknown {
    const pointer = value as { generatedPointer?: true; source?: unknown[]; offset?: number };
    if (pointer?.generatedPointer) return pointer.source![pointer.offset! + index];
    return (value as Record<number, unknown>)?.[index];
  },
  writeIndex(value: unknown, index: number, next: unknown): unknown {
    const pointer = value as { generatedPointer?: true; source?: unknown[]; offset?: number };
    if (pointer?.generatedPointer) pointer.source![pointer.offset! + index] = next;
    else if (value && typeof value === 'object') (value as Record<number, unknown>)[index] = next;
    return next;
  },
};
const optimizedRuntime = {
  members: { m_total: 0, m_budget: 0, m_latch: 0, m_pixels: [0, 0, 0, 0] },
  calls: {
    'm_latch.isnull': () => 1,
    m_callback: (value: unknown) => {
      const reference = value as {
        generatedLValue?: true;
        set(next: number): void;
      };
      assert.equal(reference.generatedLValue, true);
      reference.set(13);
    },
  },
  ...indexed,
  invoke(name: string): unknown {
    throw new Error(`unexpected optimized runtime call ${name}`);
  },
};
optimized.render_with_reference!(optimizedRuntime);
assert.equal(
  optimizedRuntime.members.m_total,
  7,
  'compiled C++ reference parameters must write back to their caller',
);
optimized.render_with_delegate!(optimizedRuntime);
optimized.render_with_mutating_delegate!(optimizedRuntime);
assert.equal(
  optimizedRuntime.members.m_total,
  13,
  'compiled device delegates must write mutable references back to the renderer',
);
optimized.render_with_pointer!(optimizedRuntime);
assert.deepEqual(
  optimizedRuntime.members.m_pixels,
  [9, 9, 9, 9],
  'compiled pointer references must preserve dereference and pointer arithmetic',
);

const pointerAdditionDefinition: GeneratedDeviceDefinition = {
  ...definition,
  hotMethods: ['read_remapped'],
  members: [
    ...definition.members,
    { name: 'm_bytes', valueType: 'std::array<uint8_t, 4>', values: [3, 5, 7, 9] },
  ],
  methods: [{
    name: 'read_remapped',
    parameters: '',
    source: { file: 'src/devices/test.cpp', line: 9 },
    program: compileMameHandler(`
      auto base_ptr = &m_bytes[0];
      uint8_t *page_ptr = base_ptr + 2;
      return page_ptr[0];
    `),
  }],
};
const pointerAdditionEmitted = generatedDeviceMethodsSource(pointerAdditionDefinition);
assert.match(
  pointerAdditionEmitted.source,
  /runtime\.addressOf\(base_ptr, 2\)/,
  'compiled C++ pointer addition must create an offset memory view',
);
const pointerAdditionMethods = Function(
  `return ${pointerAdditionEmitted.source}`,
)() as Record<string, (runtime: {
  members: Record<string, unknown>;
  addressOf(value: unknown, index: number): unknown;
  readIndex(value: unknown, index: number): unknown;
}) => unknown>;
const pointerAdditionRuntime = {
  members: { m_total: 0, m_budget: 0, m_bytes: [3, 5, 7, 9] },
  addressOf(value: unknown, index: number) {
    const pointer = value as { generatedPointer?: boolean; source?: number[]; offset?: number };
    return pointer.generatedPointer
      ? { generatedPointer: true, source: pointer.source!, offset: pointer.offset! + index }
      : { generatedPointer: true, source: value as number[], offset: index };
  },
  readIndex(value: unknown, index: number) {
    const pointer = value as { generatedPointer?: boolean; source?: number[]; offset?: number };
    return pointer.generatedPointer
      ? pointer.source![pointer.offset! + index]
      : (value as number[])[index];
  },
};
assert.equal(
  pointerAdditionMethods.read_remapped!(pointerAdditionRuntime),
  7,
  'compiled pointer addition must retain the original memory and offset',
);

// A C++ switch scopes each case; JavaScript scopes the whole statement. MAME
// declares a working local per arm as a matter of course -- the TMS9928A has
// `addr`, `fg` and `bg` in several of its display-mode arms -- so without a
// block per case the emitted method redeclares them and does not parse.
{
  const switchScopes: GeneratedDeviceDefinition = {
    ...definition,
    hotMethods: ['pick'],
    methods: [{
      name: 'pick',
      parameters: 'uint8_t mode',
      source: { file: 'src/devices/test.cpp', line: 1 },
      program: compileMameHandler(`
        switch (mode)
        {
        case 0:
          {
            uint16_t addr = 1;
            m_total = addr;
            break;
          }
        case 1:
          {
            uint16_t addr = 2;
            m_total = addr;
            break;
          }
        }
      `),
    }],
  };
  const emitted = generatedDeviceMethodsSource(switchScopes);
  assert.ok(emitted.methods.includes('pick'), 'the switch method must be emitted');
  // The proof is that it parses and runs at all: a redeclared `let` is a
  // SyntaxError, which Function() raises here exactly as tsc does in a build.
  const built = new Function(`return ${emitted.source}`)() as
    Record<string, (runtime: unknown, mode: number) => unknown>;
  for (const [mode, expected] of [[0, 1], [1, 2]] as const) {
    const runtime = { members: { m_total: 0 } };
    built.pick!(runtime, mode);
    assert.equal(runtime.members.m_total, expected, `case ${mode} keeps its own local`);
  }
}

// A member holding a C++ pointer is a generated pointer at run time, not the
// object it points at. The interpreter dereferences before it looks for the
// method; emitted code that did not found no `read_byte` on the wrapper, took
// its `?? 0` fallback, and read the TMS9928A's whole display memory as zero.
{
  const pointerCalls: GeneratedDeviceDefinition = {
    ...definition,
    hotMethods: ['fetch'],
    members: [{ name: 'm_space', valueType: 'address_space*', bits: 32 }],
    methods: [{
      name: 'fetch',
      parameters: 'uint16_t addr',
      source: { file: 'src/devices/test.cpp', line: 1 },
      program: compileMameHandler('return m_space->read_byte(addr);'),
    }],
  };
  const emitted = generatedDeviceMethodsSource(pointerCalls);
  assert.ok(emitted.methods.includes('fetch'));
  const built = new Function(`return ${emitted.source}`)() as
    Record<string, (runtime: unknown, addr: number) => unknown>;
  const space = { read_byte: (address: number) => 0x40 + address };
  const runtime = {
    members: { m_space: { generatedPointer: true, source: [space], offset: 0 } },
    dereference: (value: unknown) => {
      const pointer = value as { generatedPointer?: boolean; source?: unknown[]; offset?: number };
      return pointer?.generatedPointer ? pointer.source![pointer.offset!] : value;
    },
  };
  assert.equal(built.fetch!(runtime, 2), 0x42,
    'a member call must reach through the pointer, as the interpreter does');
}

// A framework service chained on a call -- `screen().vpos()` -- has no target
// device to resolve, so it used to disqualify a method from codegen entirely.
// That left the TMS9928A's per-scanline renderer interpreted and the
// ColecoVision at 17 fps; the runtime binds these chains for every device.
{
  const hostService: GeneratedDeviceDefinition = {
    ...definition,
    hotMethods: ['line'],
    methods: [{
      name: 'line',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 1 },
      program: compileMameHandler('m_total = screen().vpos() * 2;'),
    }],
  };
  const emitted = generatedDeviceMethodsSource(hostService);
  assert.ok(
    emitted.methods.includes('line'),
    'a method calling a bound framework service must still compile',
  );
  assert.match(emitted.source, /runtime\.calls\["screen\(\)\.vpos"\]/);
  const built = new Function(`return ${emitted.source}`)() as
    Record<string, (runtime: unknown) => unknown>;
  const runtime = { members: { m_total: 0 }, calls: { 'screen().vpos': () => 21 } };
  built.line!(runtime);
  assert.equal(runtime.members.m_total, 42);
}

// A chain the runtime does NOT bind still keeps its method interpreted, so the
// emitter never invents a service that would silently answer 0.
{
  const unknownService: GeneratedDeviceDefinition = {
    ...definition,
    hotMethods: ['odd'],
    methods: [{
      name: 'odd',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 1 },
      program: compileMameHandler('m_total = cassette().position();'),
    }],
  };
  assert.ok(
    !generatedDeviceMethodsSource(unknownService).methods.includes('odd'),
    'an unbound framework chain must leave the method interpreted',
  );
}

// ALLOC knows an array's length, while the declaration owns its element type.
// K051960 uses -1 in an int array as its inactive-sprite sentinel; emitting a
// Uint8Array changes that sentinel to 255 and draws every inactive sprite.
{
  const typedLocals: GeneratedDeviceDefinition = {
    ...definition,
    hotMethods: ['sentinel'],
    methods: [{
      name: 'sentinel',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 1 },
      program: compileMameHandler(`
        int sorted[2];
        sorted[0] = -1;
        sorted[1] = 300;
        return sorted[0] + sorted[1];
      `),
    }],
  };
  const emitted = generatedDeviceMethodsSource(typedLocals);
  assert.match(emitted.source, /new Int32Array\(new Uint8Array/);
  const built = new Function(`return ${emitted.source}`)() as
    Record<string, (runtime: unknown) => unknown>;
  const runtime = {
    members: {},
    add: (left: number, right: number) => left + right,
    readIndex: (memory: ArrayLike<number>, index: number) => memory[index] ?? 0,
    writeIndex: (memory: { [index: number]: number }, index: number, value: number) => {
      memory[index] = value;
      return value;
    },
  };
  assert.equal(built.sentinel!(runtime), 299,
    'direct local arrays must preserve their source-declared signed width');
}

// Empty local vectors need a real array in emitted hot handlers too. M72's
// draw_sprites pushes every sprite offset, then walks this list backwards.
{
  const vectorLocals: GeneratedDeviceDefinition = {
    ...definition,
    hotMethods: ['sprite_order'],
    methods: [{
      name: 'sprite_order',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 1 },
      program: compileMameHandler(normalizeMameExecutionSource(`
        std::vector<int> order;
        order.push_back(4);
        order.push_back(9);
        return order[1] + order.size();
      `)),
    }],
  };
  const emitted = generatedDeviceMethodsSource(vectorLocals);
  assert.match(emitted.source, /\(order\)\.push\(4\)/);
  const built = new Function(`return ${emitted.source}`)() as
    Record<string, (runtime: unknown) => unknown>;
  assert.equal(built.sprite_order!({
    members: {},
    add: (a: number, b: number) => a + b,
    dereference: dereferenceGeneratedValue,
    readIndex: (memory: ArrayLike<number>, index: number) => memory[index] ?? 0,
  }), 11);
}

console.log('device-codegen.spec: IR selection, dependency closure, case scoping, host services and pointer calls passed');
