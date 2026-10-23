import assert from 'node:assert/strict';
import { compileMameHandler } from '../mame/handler-ir.ts';
import { normalizeMameExecutionSource } from '../mame/cpu-compiler.ts';
import {
  applyGeneratedMacro,
  compileGeneratedMachineHandler,
  copyGeneratedBytes,
  executeGeneratedHandler,
  executeGeneratedMachineDelegate,
  executeGeneratedMachineProgram,
  executeGeneratedProgram,
  generatedVectorMethod,
  noteCallLinksChanged,
  prepareGeneratedMachinePositional,
  prepareGeneratedMachineRead,
  prepareGeneratedMachineWrite,
  REFERENCE_PARAMETERS,
} from './execute.ts';
import type { BoardIr, GeneratedHandler, GeneratedHandlerProgram } from './board.ts';

// The interpreter's breadth is covered where its output is compared against the
// compiler that produced it (src/runtime/generated-handler.spec.ts and the
// device/cpu specs). This spec pins the contract src/ir owns: one interpreter,
// shared by the knowledge-graph builder at generation time and the browser at
// run time, that refuses to execute a program the compiler could not lower.

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

const program = (operations: GeneratedHandlerProgram['operations']): GeneratedHandlerProgram =>
  ({ operations, diagnostics: [] });

check('a returned expression comes back as a number', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{ op: 'return', value: { kind: 'number', value: 0x2a } }]),
      {},
    ),
    0x2a,
  );
});

check('rgb_t preserves both RGB and ARGB constructor ordering', () => {
  const rgb = compileGeneratedMachineHandler(
    { handlers: [], devices: [] } as unknown as BoardIr,
    {
      id: 'handler:fixture.rgb', ownerClass: 'fixture', method: 'rgb',
      parameters: '', program: compileMameHandler('return rgb_t(0x34, 0x56, 0x78);'),
    },
    {},
  );
  const argb = compileGeneratedMachineHandler(
    { handlers: [], devices: [] } as unknown as BoardIr,
    {
      id: 'handler:fixture.argb', ownerClass: 'fixture', method: 'argb',
      parameters: '', program: compileMameHandler('return rgb_t(0x12, 0x34, 0x56, 0x78);'),
    },
    {},
  );
  assert.equal(rgb?.({}), 0xff785634);
  assert.equal(argb?.({}), 0x12785634);
});

check('handler arguments are readable as locals', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{ op: 'return', value: { kind: 'identifier', name: 'data' } }]),
      {},
      { data: 7 },
    ),
    7,
  );
});

check('straight-line machine handlers compile to equivalent cached closures', () => {
  const handler: GeneratedHandler = {
    id: 'handler:fixture_state.consume_r',
    ownerClass: 'fixture_state',
    method: 'consume_r',
    parameters: '',
    program: program([
      {
        op: 'if',
        condition: {
          kind: 'binary', operator: '>',
          left: { kind: 'identifier', name: 'm_accum' },
          right: { kind: 'number', value: 0 },
        },
        then: [{
          op: 'assign', target: { kind: 'identifier', name: 'm_accum' },
          operator: '-=', value: { kind: 'number', value: 1 },
        }],
      },
      { op: 'return', value: { kind: 'identifier', name: 'm_accum' } },
    ]),
  };
  const state = { m_accum: 2 };
  const compiled = compileGeneratedMachineHandler(
    { handlers: [handler], devices: [] } as unknown as BoardIr,
    handler,
    {
      members: state,
      getters: { m_accum: () => state.m_accum },
      setters: { m_accum: value => { state.m_accum = value; } },
    },
  );
  assert.ok(compiled);
  assert.equal(compiled({}), 1);
  assert.equal(compiled({}), 0);
});

