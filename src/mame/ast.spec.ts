import {
  MameAstIndex,
  maskComments,
  parseMameAst,
  parseMameSource,
  splitMameArgs,
} from './ast.ts';

let passed = 0;
let failed = 0;
function check(name: string, actual: unknown, expected: unknown): void {
  if (JSON.stringify(actual) === JSON.stringify(expected)) passed++;
  else {
    failed++;
    console.error(`FAIL ${name}\n  expected ${JSON.stringify(expected)}\n  actual   ${JSON.stringify(actual)}`);
  }
}

const source = `// license:BSD-3-Clause
/* preserve
   these lines */
void timeplt_state::timeplt(machine_config &config)
{
  Z80(config, m_maincpu, MASTER_CLOCK / 3 / 2);
  m_mainlatch->q_out_cb<0>().set(FUNC(timeplt_state::nmi_enable_w));
  m_mainlatch->q_out_cb<1>().set(FUNC(timeplt_state::flip_screen_set)).invert();
  m_screen->screen_vblank().append("51xx", FUNC(namco_51xx_device::vblank));
}

ROM_START( timeplt )
  ROM_REGION( 0x10000, "maincpu", 0 )
ROM_END

GAME( 1982, timeplt, 0, timeplt, timeplt, timeplt_state, empty_init, ROT90,
      "Konami", "Time Pilot", MACHINE_SUPPORTS_SAVE )
`;

const masked = maskComments(source);
check('comment masking preserves length', masked.length, source.length);
check('comment masking preserves line count', masked.split('\n').length, source.split('\n').length);
check('comments are removed', masked.includes('preserve'), false);

const unit = parseMameSource('src/mame/konami/timeplt.cpp', source);
check('function count', unit.functions.length, 1);
check('function identity', [unit.functions[0].className, unit.functions[0].name],
  ['timeplt_state', 'timeplt']);
check('statement count', unit.functions[0].statements.length, 4);
check('callback chain', unit.functions[0].statements[2].calls.map(c => [
  c.name, c.templateArgs, c.args,
]), [
  ['q_out_cb', ['1'], []],
  ['set', [], ['FUNC(timeplt_state::flip_screen_set)']],
  ['invert', [], []],
]);
check('statement source line', unit.functions[0].statements[1].span.line, 7);

const index = new MameAstIndex(parseMameAst([{ file: unit.file, source }]));
check('find game macro', index.findAnyMacro(['GAME', 'CONS'], 1, 'timeplt')?.span.line, 16);
check('find rom macro', index.findMacro('ROM_START', 0, 'timeplt')?.span.line, 12);
check('find function', index.findFunction('timeplt_state', 'timeplt')?.span.line, 4);
check('find normalized statement',
  index.findStatement('m_mainlatch -> q_out_cb<0>() . set(FUNC(timeplt_state::nmi_enable_w))')?.span.line,
  7);

const hierarchy = new MameAstIndex(parseMameAst([
  {
    file: 'base.cpp',
    source: 'void base_state::bankselect_w(uint8_t data) { m_bank = data; }',
  },
  {
    file: 'derived.cpp',
    source: 'class derived_state : public base_state { };',
  },
]));
check('class base parsed', hierarchy.ast.units[1].classes[0]?.bases, ['base_state']);
check('inherited function resolved',
  hierarchy.findFunctionInHierarchy('derived_state', 'bankselect_w')?.className,
  'base_state');

const inline = parseMameSource('device.h', `
class scroll_device : public device_t
{
public:
  uint8_t scroll_r(offs_t offset) { return m_scroll[offset & 0x3f]; }
  void scroll_w(offs_t offset, uint8_t data) { m_scroll[offset & 0x3f] = data; }
private:
  uint8_t m_scroll[0x40];
};
`);
check('inline header methods are parsed', inline.functions.map(fn => [
  fn.className, fn.name, fn.parameters, fn.body.trim(),
]), [
  ['scroll_device', 'scroll_r', 'offs_t offset', 'return m_scroll[offset & 0x3f];'],
  ['scroll_device', 'scroll_w', 'offs_t offset, uint8_t data', 'm_scroll[offset & 0x3f] = data;'],
]);
const pointerReturn = parseMameSource('video.cpp', `
inline uint16_t *video_state::video_base(int offset)
{
  return &m_videoram[offset];
}
`);
check('out-of-class pointer-return helper is parsed', pointerReturn.functions.map(fn => [
  fn.className, fn.name, fn.parameters, fn.body.trim(),
]), [[
  'video_state', 'video_base', 'int offset', 'return &m_videoram[offset];',
]]);
check(
  'argument splitter preserves shift expressions',
  splitMameArgs('(i << 1) | 1, value >> 2'),
  ['(i << 1) | 1', 'value >> 2'],
);

