// The source normalizer, statement by statement: what it rewrites and what it
// must leave alone. Each case is a line of MAME that once lowered wrong.

import assert from 'node:assert/strict';
import { normalizeMameExecutionSource } from './execution-source.ts';
import { compileMameHandler } from './handler-ir.ts';
import { executeGeneratedHandler } from '../ir/execute.ts';

const lowered = (source: string) => compileMameHandler(normalizeMameExecutionSource(source));

// A pointer declaration keeps its `*` behind `auto`...
assert.match(normalizeMameExecutionSource('const uint8_t *char_pal = base + 4;'), /auto \*char_pal =/);
// ...and a comparison of a dereference is no declaration: cartheader.h's
// `return *begin == checksum;` read as `auto *begin = = checksum;`, and the
// Game Boy's header check was lost to a diagnostic (#294).
{
  const source = 'u8 checksum(3U);\n\treturn *begin == checksum;';
  assert.doesNotMatch(normalizeMameExecutionSource(source), /auto \*begin/);
  const program = lowered(source);
  assert.deepEqual(program.diagnostics, []);
  assert.equal(executeGeneratedHandler(program, {}, { begin: new Uint8Array([3, 9]) }), 1);
  assert.equal(executeGeneratedHandler(program, {}, { begin: new Uint8Array([4, 9]) }), 0);
}

// `std::advance(it, n)` moves the iterator, which here is a pointer.
{
  const program = lowered('std::advance(begin, OFFSET - 0x100);\n\treturn *begin;');
  assert.deepEqual(program.diagnostics, []);
  assert.equal(executeGeneratedHandler(program, { constants: { OFFSET: 0x102 } }, { begin: new Uint8Array([7, 8, 9]) }), 9);
}

// A nothrow array `new` owned by a unique_ptr is the array make_unique makes:
// the Game Boy slot's `footer` buffer for a GBX file.
{
  const text = normalizeMameExecutionSource('std::unique_ptr<u8 []> const footer(new (std::nothrow) u8 [trailer.size]);');
  assert.match(text, /auto footer = ALLOC\(trailer\.size\);/);
  assert.deepEqual(lowered('std::unique_ptr<u8 []> const footer(new (std::nothrow) u8 [n]);\n\tfooter[1] = 5;\n\treturn footer[1];').diagnostics, []);
}

// C++14 digit separators are spelling: `0x10'0000` is 0x100000, and a
// character literal is left alone.
{
  const program = lowered("return u32(0x10'0000) | (1'000 + 'A');");
  assert.deepEqual(program.diagnostics, []);
  assert.equal(executeGeneratedHandler(program, {}, {}), 0x100000 | (1000 + 65));
}

console.log('execution-source.spec: pointer declarations, std::advance and nothrow arrays passed');
