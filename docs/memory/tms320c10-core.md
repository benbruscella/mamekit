---
name: tms320c10-core
description: "#143: the TMS320C10 core generated from MAME's templated TMS320C1x; wardner now boots, halts the host and completes the DSP handshake. Nine general compiler/runtime gaps it exposed."
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-12T05:59:42.970Z
---

2026-09-12, issue #143 (sub-issue of #142). wardner went from a hung Z80 to
booting, running its power-on self-test and drawing. The DSP handshake
completes end to end: host halts at 0x6ca4, DSP takes its interrupt, walks
host RAM through its two io ports, writes 0 to 0x7002 and releases the host.

**The core.** `compileMameTms320c10` in cpu-compiler.ts, from
`src/devices/cpu/tms320c1x/tms320c1x.cpp` (287 opcodes, 77 methods, 0
diagnostics). Three things make it unlike every other core here:
- it is a **class template** (`tms320c1x_device_base<12>` is the C10);
- it is **word addressed** (MAME addrshift -1 on program, data and io alike);
- **cycles come from the opcode table**, not the handlers, and the 0x7F row is
  a second table indexed by the minor byte.

Decisions worth keeping: the generated core normalizes word->byte at each
access site (`*2`) and its map ranges are scaled to match
(`generatedCpuAddressUnitBytes`), so the IR space shift stays 0 — one rule in
one place. MAMEKIT's `addressShift` sign convention is the **inverse** of
MAME's (`byteAddress` divides on negative; MAME's tms34010 declares +3 and
MAMEKIT says -3). The data space is internal RAM only, so it lowers to a
member array from MAME's own `tms320c10_ram` map, not a bus.

**Nine general gaps this exposed, all fixed and none wardner-specific:**
1. `monomorphizeClassTemplate` (function-template.ts) — non-type class
   templates, the sibling of the existing function-template version.
2. MAME's 32-bit `PAIR` union had no codegen support; only `PAIR16` did. Added
   `Pair32`/`pair32`, including the save-state key (only `.d` is captured —
   the word and byte views alias the same cell).
3. `extractConstexprConstants` missed `static inline constexpr`, the modern
   MAME spelling.
4. **`expandFunctionMacros` only matched ALL-CAPS macro names.** MAME spells
   the TMS port accessors `TMS320C1X_In` / `_Out`, so `P_IN(...)` expanded one
   level and stopped, and every port read lowered to 0. It now matches the
   names actually collected. See [[codegen-silent-zero]].
5. A non-greedy regex cannot rewrite a call with nested parens
   (`m_data.read_word(((m_memaccess)))`) — `rewriteMameCall` scans for the
   matching paren instead.
6. `in16be`/`out16be` on CpuBus: a natively 16-bit port shown two byte halves
   loses the first, the io-space twin of the existing read16be.
7. **A devcb member need not be named after its accessor.** The runtime
   guessed `m_<signal>`; `toaplan_dsp_device` declares
   `auto halt_callback() { return m_halt_cb.bind(); }`, so `m_halt_cb(...)`
   resolved to nothing and the host CPU was never halted. The KG now records
   the real member from the class declaration (both the `.bind()` and the
   `device_delegate` `.set()` spellings).
8. **device_delegate binding only existed for devices with their own module.**
   A device whose methods are board handlers (TOAPLAN_DSP) had none, and its
   **reference out-parameters** were the whole game: `dsp_host_addr_cb(u16,
   u32 &seg, u32 &addr)` is how the DSP addresses host RAM, and without the
   callee's parameter list travelling with the binding the caller passed
   values and every write was dropped (seg stayed 0, so every access hit the
   `default:` case). Registered in execute.ts beside the other
   `callParameters`; the compiled ABI dereferences arguments, so a callee with
   a reference parameter now stays on the interpreted path.
9. **The address-map handler registry used root bindings** while the callback
   path applied a per-ownerClass devcb overlay. So the same method could raise
   a line when a callback called it and not when an I/O write did:
   `dsp_int_w` halted the host, `dsp_bio_w` could not release it.
   `generatedHandlerRegistry` now takes a per-handler bindings hook.

**Open.** The board reaches its own self-test and prints **"LRAM ERROR"**,
then loops toggling the rom/ram view (`out 0x70=2/0`). Real MAME 0.289 at the
same point shows a tile pattern, so this is ours, not authentic. The main
program map matches MAME's line for line (view entries included), so look at
the layer RAM path: `wardner_videoram_r/w` (io 0x60-0x65) fold a byte access
into `twincobr_txram_w`/`bgram_w`/`fgram_w`, which are `COMBINE_DATA` with
`mem_mask = 0xff << shift` — the 16-bit-through-8-bit-lane shape of
[[sixteen-bit-bank-window]]. `m_fgvideoram16` is still all zeros after boot
while tx and bg hold data. `ymsnd:YM3812` remains the one capability gap;
`compileYm3526` already lowers OPL1, and YM3812 is `opl_registers_base<2>`.

**Why:** the issue said one small CPU core; it was that plus eight framework
gaps, which is the usual shape ([[mame-framework-runtime-gaps]],
[[gameboy-blank-screen]]).
**How to apply:** diagnose with [[disabled-target-diagnosis]]; the winning
move each time was to find where a value went to zero and walk back to the
binding that was never made, never to assume the lowering was wrong.