check('compiled handlers observe driver members created after compilation', () => {
  const handler: GeneratedHandler = {
    id: 'handler:fixture_state.accumulate_r',
    ownerClass: 'fixture_state',
    method: 'accumulate_r',
    parameters: '',
    program: program([
      {
        op: 'assign', target: { kind: 'identifier', name: 'm_accum' },
        operator: '+=', value: { kind: 'number', value: 1 },
      },
      { op: 'return', value: { kind: 'identifier', name: 'm_accum' } },
    ]),
  };
  const state: Record<string, unknown> = {};
  const compiled = compileGeneratedMachineHandler(
    { handlers: [handler], devices: [] } as unknown as BoardIr,
    handler,
    { members: state },
  );
  assert.ok(compiled);
  assert.equal(compiled({}), 1);
  assert.equal(compiled({}), 2);
});

check('68000 physical IPL line aliases retain their interrupt levels', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{ op: 'return', value: { kind: 'identifier', name: 'M68K_IRQ_IPL1' } }]),
      {},
    ),
    1,
  );
});

check('scoped device constants resolve through source-derived leaf names', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: { kind: 'identifier', name: 'z8002_device::NVI_LINE' },
      }]),
      { constants: { NVI_LINE: 0 } },
    ),
    0,
  );
});

check('runtime-indexed finder arrays invoke their live target', () => {
  let line = -1;
  executeGeneratedHandler(
    program([{
      op: 'call',
      expression: {
        kind: 'call',
        callee: {
          kind: 'member',
          object: {
            kind: 'index',
            object: { kind: 'identifier', name: 'm_subcpu' },
            index: { kind: 'identifier', name: 'Which' },
          },
          property: 'set_input_line',
        },
        args: [{ kind: 'number', value: 0 }, { kind: 'number', value: 1 }],
      },
    }]),
    {
      constants: { Which: 1 },
      members: {
        m_subcpu: [
          { set_input_line: () => {} },
          { set_input_line: (value: number) => { line = value; } },
        ],
      },
    },
  );
  assert.equal(line, 0);
});

check('members are read and written through the bindings', () => {
  const members: Record<string, unknown> = { m_irq_mask: 0 };
  executeGeneratedHandler(
    program([{
      op: 'assign',
      target: { kind: 'identifier', name: 'm_irq_mask' },
      operator: '=',
      value: { kind: 'identifier', name: 'state' },
    }]),
    { members },
    { state: 1 },
  );
  assert.equal(members.m_irq_mask, 1);
});

check('source member arrays are zero-initialized lazily on indexed writes', () => {
  const members: Record<string, unknown> = {};
  executeGeneratedHandler(
    program([{
      op: 'assign',
      target: {
        kind: 'index',
        object: { kind: 'identifier', name: 'm_data' },
        index: { kind: 'number', value: 2 },
      },
      operator: '=',
      value: { kind: 'number', value: 0x5a },
    }]),
    { members },
  );
  assert.equal((members.m_data as number[])[0] ?? 0, 0);
  assert.equal((members.m_data as number[])[2], 0x5a);
});

check('nested source member arrays are materialized on indexed writes', () => {
  const members: Record<string, unknown> = {};
  executeGeneratedHandler(
    program([{
      op: 'assign',
      target: {
        kind: 'index',
        object: {
          kind: 'index',
          object: { kind: 'identifier', name: 'm_duty_cycle' },
          index: { kind: 'number', value: 1 },
        },
        index: { kind: 'number', value: 2 },
      },
      operator: '=',
      value: { kind: 'number', value: 7 },
    }]),
    { members },
  );
  assert.equal((members.m_duty_cycle as number[][])[1]![2], 7);
});

check('device finders with get/set methods remain pointer-like objects', () => {
  const device = { get: () => 0, set: (_name: string, _value: number) => {} };
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: {
          kind: 'binary',
          operator: '!=',
          left: { kind: 'identifier', name: 'm_device' },
          right: { kind: 'number', value: 0 },
        },
      }]),
      { members: { m_device: device } },
    ),
    1,
  );
});

check('a program that falls off the end returns nothing', () => {
  assert.deepEqual(executeGeneratedProgram(program([]), {}), { returned: false });
});

