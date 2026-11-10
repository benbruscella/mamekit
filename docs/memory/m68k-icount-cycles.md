---
name: m68k-icount-cycles
description: "The generated M68000 discarded every `m_icount -= ...` in an opcode body and lowered m_cyc_* to 0; fixing both made Neo Geo boot frame-exact vs MAME (issue #91)"
metadata: 
  node_type: memory
  type: project
  originSessionId: a06aeec6-3d2e-4d44-9e7b-6c762b7a4541
  modified: 2026-08-27T00:36:48.557Z
---

**Fixed 2026-08-27 (issue #91, mslug).** Two stacked faults in the generated
M68000 core, both general to every 68000 board:

1. `normalizeM68000Source` never translated `m_icount -= X;`. The emitted core
   returns a per-step cycle count in `cycles` and sets `m_icount = 1` per step
   and never reads it, so **every** variable charge in an opcode body was
   thrown away: MOVEM per register, untaken Bcc, both DBcc outcomes, Scc true,
   `m_cyc_reset`. Every other lowered CPU already had
   `.replace(/\bm_icount\s*-=\s*([^;]+);/g, 'cycles += $1;')`; the m68k chain
   was simply missing it.
2. The `m_cyc_*` variant constants live in `init_cpu_m68000()` in
   `src/devices/cpu/m68000/m68kcpu.cpp`, not in the opcode cycle table the
   decode rows carry, so they were unresolved identifiers -- and
   `emitIdentifier` in cpu-codegen.ts silently returned `'0'` for those. Now
   parsed from that initializer, and an unresolved identifier **throws**
   (a full 54-target `gen:all` emits zero of them, verified by an env-gated
   trace before making it fatal).

**Evidence:** MVS BIOS RAM test finishes on frame 277 in both MAMEKIT and real
MAME 0.289 (was 280); sf2's no-input attract offset went from our frame N =
MAME N-4 to N-1; ghouls is 0 differing pixels at frames 200-1400.

**How to apply:** when a board's timing is off but per-instruction base cycles
check out against the 68000 datasheet, look for cycle charges the opcode body
makes *itself*. Profile recipe: monkeypatch `Object.getPrototypeOf(cpu).step`
from an acceptance `inspectFrame` hook and histogram `m_ir` with the returned
cycle count -- `avg` per opcode is directly comparable to the 68000 tables.
See [[mame-reference-capture]] and [[cold-nvram-boot-divergence]].
