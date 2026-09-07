import assert from 'node:assert/strict';
import { compileMameHandler } from './handler-ir.ts';
import type { GeneratedExpression } from '../ir/board.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import {
  executeGeneratedHandler,
  executeGeneratedProgram,
} from '../runtime/generated-handler.ts';

const pacmanVideo = compileMameHandler(`
  m_videoram[offset] = data;
  m_bg_tilemap->mark_tile_dirty(offset);
`);
for (const [body, expected] of [
  ['int cursor = 3; ++cursor &= 3; return cursor;', 0],
  ['int cursor = 3; ++cursor += cursor; return cursor;', 7],
  ['int cursor = 3; --cursor *= cursor; return cursor;', 6],
] as const) {
  const program = compileMameHandler(body);
  assert.deepEqual(program.diagnostics, []);
  assert.equal(executeGeneratedProgram(program, {}).value, expected);
}
assert.deepEqual(pacmanVideo.diagnostics, []);
assert.equal(pacmanVideo.operations.length, 2);
assert.equal(pacmanVideo.operations[0]?.op, 'assign');
assert.equal(pacmanVideo.operations[1]?.op, 'call');

const pacmanIrq = compileMameHandler(`
  m_irq_mask = state;
  if (!state)
    m_maincpu->set_input_line(INPUT_LINE_IRQ0, CLEAR_LINE);
`);
assert.deepEqual(pacmanIrq.diagnostics, []);
assert.equal(pacmanIrq.operations[1]?.op, 'if');

const galagaDsw = compileMameHandler(`
  int bit0,bit1;
  bit0 = (ioport("DSWB")->read() >> offset) & 1;
  bit1 = (ioport("DSWA")->read() >> offset) & 1;
  return bit0 | (bit1 << 1);
`);
assert.deepEqual(galagaDsw.diagnostics, []);
assert.equal(galagaDsw.operations.length, 5);
assert.equal(galagaDsw.operations.at(-1)?.op, 'return');

const gngBank = compileMameHandler(`
  if (data == 4)
    m_mainbank->set_entry(4);
  else
    m_mainbank->set_entry(data & 0x03);
`);
assert.deepEqual(gngBank.diagnostics, []);
assert.equal(gngBank.operations[0]?.op, 'if');

const unsupported = compileMameHandler('for (int i = 0; i < 3; i++) m_values[i] = data;');
assert.deepEqual(unsupported.diagnostics, []);
assert.equal(unsupported.operations[0]?.op, 'for');

const compoundFor = compileMameHandler(`
  for (offset >>= 1; offset < 0x400; offset += 32)
    m_values[offset] = data;
`);
assert.deepEqual(compoundFor.diagnostics, []);
assert.equal(compoundFor.operations[0]?.op, 'for');

const bitmap = compileMameHandler(`
  uint8_t x = 0xff;
  while (1) {
    x = x + 1;
    bitmap.pix(0, x) = rgb_t::white();
    if (x == 0) break;
  }
  return m_main_ram[((offs_t)x << 5) | 1];
`);
assert.deepEqual(bitmap.diagnostics, []);
assert.equal(bitmap.operations[1]?.op, 'while');

const doWhile = compileMameHandler(`
  int i = 3;
  do {
    m_values[i] = data;
    i--;
  } while (i >= 0);
`);
assert.deepEqual(doWhile.diagnostics, []);
assert.equal(doWhile.operations[1]?.op, 'do-while');

const bitmapPointers = compileMameHandler(`
  uint32_t *const dst = &bitmap.pix(y);
  auto color = m_palette->pen_color(*m_scroll);
  u32 *const dbase = dst + x * 3;
  dbase[0] = color;
`);
assert.deepEqual(bitmapPointers.diagnostics, []);
assert.equal(bitmapPointers.operations[0]?.op, 'declare');
assert.equal(
  bitmapPointers.operations[0]?.op === 'declare'
    ? bitmapPointers.operations[0].valueType
    : undefined,
  'uint32_t*',
  'local pointer declarators must retain pointer type semantics',
);
assert.equal(
  bitmapPointers.operations[2]?.op === 'declare'
    ? bitmapPointers.operations[2].valueType
    : undefined,
  'u32*',
);
const pointerIncrement = compileMameHandler(`
  u32 values[2];
  u32 *dest = &values[0];
  dest += 1;
  *dest = 7;
  return values[1];
`);
assert.deepEqual(pointerIncrement.diagnostics, []);
assert.equal(
  executeGeneratedHandler(pointerIncrement, {}),
  7,
  'compound pointer arithmetic must retain and advance the generated pointer',
);