check('membank finder calls retain their string tag', () => {
  let selected = -1;
  executeGeneratedHandler(
    program([{
      op: 'call',
      expression: {
        kind: 'call',
        callee: {
          kind: 'member',
          object: {
            kind: 'call',
            callee: { kind: 'identifier', name: 'membank' },
            args: [{ kind: 'string', value: 'bank1' }],
          },
          property: 'set_entry',
        },
        args: [{ kind: 'number', value: 2 }],
      },
    }]),
    { calls: { 'bank1.set_entry': value => { selected = value; } } },
  );
  assert.equal(selected, 2);
});

check('64-bit function-style casts preserve timer divisors', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: {
          kind: 'binary',
          operator: '%',
          left: { kind: 'number', value: 302_464 },
          right: {
            kind: 'call',
            callee: { kind: 'identifier', name: 'uint64_t' },
            args: [{ kind: 'number', value: 40_960 }],
          },
        },
      }]),
      {},
    ),
    15_744,
  );
});

check('direct-initialized bitmap references preserve their runtime object', () => {
  const bitmap = { 'pix=': () => {} };
  assert.deepEqual(
    executeGeneratedProgram(
      program([{
        op: 'return',
        value: {
          kind: 'call',
          callee: { kind: 'identifier', name: 'bitmap_ind16' },
          args: [{
            kind: 'call',
            callee: { kind: 'identifier', name: 'auto' },
            args: [{ kind: 'identifier', name: 'bitmap' }],
          }],
        },
      }]),
      {},
      { bitmap },
    ),
    { returned: true, value: bitmap },
  );
});

check('std::copy_n copies between source memory containers', () => {
  const source = Uint8Array.of(4, 5, 6, 7);
  const destination = new Array(4).fill(0);
  executeGeneratedHandler(
    program([
      {
        op: 'assign',
        target: { kind: 'identifier', name: 'cursor' },
        operator: '=',
        value: {
          kind: 'call',
          callee: { kind: 'identifier', name: 'std::copy_n' },
          args: [
            { kind: 'identifier', name: 'source' },
            { kind: 'number', value: 3 },
            { kind: 'identifier', name: 'destination' },
          ],
        },
      },
      {
        op: 'assign',
        target: {
          kind: 'unary',
          operator: '*',
          operand: { kind: 'identifier', name: 'cursor' },
        },
        operator: '=',
        value: { kind: 'number', value: 9 },
      },
    ]),
    {},
    { source, destination, cursor: 0 },
  );
  assert.deepEqual(destination, [4, 5, 6, 9]);
});

check('direct device macros preserve C short casts', () => {
  assert.equal(applyGeneratedMacro('short', [0xff80]), -128);
  assert.equal(applyGeneratedMacro('short', [0x0261]), 0x0261);
});

check('finite hardware initialization loops may exceed 65536 iterations', () => {
  assert.equal(
    executeGeneratedHandler(
      program([
        {
          op: 'for',
          initialize: [{
            op: 'declare',
            name: 'i',
            valueType: 'int',
            value: { kind: 'number', value: 0 },
          }],
          condition: {
            kind: 'binary',
            operator: '<',
            left: { kind: 'identifier', name: 'i' },
            right: { kind: 'number', value: 131_071 },
          },
          iterate: [{
            op: 'assign',
            target: { kind: 'identifier', name: 'i' },
            operator: '+=',
            value: { kind: 'number', value: 1 },
          }],
          body: [],
        },
        { op: 'return', value: { kind: 'identifier', name: 'i' } },
      ]),
      {},
    ),
    131_071,
  );
});

// MAME spells every framework read as a call. The runtime models some of those
// surfaces as data — a generated pixmap's extent is a field — so the value has
// to decide. Returning 0 for the data spelling turned `pixmap.width() - 1`
// into an all-ones mask and let Zaxxon's background sample past every row.
check('a zero-argument call on a scalar member is that member', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: {
          kind: 'binary',
          operator: '-',
          left: {
            kind: 'call',
            callee: {
              kind: 'member',
              object: { kind: 'identifier', name: 'pixmap' },
              property: 'width',
            },
            args: [],
          },
          right: { kind: 'number', value: 1 },
        },
      }]),
      { members: { pixmap: { width: 256, height: (): number => 4096 } } },
    ),
    255,
  );
});

