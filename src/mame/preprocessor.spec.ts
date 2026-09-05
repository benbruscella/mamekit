import assert from 'node:assert/strict';
import {
  collectFunctionMacros,
  collectBitAliasMacros,
  collectDynamicMacros,
  expandDynamicMacros,
  collectMemberAliasMacros,
  expandFunctionMacros,
  expandMemberAliasMacros,
} from './preprocessor.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

check('a multi-line statement macro is collected as one body', () => {
  const macros = collectFunctionMacros(`
#define RESXX_APPLY_ACTIVE_HMOVE(HORZ,MOTION,MOTCLK)   \\
\tif ( curr_x < 7 ) {                                  \\
\t\tHORZ += 8;                                         \\
\t}
`);
  assert.equal(macros.length, 1);
  assert.deepEqual(macros[0]!.parameters, ['HORZ', 'MOTION', 'MOTCLK']);
  assert.match(macros[0]!.body, /HORZ \+= 8;/);
  assert.doesNotMatch(macros[0]!.body, /\\/, 'continuations are joined, not kept');
});

check('a value macro is not a function macro', () => {
  assert.deepEqual(collectFunctionMacros('#define HMOVE_INACTIVE -200\n'), []);
});

check('an expression macro is left for the runtime to route by name', () => {
  // The discrete-sound node macros are the case that matters: their NAME is
  // the worklet input the write is routed to, so expanding them loses it.
  assert.deepEqual(
    collectFunctionMacros('#define NAMCO_54XX_0_DATA(base)  (NODE_RELATIVE(base, 0))\n'),
    [],
  );
});

check('an invocation is substituted with its arguments in place', () => {
  const macros = collectFunctionMacros('#define ADD(A,B) A += (B);\n');
  assert.equal(
    expandFunctionMacros('ADD(total, x + 1)', macros).trim(),
    '(total) += ((x + 1));',
  );
});

check('a braced body swallows the semicolon of its call statement', () => {
  const macros = collectFunctionMacros('#define BUMP(H) if (H < 0) { H += 160; }\n');
  const expanded = expandFunctionMacros('BUMP(horz); horz++;', macros);
  assert.equal(expanded.trim(), 'if ((horz) < 0) { (horz) += 160; } horz++;');
});

check('arguments containing commas inside parens stay whole', () => {
  const macros = collectFunctionMacros('#define ONE(A,B) A = B;\n');
  assert.equal(
    expandFunctionMacros('ONE(dst, std::min(a, b))', macros).trim(),
    '(dst) = (std::min(a, b));',
  );
});

check('an unknown macro-shaped call is left alone', () => {
  const macros = collectFunctionMacros('#define KNOWN(A) A;\n');
  const source = 'BIT(value, 3) + UNKNOWN(x)';
  assert.equal(expandFunctionMacros(source, macros), source);
});

check('a call whose arity does not match is left alone', () => {
  const macros = collectFunctionMacros('#define PAIR(A,B) A = B;\n');
  assert.equal(expandFunctionMacros('PAIR(x)', macros), 'PAIR(x)');
});

check('intrinsics the IR answers itself are never expanded', () => {
  // MAME's own headers define BIT; the runtime implements it. Substituting a
  // redefinition here would shadow the implementation with dead text.
  assert.deepEqual(collectFunctionMacros('#define BIT(x,n) (((x) >> (n)) & 1)\n'), []);
});

check('a macro invoked inside another macro call expands too', () => {
  const macros = collectFunctionMacros('#define SET(A,B) A = B;\n#define ZERO(A) SET(A, 0);\n');
  assert.equal(expandFunctionMacros('ZERO(horz)', macros).replace(/\s+/g, ' ').trim(),
    '((horz)) = (0);;');
});

check('a self-referential macro terminates instead of spinning', () => {
  const macros = collectFunctionMacros('#define LOOP(A) LOOP(A);\n');
  assert.ok(expandFunctionMacros('LOOP(x)', macros).length < 10_000);
});