const staticTable = compileMameHandler(normalizeMameExecutionSource(`
  static const int timer[4] = { 0x00, 0x10, 0x20, 0x30 };
  return timer[(m_soundcpu->total_cycles() / 512) % 4];
`));
assert.deepEqual(staticTable.diagnostics, []);
assert.equal(
  executeGeneratedHandler(staticTable, {
    calls: { 'm_soundcpu.total_cycles': () => 1024 },
  }),
  0x20,
);

const tileFlipYx = compileMameHandler('return TILE_FLIPYX(data);');
assert.deepEqual(tileFlipYx.diagnostics, []);
assert.equal(executeGeneratedHandler(tileFlipYx, {}, { data: 0 }), 0);
assert.equal(executeGeneratedHandler(tileFlipYx, {}, { data: 1 }), 1);
assert.equal(executeGeneratedHandler(tileFlipYx, {}, { data: 2 }), 2);
assert.equal(executeGeneratedHandler(tileFlipYx, {}, { data: 3 }), 3);

const tileFlipXy = compileMameHandler('return TILE_FLIPXY(data);');
assert.deepEqual(tileFlipXy.diagnostics, []);
assert.equal(executeGeneratedHandler(tileFlipXy, {}, { data: 0 }), 0);
assert.equal(executeGeneratedHandler(tileFlipXy, {}, { data: 1 }), 2);
assert.equal(executeGeneratedHandler(tileFlipXy, {}, { data: 2 }), 1);
assert.equal(executeGeneratedHandler(tileFlipXy, {}, { data: 3 }), 3);

// C number literals: octal, binary, hex/decimal suffixes, floats.
const octal = compileMameHandler('return data & 017;');
assert.deepEqual(octal.diagnostics, []);
assert.equal(executeGeneratedHandler(octal, {}, { data: 0xff }), 0x0f);

const binaryLiteral = compileMameHandler('return data & 0b1010;');
assert.deepEqual(binaryLiteral.diagnostics, []);
assert.equal(executeGeneratedHandler(binaryLiteral, {}, { data: 0xff }), 0b1010);

const suffixed = compileMameHandler('return 0x10UL + 5u;');
assert.deepEqual(suffixed.diagnostics, []);
assert.equal(executeGeneratedHandler(suffixed, {}), 0x15);

// Trailing hex digits must never be eaten as f/l suffixes.
const hexTrailing = compileMameHandler('return (data & 0x0f) + 0xff + 0xffUL;');
assert.deepEqual(hexTrailing.diagnostics, []);
assert.equal(executeGeneratedHandler(hexTrailing, {}, { data: 0x3a }), 0x0a + 0xff + 0xff);

const floatLiteral = compileMameHandler('return 0.25f + 1.5;');
assert.deepEqual(floatLiteral.diagnostics, []);
assert.equal(executeGeneratedHandler(floatLiteral, {}), 1.75);

// MAME BIT(x, n, w) extracts a w-bit field, not a single bit.
const bitField = compileMameHandler('return BIT(offset, 4, 3);');
assert.deepEqual(bitField.diagnostics, []);
assert.equal(executeGeneratedHandler(bitField, {}, { offset: 0x30 }), 3);
assert.equal(executeGeneratedHandler(bitField, {}, { offset: 0x70 }), 7);

// u32 values with bit 31 set shift logically, like C++ unsigned >>.
const highShift = compileMameHandler('return rgb_t::black() >> 24;');
assert.deepEqual(highShift.diagnostics, []);
assert.equal(executeGeneratedHandler(highShift, {}), 0xff);

// Negative (signed) values keep the arithmetic shift.
const signedShift = compileMameHandler('return (0 - 16) >> 2;');
assert.deepEqual(signedShift.diagnostics, []);
assert.equal(executeGeneratedHandler(signedShift, {}), -4);

// Integer division truncates; float division must not.
const intDivision = compileMameHandler('return 7 / 2;');
assert.deepEqual(intDivision.diagnostics, []);
assert.equal(executeGeneratedHandler(intDivision, {}), 3);

