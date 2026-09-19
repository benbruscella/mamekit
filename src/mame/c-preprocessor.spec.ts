import assert from 'node:assert/strict';
import { CPreprocessor } from './c-preprocessor.ts';

const squash = (text: string) => text.replace(/\s+/g, ' ').trim();
const files: Record<string, string> = {};
const preprocessor = (defines: Record<string, string> = {}) => new CPreprocessor({
  defines,
  read: (path) => files[path] === undefined ? undefined : { path, source: files[path]! },
});

// Token pasting builds the name; `#` stringises.
assert.equal(squash(preprocessor().run('a.cpp', `
#define NAME(base) base##_8_op0
#define STR(x) #x
void NAME(pixblt)() { log(STR(hello world)); }
`)), 'void pixblt_8_op0() { log("hello world"); }');

// Conditionals, `defined`, #else and #elif, nested inside a dead branch.
assert.equal(squash(preprocessor({ WIDTH: '8' }).run('b.cpp', `
#if defined(WIDTH) && (WIDTH < 16)
narrow
#elif WIDTH == 16
wide
#else
other
#endif
#ifndef WIDTH
#if 1
dead
#endif
#endif
`)), 'narrow');

// A macro does not expand inside its own expansion.
assert.equal(squash(preprocessor().run('c.cpp', `
#define f(x) x + f(x)
f(1);
`)), '1 + f(1);');

// A file that includes itself under changing macros -- 34010gfx.hxx's idiom --
// emits one function per pass, and an include the caller cannot resolve (a
// framework header) disappears.
files['gfx.hxx'] = `
#ifndef RECURSIVE_INCLUDE
#include "emu.h"
#define RECURSIVE_INCLUDE
#define BITS 1
#define FUNCTION_NAME(base) base##_1
#include "gfx.hxx"
#undef FUNCTION_NAME
#undef BITS
#define BITS 16
#define FUNCTION_NAME(base) base##_16
#include "gfx.hxx"
#undef BITS
#else
int FUNCTION_NAME(fill)() {
#if (BITS < 16)
  return BITS;
#else
  return -1;
#endif
}
#endif
`;
assert.equal(
  squash(preprocessor().run('gfx.hxx', files['gfx.hxx'])),
  'int fill_1() { return 1; } int fill_16() { return -1; }',
);

// Comments go, strings survive, line continuations join a define.
assert.equal(squash(preprocessor().run('d.cpp', `
#define TWO \\
  2 // two
int x = TWO; /* note */ const char *s = "a // b";
`)), 'int x = 2; const char *s = "a // b";');

console.log('c-preprocessor.spec: pasting, conditionals, recursion guard and recursive include passed');
