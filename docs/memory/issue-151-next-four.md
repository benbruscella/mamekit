---
name: issue-151-next-four
description: "#151 (btime, bnj, missile, bzone): what each needed, the MAME verification state, and the open residuals (bzone discrete, POKEY RANDOM)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 399293f5-cffd-4923-9d6f-cf446a357d3b
  modified: 2026-09-21T08:32:48.198Z
---

Branch `151-arcade-next-4`, 2026-09-21.

**btime / bnj** (DECO CPU-7 / C10707): generic `compileMameM6502MemoryInterface`
lowers a 6502 subclass's `mi_*` overrides from its own source. Pixel-exact vs
MAME 0.289 through frame 3000 (bnj attract demo included). Traps hit: cpu-codegen
answered `bitswap_8` with 0 (every post-write opcode = BRK), then an inline
bitswap expansion repeated the OPCODE *bus read* 8x (bnj ran at 1/3 speed) --
emit it as a helper. bnj's derived `set_visarea` over an inherited raw screen
was ignored (240 vs 256 wide). bnj coin = active-low PORT_CHANGED NMI: the board
passed "pressed" as newval, MAME passes the raw field bits.

**missile**: ADDRESS_MAP_BANK (execution.bankDevices), 6502 SYNC via fetch lowered
from MAME prefetch_start/end (also adds MAME's opcode read before an IRQ -- all
6502 boards), driver emu_timers armed in machine_start (build.ts armedTimers ->
generic timers, `driver: true` => per-line schedule), set_unscaled_clock with
per-CPU time epochs, palette_device with only set_pen_color. Frame 60 exact;
attract diverges ~120 because POKEY RANDOM steps per read (src/hardware/pokey/
runtime.ts is a handwritten front end), not per clock.

**bzone**: AVG_BZONE + MATHBOX as generated devices; VECTOR is a host display
list (vector plan `type: 'device'`). Needed: device codegen `>>` = interpreter's
signed-aware shift, integer member arrays as typed arrays (mathbox int16),
struct arrays + multi-field lines, device region subtag (`avg:prom`), config
calls carrying finder tags, lazy address-space bus, static helpers of another
class (`vector_device::color111`), switch-case gotos. Mathbox oracle: Lua taps on
0x1860-0x187f/0x1810/0x1818 replayed into the device -- 0 mismatches. Open: the
DISCRETE engine/shell/explosion network is not lowered (POKEY only).

**Blast radius (sweep 2026-09-21, 72/80 pass):** the MAME prefetch fetch (7-cycle
IRQ + new m_sync member) moves state/audio hashes, never video, on asteroid,
centiped, gauntlet, matmania, qbert, venture; marble moves one frame of attract
phase (still 0 px vs MAME at an offset; RAM oracle main 4->9 bytes, audio
closer). defender's boot screen now matches MAME (was 87% off). The harness never
set `input.frameFraction` (the shell does), so arkanoid's browser e2e already
disagreed with its golden; fixed in the harness. Also found: board `stateKeys`
lacked `pendingTimers`, so a save-state load kept later timers. Those 9 goldens +
semantic baseline were left for the user to approve re-recording.

**Oracle recipes** that worked: MAME `-debug -debugger none` + Lua
`manager.machine.debugger:command("trace file,:maincpu,noloop")` at script top
level (not in a reset notifier) for PC-trace diffs; drop wait-loop PCs when
aligning to ignore interrupt phase. Related: [[mame-reference-capture]],
[[codegen-silent-zero]], [[emitter-interpreter-parity]].