const floatDivision = compileMameHandler('return 0.6 / 3;');
assert.deepEqual(floatDivision.diagnostics, []);
assert.ok(Math.abs((executeGeneratedHandler(floatDivision, {}) as number) - 0.2) < 1e-12);

const integralFloatDivision = compileMameHandler('return 1 / 7.0;');
assert.deepEqual(integralFloatDivision.diagnostics, []);
assert.ok(Math.abs((executeGeneratedHandler(integralFloatDivision, {}) as number) - 1 / 7) < 1e-12);

const createdTilemap = { mark_tile_dirty: (_offset: number) => {} };
const tilemapCreation = compileMameHandler(
  'm_bg_tilemap = &machine().tilemap().create(m_gfxdecode);',
);
assert.deepEqual(tilemapCreation.diagnostics, []);
const tilemapMembers: Record<string, unknown> = {};
executeGeneratedHandler(tilemapCreation, {
  members: tilemapMembers,
  calls: { 'machine().tilemap().create': () => createdTilemap },
});
assert.equal(tilemapMembers.m_bg_tilemap, createdTilemap);

const rcDivision = compileMameHandler('return 1 / (RES_K(47) * CAP_U(1));');
assert.deepEqual(rcDivision.diagnostics, []);
assert.ok(Math.abs((executeGeneratedHandler(rcDivision, {}) as number) - 21.2765957) < 1e-4);

const commaAssignments = compileMameHandler(
  'clip.min_y = 0, clip.max_y = 127;',
);
assert.deepEqual(commaAssignments.diagnostics, []);
assert.equal(commaAssignments.operations.length, 2);

const defaultRectangle = compileMameHandler('rectangle clip; clip.min_y = 4;');
assert.deepEqual(defaultRectangle.diagnostics, []);
assert.equal(defaultRectangle.operations[0]?.op, 'declare');

const inactiveIfdef = compileMameHandler(normalizeMameExecutionSource(`
#ifdef UNUSED_RENDER_PATH
  split_render();
#else
  clip = cliprect;
#endif
`));
assert.deepEqual(inactiveIfdef.diagnostics, []);
assert.equal(inactiveIfdef.operations.length, 1);

const constexprLocal = compileMameHandler('constexpr uint8_t HEIGHT = 128;');
assert.deepEqual(constexprLocal.diagnostics, []);
assert.equal(constexprLocal.operations[0]?.op, 'declare');

// Explicit template arguments on a qualified name select a C++ overload; the
// IR keeps the bare name so the runtime can bind std::min once.
const templateCall = compileMameHandler(
  'memcpy(&m_buffered[0], m_spriteram + srcoffset,' +
  ' (std::min<size_t>)(srclength, length() - srcoffset) * sizeof(uint8_t));',
);
assert.deepEqual(templateCall.diagnostics, []);
const memcpyCall = templateCall.operations[0];
assert.equal(memcpyCall?.op, 'call');
assert.equal(
  memcpyCall.op === 'call' && memcpyCall.expression.callee.kind === 'identifier'
    ? memcpyCall.expression.callee.name
    : '',
  'memcpy',
);
const scaled = memcpyCall.op === 'call' ? memcpyCall.expression.args[2] : undefined;
assert.equal(
  scaled?.kind === 'binary' && scaled.left.kind === 'call' &&
    scaled.left.callee.kind === 'identifier'
    ? scaled.left.callee.name
    : '',
  'std::min',
);

// A less-than comparison against a qualified name must not be mistaken for one.
const comparison = compileMameHandler('if (a::b < c) m_x = 1;');
assert.deepEqual(comparison.diagnostics, []);
assert.equal(comparison.operations[0]?.op, 'if');

const conditionalSideEffect = compileMameHandler(
  'Which ? m_fg_tilemap->mark_tile_dirty(offset) : ' +
  'm_bg_tilemap->mark_tile_dirty(offset);',
);
assert.deepEqual(conditionalSideEffect.diagnostics, []);
assert.equal(conditionalSideEffect.operations[0]?.op, 'if');