check('tracing macros are left for the normalizer to strip at the call site', () => {
  // Expanding LOGMASKED would replace one throwaway call with a VERBOSE-guarded
  // block the tracing stripper no longer recognises.
  assert.deepEqual(
    collectFunctionMacros('#define LOGTIMER(...) LOGMASKED(LOG_TIMER, __VA_ARGS__)\n'),
    [],
  );
});

check('an object-like macro naming a device register is a member alias', () => {
  const aliases = collectMemberAliasMacros(
    '#define LCDCONT     m_vid_regs[0x00]  /* LCD control register */\n' +
    '#define CURLINE     m_vid_regs[0x04]  /* Current screen line   */\n',
  );
  assert.deepEqual(aliases, [
    { name: 'LCDCONT', body: 'm_vid_regs[0x00]' },
    { name: 'CURLINE', body: 'm_vid_regs[0x04]' },
  ]);
});

check('an alias expands unparenthesised so it can stay an assignment target', () => {
  const aliases = collectMemberAliasMacros('#define CURLINE m_vid_regs[0x04]\n');
  assert.equal(
    expandMemberAliasMacros('CURLINE = m_current_line;', aliases),
    'm_vid_regs[0x04] = m_current_line;',
  );
});

check('an expression macro is not a member alias', () => {
  // The name is the interface for these; expanding one throws it away.
  assert.deepEqual(collectMemberAliasMacros('#define SGB_XOFFSET 48\n'), []);
  assert.deepEqual(collectMemberAliasMacros('#define SPAN (m_end - m_start)\n'), []);
});

check('a member alias reaches through a struct field chain', () => {
  assert.deepEqual(collectMemberAliasMacros('#define ROW m_regs[BANK].row\n'), [
    { name: 'ROW', body: 'm_regs[BANK].row' },
  ]);
});

check('address-bit aliases retain the handler parameter at each use', () => {
  const aliases = collectBitAliasMacros('#define A15 BIT(offset, 15)\n#define VA12 BIT(va, 12)\n');
  assert.equal(expandMemberAliasMacros('return A15 << 5 | VA12 << 15;', aliases),
    'return BIT(offset, 15) << 5 | BIT(va, 12) << 15;');
});

check('live register and variant macros expand through dependent coordinate macros', () => {
  const macros = collectDynamicMacros(`
#define IS_PAL (m_variant == PAL)
#define LINES (IS_PAL ? 312 : 263)
#define RASTER(a) (IS_PAL ? (a - 16) : (a + 222))
#define SPRITE(n) (m_reg[1 + 2 * (n)])
#define NAMCO_54XX_0_DATA(base) (NODE_RELATIVE(base, 0))
`);
  const expanded = expandDynamicMacros('return LINES + RASTER(SPRITE(3)) + NAMCO_54XX_0_DATA(0);', macros);
  assert.ok(!/\b(?:LINES|IS_PAL|RASTER|SPRITE)\b/.test(expanded));
  assert.match(expanded, /m_variant/);
  assert.match(expanded, /m_reg/);
  assert.match(expanded, /NAMCO_54XX_0_DATA\(0\)/);
});

check('caller locals do not expand symbolic audio interfaces through their formal parameters', () => {
  const macros = collectDynamicMacros(`
#define NODE_INDEX(node) (((node) - NODE_00) / DISCRETE_MAX_OUTPUTS)
#define NODE(n) (NODE_00 + (n) * DISCRETE_MAX_OUTPUTS)
#define NODE_RELATIVE(base, n) NODE(NODE_INDEX(base) + (n))
#define NAMCO_54XX_0_DATA(base) NODE_RELATIVE(base, 0)
#define BITMAPADDR ((data & 8) << 10)
`, new Set(['base', 'data', 'node']));
  const result = expandDynamicMacros('write(NAMCO_54XX_0_DATA(m_basenode), BITMAPADDR);', macros);
  assert.match(result, /NAMCO_54XX_0_DATA\(m_basenode\)/);
  assert.match(result, /data & 8/);
  assert.doesNotMatch(result, /BITMAPADDR|NODE_00/);
});

console.log(`preprocessor.spec: ${passed} passed`);
