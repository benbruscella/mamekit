---
name: disk-path-performance
description: "#157 C64+1541 disk loading speed: what the profile showed (45.5 -> ~32 ms/frame), which generic codegen gaps were behind it, and what is still open"
metadata:
  node_type: memory
  type: project
  originSessionId: e6f3a7ee-598d-4a8d-8a44-383a3825536b
  modified: 2026-10-17T11:31:13.577Z
---

2026-10-17. Disk loading ran at 22 fps headless (user saw 25-35 fps in browser, 50 = real time). Nebulus full-load average went 32.3 -> 23.8 ms/frame (42 fps, ~84%); worst stretch 45.5 -> ~32 ms. Load result identical (motor stops frame 4252, status $40).

Generic fixes, in order of payoff:
- **Struct assignment copier** (device-codegen `structCopier`): `checkpoint_live = cur_live` between same-type members emits per-field named stores. The generic `copyGeneratedStruct` keyed-store loop was 4% self but its removal saved ~7 ms (it deoptimised the code around it). Caching field lists in the runtime copy did nothing.
- **Line entry points as codegen roots** (`isLineEntryPoint`: `int state` write-lines, zero-arg `*_r` read-lines) + **allocation classes** compiled (`definition.allocations`, e.g. cbm_iec `daisy_entry.next`). Interpreted device calls went 10k/frame -> 4, but only ~3 ms: the interpreter share is not always the budget.
- **`std::vector` iterator accessors** emitted as `runtime.container(buf, 'begin')`: the IR spells the local type `std::vector&` (no template args), so match `\bstd::vector\b`. `runtime.dereference(array)` returns element 0 — the old chain probed a number for `.begin` three times per call.
- Board signal dispatch prefers the emitted board.js handler over `compileGeneratedMachineHandler` for `*_r`; callDevice caches method-name sets (methodNames() allocates).

**Blast radius found by the full sweep** (line-entry roots compiled methods that had only ever been interpreted): (1) emitted *finder* calls went straight to the object (`members.m_cpu?.set_input_line?.()`), skipping the board binding the interpreter uses — Namco 51xx/53xx hosted MCUs never saw chip_select/vblank: digdug silent, galaga/polepos discrete dead, xevious. Fix: finder calls try `__l["m_cpu.set_input_line"]` first. (2) `x.bytes()` emitted as `.length` (elements): rtype's 16-bit buffered spriteram copied half its table — state-identical, video-changed. Fix: `runtime.container(x, "bytes")`. Bisect recipe: temporary env switches in device-codegen + `MAMEKIT_NO_CACHE=1 dev-game <game>` (the gen cache is keyed on src hash, not env).

Measuring: load average ~5.6 on this machine; take best-of-3 600-frame runs (scratchpad bench `c64-disk-bench.ts`; C64 `*` is `BracketRight`, Shift+8 types `(`). Counters: wrap `IrDevice.prototype.executeMethod` for interpreted calls; `globalThis.__mamekitHandlerCounts` for signal handlers.

Still open (by size): C64 PLA memory path (~13%, MAME-faithful, cost is call layers); 1541 handlers `via0_pb_w/via0_pb_r/atn_w` stay interpreted because board codegen does not know `m_bus` (set at runtime by cbm_iec add_device via `entry->m_interface->m_bus = this`) ~5%; `tickHostedProcessors` Map get/set per delivery ~2.5% (Map is a save-state root — changing shape breaks saves); scheduler/dispatch layers ~10%. The 64H156 itself (319k get_next_bit/frame, 6241 syncpoints/frame) is MAME's design.

**How to apply:** for any slow generated machine, count interpreted calls and per-call layers first, then profile by caller (scratchpad callers.mjs / under.mjs). See [[interpreter-share-is-the-budget]], [[dictionary-mode-call-tables]], [[mid-instruction-timer-order]].