const templatedMethod = parseMameSource('template.cpp', `
template<int N>
uint8_t input_device::port_r()
{
  return m_in[N]();
}
`);
check(
  'function template parameters are retained',
  templatedMethod.functions[0]?.templateParameters,
  ['N'],
);

const memberMacros = parseMameSource('timer.cpp', `
TIMER_CALLBACK_MEMBER(test_state::scanline_tick)
{
  int scanline = param;
  m_timer->adjust(m_screen->time_until_pos(scanline), scanline);
}
IRQ_CALLBACK_MEMBER(test_state::interrupt_vector)
{
  return 0xcf;
}
INTERRUPT_GEN_MEMBER(test_state::vblank_irq)
{
  device.execute().set_input_line(0, HOLD_LINE);
}
`);
check('timer callback member parsed',
  [memberMacros.functions[0]?.className, memberMacros.functions[0]?.name, memberMacros.functions[0]?.parameters],
  ['test_state', 'scanline_tick', 'int param']);
check('IRQ callback member parsed', memberMacros.functions[1]?.name, 'interrupt_vector');
check(
  'interrupt generator member parsed',
  [memberMacros.functions[2]?.name, memberMacros.functions[2]?.parameters],
  ['vblank_irq', 'device_t &device'],
);

const lifecycleMacros = parseMameSource('machine.cpp', `
MACHINE_RESET_MEMBER(test_state, common)
{
  m_subcpu->set_input_line(INPUT_LINE_RESET, ASSERT_LINE);
}
MACHINE_RESET_MEMBER(test_state, test)
{
  MACHINE_RESET_CALL_MEMBER(common);
  m_bank = 0;
}
`);
check(
  'machine reset members parsed',
  lifecycleMacros.functions.map(fn => [fn.className, fn.name]),
  [
    ['test_state', 'machine_reset_common'],
    ['test_state', 'machine_reset_test'],
  ],
);
check(
  'lifecycle call macro excluded from executable body',
  lifecycleMacros.functions[1]?.body.includes('MACHINE_RESET_CALL_MEMBER'),
  false,
);

// MAME instantiates some device families from a template base; the base name,
// its parameters and the derived class's arguments all have to survive parsing.
const templates = parseMameSource('bufsprite.h', `
template <typename Type>
class buffered_spriteram_device : public device_t
{
public:
  Type *buffer() { return &m_buffered[0]; }
private:
  required_shared_ptr<Type> m_spriteram;
};

class buffered_spriteram8_device : public buffered_spriteram_device<uint8_t>
{
public:
  buffered_spriteram8_device(const machine_config &mconfig, const char *tag);
};
`);
const base = templates.classes.find(entry => entry.name === 'buffered_spriteram_device');
const derived = templates.classes.find(entry => entry.name === 'buffered_spriteram8_device');
check('template parameters parsed', base?.templateParameters, ['Type']);
check('template base name parsed', derived?.bases, ['buffered_spriteram_device']);
check('template base arguments parsed',
  derived?.baseTemplateArguments?.buffered_spriteram_device, ['uint8_t']);

const outOfLine = parseMameSource('bufsprite.cpp', `
template <typename Type>
void buffered_spriteram_device<Type>::device_start()
{
	m_buffered.resize(length());
}
`);
check('out-of-line template method class', outOfLine.functions[0]?.className,
  'buffered_spriteram_device');
check('out-of-line template method name', outOfLine.functions[0]?.name, 'device_start');

console.log(`ast.spec: ${passed} passed, ${failed} failed`);
if (failed) process.exitCode = 1;