// The method spelling of the same accessor keeps working, and a call with
// arguments is still a call: neither may be answered with a stored value.
check('a callable member is still called', () => {
  const bindings = { members: { pixmap: { width: 256, height: (): number => 4096 } } };
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: {
          kind: 'call',
          callee: {
            kind: 'member',
            object: { kind: 'identifier', name: 'pixmap' },
            property: 'height',
          },
          args: [],
        },
      }]),
      bindings,
    ),
    4096,
  );
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: {
          kind: 'call',
          callee: {
            kind: 'member',
            object: { kind: 'identifier', name: 'pixmap' },
            property: 'width',
          },
          args: [{ kind: 'number', value: 1 }],
        },
      }]),
      bindings,
    ),
    0,
  );
});

// A program with diagnostics never lowered cleanly. Running it anyway would
// execute a partial translation of the MAME source.
check('a program with compiler diagnostics refuses to run', () => {
  assert.throws(
    () => executeGeneratedProgram({ operations: [], diagnostics: ['unsupported syntax'] }, {}),
    /cannot execute handler with compiler diagnostics: unsupported syntax/,
  );
});

// C++ pointer arithmetic on a bare memory container. MAME walks a PROM this
// way (`color_prom += 0x40`); combining it as a number turned the local into a
// scalar and every later read through it returned zero.
check('advancing a pointer local keeps addressing its memory', () => {
  const program = compileMameHandler(`
    const uint8_t *rom = memregion("proms")->base();
    rom += 0x40;
    return rom[1];
  `);
  assert.deepEqual(program.diagnostics, []);
  const bytes = Uint8Array.from({ length: 0x80 }, (_unused, index) => index);
  assert.equal(
    executeGeneratedProgram(program, {
      referenceCalls: { memregion: () => ({ base: () => bytes, bytes: () => bytes.length }) },
    }).value,
    0x41,
  );
});

// A local array is only a byte array when the source says so. The declared
// element type has to reach the allocation, or wider values are silently
// clamped as they are stored.
check('a local array is allocated at its declared element width', () => {
  const program = compileMameHandler(`
    rgb_t pens[2];
    pens[0] = 0xff804020;
    return pens[0];
  `);
  assert.deepEqual(program.diagnostics, []);
  assert.equal(executeGeneratedProgram(program, {}).value, 0xff804020);
});

// MAME's Game Boy PPU interleaves two 8-bit tile planes into a 16-bit shift
// register with three chained 64-bit multiplies. Every constant in it is wider
// than a double can hold, so computing it in floating point produced zero for
// every pixel and drew a blank screen.
check('a 64-bit literal promotes its expression to exact arithmetic', () => {
  const program = compileMameHandler(`
    uint8_t plane0 = 0xf0;
    uint8_t plane1 = 0x3c;
    return (((((plane0 * 0x0101010101010101U) & 0x8040201008040201U)
        * 0x0102040810204081U) >> 49) & 0x5555)
      | (((((plane1 * 0x0101010101010101U) & 0x8040201008040201U)
        * 0x0102040810204081U) >> 48) & 0xAAAA);
  `);
  assert.deepEqual(program.diagnostics, []);
  // The reference answer, computed the way C does it.
  const interleave = (plane0: bigint, plane1: bigint): number => Number(
    ((((plane0 * 0x0101010101010101n) & 0x8040201008040201n)
      * 0x0102040810204081n) >> 49n) & 0x5555n |
    ((((plane1 * 0x0101010101010101n) & 0x8040201008040201n)
      * 0x0102040810204081n) >> 48n) & 0xAAAAn,
  );
  assert.equal(executeGeneratedProgram(program, {}).value, interleave(0xf0n, 0x3cn));
});

check('a wide literal narrows back to a number once the result fits', () => {
  const program = compileMameHandler('return (0x0101010101010101U & 0xff) + 1;');
  assert.deepEqual(program.diagnostics, []);
  const value = executeGeneratedProgram(program, {}).value;
  assert.equal(typeof value, 'number');
  assert.equal(value, 2);
});

