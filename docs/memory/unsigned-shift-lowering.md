---
name: unsigned-shift-lowering
description: "cpu-codegen emitted C++ `>>` as JS signed `>>`; m68k SWAP sign-extended bit-31 values and broke ghouls in-game (issue #75). Fixed 2026-08-24."
metadata: 
  node_type: memory
  type: project
  originSessionId: 9fc833fb-829a-48ce-9f65-1997827317f8
  modified: 2026-08-24T09:12:10.001Z
---

MAME CPU cores keep values in `uint32_t`, so C++ `>>` is a logical shift; JS `>>`
sign-extends anything with bit 31 set. `src/mame/cpu-codegen.ts` emitted `>>`
verbatim (device-codegen already mapped it to `>>>`), so the generated m68000's
`SWAP` turned 0xC0000800 into 0xFFFFC000 — ghouls' level renderer then drew its
"blank" chain tile over the whole screen at the cutscene→level transition
(issue #75). Fixed 2026-08-24: `>>` → `>>>` and `>>=` → `>>>` in both codegens.
Blanket `>>>` is safe because MAME cores do arithmetic shifts via explicit
sign-fill tables (`m68ki_shift_*_table`); the only genuine signed shifts
(`bfexts` etc.) are 68020-only and absent from our generated 68000.

**Why:** only 32-bit-register cores could ever hold bit-31 values, so the bug's
blast radius was exactly the m68000 targets: ghouls, sf2ce, rampage.

**How to apply:** when a generated core misbehaves on one specific code path
while the rest of the game runs, suspect a single instruction: get MAME
register-level ground truth with `-debug -debugger none` plus Lua
`manager.machine.debugger:command("bpset <pc>,1,{tracelog ...;g}")`, and mirror
it in our runtime by patching `bus.read16be` from an `inspectFrame` hook (log
`cpu.m_dar` when the fetched address equals `m_pc`). Diffing those checkpoint
streams pinpoints the divergent instruction in minutes. Beware: MAME `trace`
output collapses loops ("(loops for N instructions)") even without `noloop`.
Also: single-target `node bin/mamekit.js <game>` does NOT re-emit
`dist/runtime/generated/devices/*` — codegen changes need `npm run gen:all`
(see [[dist-rebuild-pitfalls]]).
