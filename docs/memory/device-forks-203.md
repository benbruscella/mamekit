---
name: device-forks-203
description: "#203: 11 SPECIALIZED device forks deleted; most were stale, not gaps — probe a fork-less compile first; template instances from machine config/refs; device_start before devcb wiring; preprocess retry; constructor-chain structs"
metadata:
  node_type: memory
  type: project
  originSessionId: c8914e24-8796-4263-8a8c-3bab926ee55f
  modified: 2026-10-27T22:39:30.491Z
---

#203 (2026-10-28, branch `203-delete-dead-system-16b-code`). `SPECIALIZED_COMPILERS` went from 17 to 6.

**Method that worked:** compile the type plainly, with the fork removed, and read each lowered method (scratch probe calling `compileMameDevice`). Five forks (LATCH8, MOS6532 timer_w, K052109, LADYBUG_VIDEO, and the template half of the merger) had 0 diagnostics without the fork. A fork outlives the gap it covered. **But 0 diagnostics is not the end:** the LATCH8 and Lady Bug contracts failed until the start-order fix.

**General gaps found:**
- **Template instances.** Instances named only outside the device's sources: mconfig (`m_pit->set_clk<0>`), finder calls (`m_x->in_w<0>`), qualified FUNC refs. `HardwareUse.references` and `configuration` feed `compileMameDevice`. Without an instance, `N` became `auto` silently.
- **XTAL overloads.** An XTAL overload forwarding to the arithmetic one would select itself again: same arity, and the last overload wins. So XTAL overloads are sorted first.
- **Start before wiring.** `device_start` ran inside `createDevice`, before the board wired devcbs (`generated-board.ts` wireGeneratedDevice) and bound tilemaps. `isunset()` was true for all, so LATCH8 never forwarded a write. Now `startReadsHostBindings`: 4 devices (latch8, k051960, k052109, ladybug_video).
- **Constructor body brace.** The parser took the first `{` after the params as the body, which can be a brace-list argument or `m_x{...}`, and hid later initializers. Fixed with `constructorBodyBrace`.
- **Preprocess retry.** Only when as-written has diagnostics *and* a hierarchy file includes a non-header. Five devices that compile fine (z80, nes_slot, ...) include `.hxx` too, so that alone is not a trigger.
- **Core enums.** File-scope only (`device.h`'s class-scoped `ROM`/`SOUND` leaked first), named in code only (comments matched), and `DEFAULT_CONSTANTS` wins (diexec `INPUT_LINE_NMI` = 64 vs our -1).
- **Chain spaces.** Giving the MB88xx and NES PPU their mapped spaces changed nothing measurable (contracts and oracle same).

**Evidence trail:** the dkong/dkongjr goldens moved by one audio write with identical PCM, and oracle was "same", so they were re-recorded. mslug WORSE is MAME-side drift ([[oracle-mame-side-drift]]).

**Left open, not fixed:** venture's PIT8253 counters are never composed (`PIT_COUNTER(config, "counter0")` string-tag child plus `device_resolve_objects`); that belongs to item 26. The user committed mid-session ("forks gone"), so check `git log` before stashing.

Related: [[codegen-silent-zero]], [[silent-mislowering]], [[device-start-scope]].