// Numeric member-template arguments identify MAME's templated input pins.
const memberTemplate = compileMameHandler('m_soundnmi->in_w<0>(0);');
assert.deepEqual(memberTemplate.diagnostics, []);
const memberTemplateCall = memberTemplate.operations[0];
assert.equal(
  memberTemplateCall?.op === 'call' &&
    memberTemplateCall.expression.callee.kind === 'member'
    ? memberTemplateCall.expression.callee.property
    : '',
  'in_w_0',
);

const memberPointerCall = compileMameHandler(`
  if (m_videomode_custom != nullptr)
    (this->*m_videomode_custom)(data);
`);
assert.deepEqual(memberPointerCall.diagnostics, []);
assert.equal(memberPointerCall.operations[0]?.op, 'if');

// Driver handlers use unsized static string tables to select input ports.
const staticArray = compileMameHandler(`
  static const char *const portnames[] = { "DSW0", "DSW1", "IN1", "IN2" };
  return portnames[address & 3];
`);
assert.deepEqual(staticArray.diagnostics, []);
assert.equal(executeGeneratedProgram(staticArray, {}, { address: 6 }).value, 'IN1');

const reinterpretedSpriteRam = compileMameHandler(`
  u16 *const spriteram16 = reinterpret_cast<u16 *>(m_spriteram8->live());
  return spriteram16[0];
`);
assert.deepEqual(reinterpretedSpriteRam.diagnostics, []);
assert.equal(executeGeneratedProgram(reinterpretedSpriteRam, {
  calls: { 'm_spriteram8.live': () => Uint8Array.of(0x34, 0x12) },
}).value, 0x1234);

const crystalClock = compileMameHandler(`
  m_timer->adjust(attotime::from_ticks(256, 24_MHz_XTAL / 4));
`);
assert.deepEqual(crystalClock.diagnostics, []);

// MAME's bit helpers are free function templates. Left as a plain call the
// width is lost and nothing resolves it, so the expression evaluated to zero.
const bitPermutation = compileMameHandler(`
  return bitswap<8>(value, 0, 1, 2, 3, 4, 5, 6, 7);
`);
assert.deepEqual(bitPermutation.diagnostics, []);
assert.equal(
  executeGeneratedProgram(bitPermutation, {}, { value: 0x12 }).value,
  0x48,
);

// A resistor network computed through float locals: `float(R1)` is a functional
// cast rather than a call, and `pull / (pull + par)` divides as floating point
// because `par` was declared float even though the text has no literal.
const resistorNetwork = compileMameHandler(`
  constexpr int R1 = 150;
  constexpr int pull = 220;
  float par = 0;
  par += 1.0f / float(R1);
  par = 1 / par;
  float pot = pull / (pull + par);
  return pot * 1000;
`);
assert.deepEqual(resistorNetwork.diagnostics, []);
assert.equal(
  Math.round(Number(executeGeneratedProgram(resistorNetwork, {}).value)),
  Math.round(220 / (220 + 150) * 1000),
);

// A local array takes its element type from the declaration; ALLOC only knows
// the length, so a float table used to be allocated as bytes and clamped.
const floatTable = compileMameHandler(`
  float weights[4];
  weights[1] = 3 / 2.0;
  return weights[1] * 100;
`);
assert.deepEqual(floatTable.diagnostics, []);
assert.equal(executeGeneratedProgram(floatTable, {}).value, 150);

// Range-for. `for (auto &elem : m_Regs)` gives the element name no storage of
// its own, so a write through it must reach the sequence -- which is the whole
// point of the reference in tms9928a_device::device_reset.
const rangeClear = compileMameHandler(`
  for (auto & elem : m_Regs)
    elem = 0;
`);
assert.deepEqual(rangeClear.diagnostics, []);
assert.equal(rangeClear.operations[0]?.op, 'for');
{
  const m_Regs = [1, 2, 3, 4];
  executeGeneratedProgram(rangeClear, { members: { m_Regs } });
  assert.deepEqual(m_Regs, [0, 0, 0, 0]);
}

// Reads through the binding see the element, and the sequence is walked in
// order rather than by value.
const rangeSum = compileMameHandler(`
  int total = 0;
  for (const auto &value : m_table)
    total += value;
  return total;
`);
assert.deepEqual(rangeSum.diagnostics, []);
assert.equal(
  executeGeneratedProgram(rangeSum, { members: { m_table: [10, 20, 30] } }).value,
  60,
);

