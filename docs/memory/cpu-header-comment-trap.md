---
name: cpu-header-comment-trap
description: "Scan C++ comments, never pattern-match them: a block comment with a comma shifted 128 i86 cycle constants, and a regex stripper eats m6809.h whole"
metadata: 
  node_type: memory
  type: project
  originSessionId: 267f507f-5979-48ba-bf29-dc13cd60c3bc
  modified: 2026-08-31T04:55:23.995Z
---

`extractEnumConstants` in `src/mame/cpu-compiler.ts` used to split an enum body
on commas after removing only `//` comments. `i86.h` annotates its
`BASE_CYCLES` enum with **block** comments that contain commas
(`AAA, AAS, AAM, AAD, /* ARITHMETIC ADJUSTS */`), so one annotated enumerator
parsed as two entries and every value after it shifted. 128 constants were
wrong: `NOP` 14 instead of 21, `POP_SEG` 58 instead of 84, `ALU_RR8` 60 instead
of 86. Each one indexes `m_i8086_timing`, so every `CLK`/`CLKM` charged a
plausible-but-wrong cycle count on I8088 and V30, with no diagnostic — the same
shape as [[m68k-icount-cycles]].

**Do not fix it with `/\/\*[\s\S]*?\*\//g`.** MAME's section banners are lines
of `//****************`, whose characters 1-2 are `/*`. A regex stripper opens
a comment there and runs to the next stray `*/`, which in `m6809.h` never
comes — all six of its enums vanish and the core loses 41 constants. Use
`stripCppComments` from `src/mame/initializer.ts`, which scans line comments,
block comments and string literals in one pass; its own doc comment records the
same trap from the atarimo work.

Blast radius check for any change to constant extraction: extract with and
without the change for every CPU header in use and diff the maps. The 2026-08-31
fix was byte-identical for Z80, MCS48, I8080/I8085A, KONAMI, MC6809/HD6309 and
M68000, and only moved i86.h (128 corrected, 59 newly found) and z8000.h (15
newly found).

Related, same session: `state_import`/`state_export`/`state_string_export` are
`device_state_interface` presentation, not execution — Z8002's reads
`STATE_GENFLAGS`, a `distate.h` enumerator no CPU definition declares, and
codegen rightly throws. `sreg_to_space` in i86.cpp is address-space plumbing
that returns `m_program`; every caller is already lowered as a direct bus
access. Both belong in their compiler's skip list beside `device_start` and
`create_disassembler`.