// The prepared entry points a bus or a signal calls an emitted handler through
// hand it its arguments directly, and must mean what the general dispatch
// means: the same runtime, links refreshed when a binding changes.
check('prepared reads, writes and positional calls agree with the general dispatch', () => {
  const read: GeneratedHandler = {
    id: 'handler:read', ownerClass: 'test_state', method: 'read', parameters: 'offs_t offset',
    program: compileMameHandler('return m_ram[offset] + m_bias->get();'),
  };
  const write: GeneratedHandler = {
    id: 'handler:write', ownerClass: 'test_state', method: 'write', parameters: 'offs_t offset, uint8_t data',
    program: compileMameHandler('m_ram[offset] = data;'),
  };
  const line: GeneratedHandler = {
    id: 'handler:line', ownerClass: 'test_state', method: 'line_w', parameters: 'int state',
    program: compileMameHandler('m_latched = state;'),
  };
  const machine = {
    handlers: [read, write, line],
    compiledHandlerLinks: ['m_bias.get'],
    compiledHandlers: {
      'test_state.read': (runtime: { members: { m_ram: Uint8Array }; links?: Record<string, () => number> }, offset: number) =>
        runtime.members.m_ram[offset]! + runtime.links!['m_bias.get']!(),
      'test_state.write': (runtime: { members: { m_ram: Uint8Array } }, offset: number, data: number) => {
        runtime.members.m_ram[offset] = data;
      },
      'test_state.line_w': (runtime: { members: Record<string, unknown> }, state: number) => {
        runtime.members.m_latched = state;
      },
    },
  } as unknown as BoardIr;
  const members: Record<string, unknown> = { m_ram: new Uint8Array(4), m_latched: 0 };
  const calls: Record<string, () => number> = { 'm_bias.get': () => 10 };
  const bindings = { members, calls };
  const prepared = prepareGeneratedMachineRead(machine, read, bindings);
  prepareGeneratedMachineWrite(machine, write, bindings)!(2, 5);
  assert.equal(prepared(2), 15);
  assert.equal(prepared(2), executeGeneratedMachineProgram(machine, read, bindings, { offset: 2 }).value);
  calls['m_bias.get'] = () => 20;
  noteCallLinksChanged();
  assert.equal(prepared(2), 25, 'a rebound call is seen by an entry point prepared before it');
  prepareGeneratedMachinePositional(machine, line, bindings)!([1]);
  assert.equal(members.m_latched, 1);
  assert.equal(prepareGeneratedMachinePositional({ ...machine, compiledHandlers: {} } as BoardIr, line, bindings), undefined,
    'a handler with no emitted body has no positional form');
});

// The runtime emitted board code reads its members and links from has no
// palette of its own: every read is a fresh scratch array, as it always was.
check('a board handler runtime palette is a fresh scratch array per read', () => {
  const pen: GeneratedHandler = {
    id: 'handler:pen', ownerClass: 'test_state', method: 'pen', parameters: '',
    program: compileMameHandler('return 0;'),
  };
  let seen: unknown[] = [];
  const machine = {
    handlers: [pen],
    compiledHandlers: {
      'test_state.pen': (runtime: { palette: number[] }) => {
        runtime.palette[0] = 7;
        seen = [runtime.palette[0], runtime.palette === runtime.palette];
        return 0;
      },
    },
  } as unknown as BoardIr;
  executeGeneratedMachineProgram(machine, pen, { members: {}, calls: {} }, {});
  assert.deepEqual(seen, [undefined, false]);
});

