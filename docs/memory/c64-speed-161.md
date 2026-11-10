---
name: c64-speed-161
description: "#161 speed pass 2026-10-19: tape 13.7->7.0 ms/frame (2.9x), Nebulus disk 30.6->19.4 ms (real time); the board handler runtime was a V8 dictionary; bytecode size vs inlining; bench recipe"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-18T14:02:49.346Z
---

2026-10-19, branch 161-fix-commodore-64-part-2 (uncommitted at time of writing). C64 tape
load 13.67 -> ~7.0 ms/frame headless (73 -> ~143 fps, 2.87x real time; 3x target is 6.65);
full Nebulus disk load 30.6 -> 19.4 ms/frame avg (51.5 fps = real time). RAM/frame hashes
identical to base for both; acceptance sweep run against `.cache/out161`.

Biggest wins, all generic:
- **The board handler runtime (`preparedHandlerRuntime`, src/ir/execute.ts) was in V8
  dictionary mode** because its object literal had `get members()`/`get palette()`
  accessors. Every `runtime.members`/`links`/`overrides`/`readIndex` in every emitted board
  handler was a hash probe. Fix: data props, pre-declared `links`/`linksGeneration`, the one
  getter added by `Object.defineProperty` afterwards. Bus read 71 -> 44 ns alone.
- `readIndex` typed-array fast path (`ArrayBuffer.isView` first): 91 -> 69 ns per read.
- CPU finder Proxy -> plain object with non-enumerable stable services (total_cycles etc.) over
  the Proxy; VIC 262 -> 177 ns/cycle with the next two.
- `uint8_t m_x[0x400 / 8]`: `Number(bound)` was NaN -> no arrayLength (now `evalExpr`). Also
  changed CPS1 `m_empty_tile[32*32]` stateMembers (goldens unchanged).
- Bytecode size vs V8's 460-byte inlining limit: board member-call ladders -> `runtime.memberCall`
  cold path; device `?? runtime.member(x)` -> `?? 0` (device member() is `() => 0`); const-member
  folding in `literalValue`. Check with `node --print-bytecode --print-bytecode-filter=<fn>`.
- Disk: 1541 `via0_pb_r/w`, `set_iec_data` compile via `cardMembers` (bases from included headers,
  `device_cbm_iec_interface` m_bus/m_slot); positional signal dispatch; device map handlers
  resolved once (`arity()` re-parsed params per access!); referents cached per links generation
  and built with Object.fromEntries.

Not wins (measured): collapsing closure layers while the runtime was still a dictionary;
hosted carry Map->array alone ~1% (done anyway with `stateSyncs` capture/restored hooks so the
save shape stays a Map); runCycles try/finally; SYNC `boundSignals`.

Bench recipe: scratchpad `bench/` (c64-tape-bench.ts, c64-disk-bench.ts with FRAMES/UNTIL_STOP,
micro-read.ts = ns per bus read, micro-vic.ts TAG=u19|u1 = ns per device cycle, prof.ts region
profiler PROFILE=dir, lines.mjs line ticks, best.sh). Nebulus.d64 now lives in
`.data/roms/_quarantine/computers/c64/c64_flop_misc/`. Build isolated with
`node bin/mamekit.js dev-game c64p` (34 s) and `BUILD=.cache/dev/c64p`.
**Never edit src/ while a full gen or sweep runs** — workers load modules late and the harness
imports src/runtime/shell.ts's whole tree; I had to restart the gen twice.

Browser (headless Chrome): tape warp 68 -> 136 fps after the fast-forward message pump (see
[[c64-autoboot-161]]). Full verification done: gen:all, test:unit 234, audit:generated/facts/semantics
(7 boards re-recorded: c64, c64p cardMembers; ffight/ghouls/sf2/sf2ce/tmnt stateMembers arrayLength),
acceptance sweep 89/89 (9 retried: native-crash flakes + hyperspt pcmHash flake).

Remaining tape budget (~7 ms): VIC ~38%, CPU ~20%, CIAs ~17%, per-instruction ticking ~9%, SID ~6%.
See [[disk-path-performance]], [[dictionary-mode-call-tables]], [[interpreter-share-is-the-budget]].
