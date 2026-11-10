---
name: c64-1541-disk-bringup
description: "#157 — what stood between a composed 1541 and LOAD\"$\",8: eleven general runtime/codegen gaps, each silent; recipes for tracing a GCR drive"
metadata:
  node_type: memory
  type: project
  originSessionId: e6f3a7ee-598d-4a8d-8a44-383a3825536b
  modified: 2026-10-16T08:46:57.453Z
---

2026-10-16, issue #157 branch: the C64's iec8 slot composes MAME's c1541 (6502 + 2 VIAs + 64H156 + ALPS drive + d64/g64 formats, all from source). LOAD"$",8 / LIST on Nebulus.d64 first worked after these, every one a general gap, none C64-specific:

1. `machine_phase::RUNNING` resolved by its leaf to the 64H156's own `RUNNING` (=1): via1_pb_w's `if (machine().phase() != RUNNING) return;` dropped every motor/stepper write. Qualified names now resolve qualified-first (execute.ts, device-codegen, kg/build.ts sourceConstants) and `machine().phase` is a host service (INIT while building, RESET in reset(), RUNNING after).
2. Reset-time VIA write ($FF) stepped the head a half-track — fixed by (1)'s RESET phase, not by special-casing.
3. `60/m_rpm` integer-divided (float member, two integral runtime values) → m_rev_time 0 → index_resync looped forever. Float/double members and parameters are now marked `floating` (device-compiler markFloatingNames).
4. `(a - b).as_ticks(n)` on a number answered the silent `?.() ?? 0`; attotime accessors on numbers now go through `runtime.attotime`.
5. `buf.begin() == it` emitted `Number(array) === Number(it)`: stringified a 26k-cell track per flux reversal (78% of runtime) and was always NaN. Iterator calls compare via runtime.same; an array equals a pointer at offset 0.
6. `uint8_t yb_r()` returned a 10-bit shift register: device methods now carry `returnWidth` and narrow returns (emitted + interpreted).
7. Lockstep `run(1)` clamps the closing timing() to the 1-cycle target → device clock advanced 1 cycle/instruction. Overrun now delivered (lockstep only, to bound blast radius).
8. Composed-card devices (VIAs, gate array) now tick on the card CPU's executed cycles, not the C64's (cardClockDevices in generated-board).
9. Timer callbacks recomputed machine().time() from cycles − backlog and came out attoseconds early → 64H156 rolled back every syncpoint and lost BYTE READY (byte_w only ever saw 1). IrTimer now records its exact expiry and machineSeconds() returns it during the callback; an absorbed tiny delay bumps one ulp (index_resync re-armed "a hair later" forever otherwise).
10. Hosted tags: `uc4:0:525ssqd` inside a card config is relative (hostedDeviceTag), so the drive is `iec8:c1541:uc4:0:525ssqd`.
11. Emitted `std::vector::resize` and pointer locals (`auto *csect = sect + n; csect->size`) — runtime.resize, deref on member read.

Blast radius found by the full real-ROM sweep (2026-10-16), each a general fix:
- struct field regex backtracked `unsigned short energytable[...]` into field `e` (VLM5030 crashed hyperspt) — require a space or `*` between type and name;
- timer scan read only the final override's body and required `memberOwners` → AVG lost both timers (bzone stuck). Scan every body; accept `m_` names;
- static-local hoist typed a static *table* as its element scalar (Williams blitter remap → joust/robotron/sinistar) and re-initialised scalars that returned to 0; also must rename uses to the member, not copy;
- `this->m()` → `m()` rewrite bypassed host-bound resources (GB cart ROM); arity aliases renamed constructor calls and broke a helper filter that kept names exactly;
- "hosted device never takes a root alias" broke wardner (TOAPLAN_DSP + its TMS320C10 both `m_dsp`): only for devices inside a composed card;
- `machine().rand()` in the interpreter evaluated the host `machine()` object (no rand) → 0; emitted used the chain key. Interpreter now names `x()` chains `x().m` like emitted code. hyperspt's golden had silent-zero noise.
- Expected moves: permanent lockstep honours set_perfect_quantum (qix, carnival), lockstep overrun (elevator), exact expiry (gameboy:tetris), `^maincpu`→`maincpu` (a2600 state hash only).
Recipe: build into `--out .cache/out157` (must be inside the repo for tsc types; never outside), run `MAMEKIT_OUT_ROOT=.cache/out157 node src/games/acceptance.ts <game>`; A/B by patching that build's compiled runtime/core JS or swapping single device modules from a base-worktree dist. Leaves the user's dist alone while they test.

**Why:** each looked like "the drive doesn't work"; the floppy and gate array were verified correct in isolation long before the board was.
**How to apply:** trace a GCR drive bottom-up — image cells (sync runs per track) → get_next_transition chain over one revolution → instrumented bits in the emitted live_run (3+ zero runs = lost edges) → DOS job queue at 1541 RAM $00-$05 (1 ok, 3 no sync, 9 header checksum) → byte_w args. Blast radius of 1/3/6/7/9 is repo-wide; see [[frugal-blast-radius]] and [[semantic-baseline-attribution]].