// MAME's CBM quickload reads its file through device_image_interface: the
// load address into a scalar's own bytes, the program into a vector, a header
// into a char buffer, and answers std::pair<error, message> -- which a
// delegate hands back whole, for `auto [err, message]` to unpack.
check('a file read fills a scalar, a vector and a buffer, and a pair comes back whole', () => {
  const file = (bytes: number[]) => {
    const data = new Uint8Array(bytes);
    let position = 0;
    return {
      length: () => data.length,
      fread: (buffer: unknown, length: number) => {
        const count = Math.min(length, data.length - position);
        copyGeneratedBytes(buffer, data.subarray(position, position + count), count);
        position += count;
        return count;
      },
    };
  };
  const load: GeneratedHandler = {
    id: 'handler:.load', ownerClass: '', method: 'load', parameters: 'device_image_interface &image',
    // Normalised as the graph builder normalises a handler body.
    program: compileMameHandler(normalizeMameExecutionSource(`
      char magic[2];
      std::vector<uint8_t> data;
      uint16_t address = 0;
      int size = image.length();
      if (image.fread(magic, sizeof(magic)) != sizeof(magic))
        return std::make_pair(image_error::UNSPECIFIED, std::string());
      if (memcmp(magic, "OK", sizeof(magic)))
        return std::make_pair(image_error::INVALIDIMAGE, std::string());
      image.fread(&address, 2);
      address = little_endianize_int16(address);
      size -= 4;
      data.resize(size);
      image.fread(&data[0], size);
      return std::make_pair(address, data[size - 1]);
    `)),
  };
  const machine = { handlers: [load] } as unknown as BoardIr;
  const run = (bytes: number[]) =>
    executeGeneratedMachineDelegate(machine, load, { members: {}, calls: {} }, { image: file(bytes) });
  assert.deepEqual(run([0x4f, 0x4b, 0x01, 0x08, 0xaa, 0xbb, 0xcc]), [0x0801, 0xcc],
    'both bytes of the address land, little-endian, and the vector holds the rest');
  assert.deepEqual(run([0x4e, 0x4f, 0x01, 0x08]), [3, ''], 'image_error::INVALIDIMAGE is 3');
  assert.deepEqual(run([0x4f]), [8, ''], 'a short read is image_error::UNSPECIFIED');
});

check('a struct, or a value never set, behind an address is not overwritten as a scalar', () => {
  const struct = { a: 1, b: 2 };
  const untouched = (held: unknown) => ({ generatedPointer: true, target: { get: () => held, set: () => { throw new Error('written'); } }, offset: 0 });
  copyGeneratedBytes(untouched(struct), new Uint8Array([9, 9]), 2);
  copyGeneratedBytes(untouched(undefined), new Uint8Array([9, 9]), 2);
  assert.deepEqual(struct, { a: 1, b: 2 });
});

// A C string is a pointer, so no string is nullptr -- the C64 cartridge
// feature "0" included -- and atol reads it as C does.
check('a string is never nullptr, and atol reads one', () => {
  const run = (source: string) => executeGeneratedProgram(compileMameHandler(source), {
    members: {},
    referenceCalls: { get_feature: (name: unknown) => name === 'exrom' ? '0' : 0 },
    callParameters: { get_feature: ['std::string_view feature_name'] },
  }, {}).value;
  assert.equal(run('return get_feature("exrom") != nullptr;'), 1);
  assert.equal(run('return get_feature("game") != nullptr;'), 0);
  assert.equal(run('return atol(get_feature("exrom")) + atol("12");'), 12);
});

// std::vector's insert and erase take iterators -- positions in the vector --
// and an array has neither method: the floppy drive's every track write was
// optional-chained into nothing, so each 1541 write failed its verify.
check('std::vector insert and erase work at iterators', () => {
  const run = (source: string) => executeGeneratedProgram(
    compileMameHandler(normalizeMameExecutionSource(source)), { members: {} }, {}).value;
  assert.equal(run(`
    std::vector<int> v;
    v.push_back(1); v.push_back(2); v.push_back(4);
    v.insert(v.begin() + 2, 3);
    v.erase(v.begin());
    v.erase(v.end() - 1);
    return v[0] * 10 + v[1] + v.size() * 100;`), 223);
  const track = [1, 2, 3, 4, 5];
  generatedVectorMethod(track, 'erase', { generatedPointer: true, source: track, offset: 1 },
    { generatedPointer: true, source: track, offset: 3 });
  assert.deepEqual(track, [1, 4, 5]);
  assert.throws(() => generatedVectorMethod(track, 'erase', [9]), /does not point into the vector/);
  assert.equal(generatedVectorMethod({ erase: (value: number) => value * 2 }, 'erase', 4), 8,
    'anything else keeps its own method');
});