// A nested range-for keeps each loop's own binding, and the inner one restores
// the outer's name when it ends.
const rangeNested = compileMameHandler(`
  int total = 0;
  for (auto &outer : m_rows) {
    for (auto &inner : m_cols)
      total += inner;
    total += outer;
  }
  return total;
`);
assert.deepEqual(rangeNested.diagnostics, []);
assert.equal(
  executeGeneratedProgram(rangeNested, {
    members: { m_rows: [1, 2], m_cols: [10, 20] },
  }).value,
  63,
);

// A counted for whose clause holds a conditional is not a range-for: the `:`
// belongs to the `?`, and misreading it would silently drop the loop.
const conditionalClause = compileMameHandler(`
  for (int i = 0; i < (m_wide ? 4 : 2); i++)
    m_values[i] = data;
`);
assert.deepEqual(conditionalClause.diagnostics, []);
assert.equal(conditionalClause.operations[0]?.op, 'for');

// A template argument list belongs to the type. Read as `<` and `>` it made
// `std::vector<uint32_t> &codelookup = ...` an assignment to a comparison --
// and silently, with no diagnostic, so gauntlet_state::video_start emitted a
// broken operation the moment its range-for stopped blocking the handler.
const templateReference = compileMameHandler(`
  std::vector<uint32_t> &codelookup = m_mob->code_lookup();
  for (auto & elem : codelookup)
    elem ^= 0x800;
`);
assert.deepEqual(templateReference.diagnostics, []);
assert.deepEqual(templateReference.operations.map(operation => operation.op), ['declare', 'for']);
{
  // The declaration binds a reference, so the loop must reach the real table.
  const table = [0x000, 0x001, 0x800];
  executeGeneratedProgram(templateReference, {
    referenceCalls: { 'm_mob.code_lookup': () => table },
  });
  assert.deepEqual(table, [0x800, 0x801, 0x000]);
}

// Nested template arguments close on the right bracket, not the first one.
const nestedTemplate = compileMameHandler('std::vector<std::pair<int, int>> rows = source();');
assert.deepEqual(nestedTemplate.diagnostics, []);
assert.equal(nestedTemplate.operations[0]?.op, 'declare');
assert.equal(
  (nestedTemplate.operations[0] as { name: string }).name,
  'rows',
  'the declared name follows the whole template argument list',
);

// A genuine comparison must not be mistaken for one: nothing declarator-shaped
// follows the closing bracket, so these stay expressions.
const angleComparison = compileMameHandler('if (m_count < m_limit) return m_high > m_low;');
assert.deepEqual(angleComparison.diagnostics, []);
assert.equal(angleComparison.operations[0]?.op, 'if');
assert.equal(
  executeGeneratedProgram(
    compileMameHandler('return a < b > c;'),
    { members: { a: 1, b: 2, c: 0 } },
  ).value,
  1,
  '`a < b > c` is still two comparisons',
);

// A C++ aggregate initializer may end on a comma. MAME's hand-aligned tables
// use one (TIA's per-register write-delay table), and rejecting the trailing
// comma rejected the whole declaration.
const trailingComma = compileMameHandler(
  'static const int delay[4] = { 0, 1, 2, 3, }; return delay[offset];',
);
assert.deepEqual(trailingComma.diagnostics, []);
assert.deepEqual(trailingComma.operations.map(operation => operation.op), ['declare', 'return']);
assert.equal(
  executeGeneratedProgram(trailingComma, {}, { offset: 2 }).value,
  2,
  'the table keeps its declared elements, not the trailing hole',
);

// Recovery must always consume a token. A statement that fails on the block's
// own closing brace once left the parser where it started, and it re-reported
// the same statement until the diagnostics array outgrew its maximum length.
const strayBrace = compileMameHandler('m_value = 1; } m_other = 2;');
assert.ok(strayBrace.diagnostics.length > 0, 'the stray brace is reported');
assert.ok(strayBrace.diagnostics.length < 10, 'and reported once, not unboundedly');

// MAME installs address-space taps with a lambda, and every Atari 2600
// bank-switch cartridge switches its bank from one. The capture list carries
// nothing the IR needs, and a parameter the source left unnamed keeps its
// position so the arguments still line up.
const tap = compileMameHandler(
  'space->install_read_tap(0x1ff8, 0x1ff9, "bank", ' +
  '[this] (offs_t address, u8 &, u8) { switch_bank(address - 0x1ff8, 0); });',
);
assert.deepEqual(tap.diagnostics, []);
{
  const call = (tap.operations[0] as { expression: { args: GeneratedExpression[] } }).expression;
  const lambda = call.args[3]!;
  assert.equal(lambda.kind, 'lambda');
  assert.deepEqual(
    (lambda as Extract<GeneratedExpression, { kind: 'lambda' }>).parameters,
    ['address', '', ''],
  );
}
{
  // The lambda is a value: calling it runs the body with the bank switch bound.
  const banks: number[] = [];
  executeGeneratedProgram(tap, {
    calls: {
      'space.install_read_tap': (...args: unknown[]) => {
        (args[3] as (address: number, data: number, mask: number) => void)(0x1ff9, 0, 0xff);
        return 0;
      },
      switch_bank: (bank: unknown) => { banks.push(Number(bank)); return 0; },
    },
  });
  assert.deepEqual(banks, [1], 'the tap ran its body with the tapped address bound');
}

// A lambda with a trailing return type and a named-only parameter list.
const returning = compileMameHandler('auto fn = [this] (int value) -> u8 { return value + 1; };');
assert.deepEqual(returning.diagnostics, []);
assert.equal(returning.operations[0]?.op, 'declare');

// The iteration clause is optional: a loop that advances from inside its own
// body leaves it empty, as TIA's sample loop does.
const openLoop = compileMameHandler(
  'int total = 0; for (int i = 0; i < limit; ) { total += i; i += step; } return total;',
);
assert.deepEqual(openLoop.diagnostics, []);
assert.equal(
  executeGeneratedProgram(openLoop, {}, { limit: 6, step: 2 }).value,
  0 + 2 + 4,
);

// MAME's C-style sound modules recover their own state from a void pointer
// with a cast to a class type. A pointer to a class narrows nothing, so the
// cast is an identity -- and only the pointer form is a cast at all, or every
// parenthesized name would become one.
const chipCast = compileMameHandler('tia *chip = (tia *)_chip; return chip->AUDV[0];');
assert.deepEqual(chipCast.diagnostics, []);
assert.equal(
  executeGeneratedProgram(chipCast, {}, { _chip: { AUDV: [0x0c, 0] } }).value,
  0x0c,
  'the cast passes the object through rather than narrowing it to a number',
);
const notACast = compileMameHandler('return (a) * (b);');
assert.deepEqual(notACast.diagnostics, []);
assert.equal(
  executeGeneratedProgram(notACast, { members: { a: 6, b: 7 } }).value,
  42,
  '`(a) * (b)` is still a multiplication',
);

// MAME's newer bus devices call up to a base through a template class used as
// a name qualifier. Read as a comparison, the whole statement failed to
// parse -- and every Game Boy MBC bank switch went through one.
const templatedBase = compileMameHandler(
  'mbc_ram_device_base<mbc_dual_device_base>::set_bank_rom_fine(entry & 3);',
);
assert.deepEqual(templatedBase.diagnostics, []);
assert.equal(
  (templatedBase.operations[0] as { expression: { callee: { name: string } } })
    .expression.callee.name,
  'mbc_ram_device_base::set_bank_rom_fine',
  'the qualifier keeps the base name the device compiler records methods under',
);
// The disambiguation must not swallow ordinary comparisons.
const lessThan = compileMameHandler('return a < b;');
assert.deepEqual(lessThan.diagnostics, []);
assert.equal(executeGeneratedProgram(lessThan, { members: { a: 1, b: 2 } }).value, 1);
const chained = compileMameHandler('return (a < b) > c;');
assert.deepEqual(chained.diagnostics, []);
assert.equal(
  executeGeneratedProgram(chained, { members: { a: 1, b: 2, c: 0 } }).value,
  1,
);

// M72 constructs its reverse sprite order in a local vector. It must begin as
// an empty growable container rather than numeric zero, and push_back has the
// same run-time effect as JavaScript Array.push.
const localVector = compileMameHandler(normalizeMameExecutionSource(`
  std::vector<int> order;
  order.push_back(4);
  order.push_back(9);
  return order[1] + order.size();
`));
assert.deepEqual(localVector.diagnostics, []);
assert.equal(executeGeneratedProgram(localVector, {}).value, 11);

console.log('handler-ir.spec: 69 passed');