// The 6805's device_reset clears its IRQ lines with std::fill over
// std::begin/std::end, and its device_start sizes the cycle range with
// std::min_element/std::max_element. All four answered 0 (#178).
check('std::fill and min/max_element over array iterators', () => {
  const members = { m_irq_state: [1, 1, 0], m_cycles: [5, 2, 9, 2] };
  executeGeneratedProgram(compileMameHandler(normalizeMameExecutionSource(`
    std::fill(std::begin(m_irq_state), std::end(m_irq_state), 0);
    m_min = *std::min_element(std::begin(m_cycles), std::end(m_cycles));
    m_max = *std::max_element(std::begin(m_cycles), std::end(m_cycles));`)), { members } as never);
  assert.deepEqual(members.m_irq_state, [0, 0, 0]);
  assert.equal((members as Record<string, unknown>).m_min, 2);
  assert.equal((members as Record<string, unknown>).m_max, 9);
});

// The floppy drive's call_load spells it `std::strcmp`, and an unknown macro
// answered 0: equal, so a list's write_protected "false" protected the disk.
check('std::strcmp compares like strcmp', () => {
  assert.equal(applyGeneratedMacro('std::strcmp', ['true', 'true']), 0);
  assert.notEqual(applyGeneratedMacro('std::strcmp', ['false', 'true']), 0);
});

// A TZX block reads its 3-byte length through a pointer into the tape
// (`get_u24le(&cur_block[16])`); read as a bare array it was 0, and Elite's
// 48K tape stopped after its BASIC loader.
check('multibyte loads read through a pointer', () => {
  const tape = new Uint8Array([0, 0, 0x02, 0x1c, 0x00, 0x11]);
  const at = (offset: number) => ({ generatedPointer: true, source: tape, offset });
  assert.equal(applyGeneratedMacro('get_u24le', [at(2)]), 0x1c02);
  assert.equal(applyGeneratedMacro('get_u24le', [at(3)]), 0x11001c);
  assert.equal(applyGeneratedMacro('get_u16le', [at(2)]), 0x1c02);
  assert.equal(applyGeneratedMacro('get_u24le', [[1, 2, 3]]), 0x030201);
});

check('a string is a non-null const char * in a condition', () => {
  // MAME's slot code tests a software-list feature before reading it:
  // `if (get_feature("mirroring"))`, then `!strcmp(mirroring, "vertical")`.
  // Read as Number("vertical") the test was zero and every feature skipped.
  const program = compileMameHandler(`{
    if (get_feature("mirroring")) {
      const char *mirroring = get_feature("mirroring");
      if (!strcmp(mirroring, "vertical")) hit(1);
    }
    if (get_feature("absent")) hit(2);
    if (get_feature("zero") && !strcmp(get_feature("zero"), "0")) hit(3);
  }`);
  const hits: unknown[] = [];
  const features: Record<string, string> = { mirroring: 'vertical', zero: '0' };
  executeGeneratedProgram(program, {
    members: {},
    referenceCalls: { get_feature: (name: unknown) => features[String(name)] ?? 0 },
    calls: { hit: (value: unknown) => { hits.push(value); } },
    callParameters: { get_feature: ['std::string_view feature_name'] },
  } as never);
  assert.deepEqual(hits, [1, 3]);
});

check('a host object writes back through the reference parameters it names', () => {
  // `hook.image_file()->length(len)`: util::core_file answers through a
  // std::uint64_t &, and read as a value the NES slot saw an empty file.
  const file = {
    length: (result: { set(value: number): void }) => { result.set(40976); return 0; },
    [REFERENCE_PARAMETERS]: { length: [0] },
  };
  const program = compileMameHandler('{ uint64_t len = 0; file.length(len); return len; }');
  const result = executeGeneratedProgram(program, { members: { file } } as never);
  assert.equal(result.value, 40976);
});

console.log(`execute.spec: ${passed} passed, 0 failed`);
