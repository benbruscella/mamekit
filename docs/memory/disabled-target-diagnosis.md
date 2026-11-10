---
name: disabled-target-diagnosis
description: "How to diagnose a src/games/disabled/ target without disturbing the dev server's dist, and the stale runtime-certification fail-open that hides a hung board"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-12T04:58:07.482Z
---

Diagnosing a parked target (issue #142's batch) needs a generated build, but
`npm run clean` / `gen:all` would wipe the `dist` the user's dev server is
serving. Do it isolated instead:

1. Copy the pair from `src/games/disabled/` to `src/games/candidates/` **and
   remove the originals** — `discoverGames` throws
   `registered in more than one lifecycle` if both exist.
2. `node bin/mamekit.js dev-game <target>` builds the whole thing (target +
   hardware closure + app) into `.cache/dev/<target>`, never `dist`.
   `bin/mamekit.js <target> --skip-app` alone is NOT enough: without the
   closure its runtime report lists every device as a gap, Z80 and SCREEN
   included ([[single-target-gen-scope]]).
3. `.cache/dev/<target>/games/arcade/<target>/CAPABILITY_GAP.md` is the honest
   gap list; `runtime-report.md` next to it is refreshed against the closure.
4. Run the real board with `MAMEKIT_OUT_ROOT=.cache/dev/<target>`. The
   acceptance harness reads that env var. A parked contract often fails the
   harness before a frame runs (a pre-#121 `soundKind: 'none'` is rejected
   outright), so drive the board directly: `assembleRegions` + `checkRomSet`
   from `src/runtime/shell.ts`, `registry.registerGeneratedMachines()` from
   `<out>/app/registry.js`, then `createBoard` from
   `<out>/runtime/core/generated-board.js`. The board method is **`frame(fb)`**
   — `board.advance?.(fb)` silently does nothing and fakes a dead machine.
5. Restore the files afterwards and delete anything the run wrote into `dist`.

**The trap: `src/gen/runtime-certification.ts` fails OPEN.** Its per-game entry
whitelists a fixed gap list, so a board parked as "doesn't boot" can still
report `Playability: executable` / `Basis: runtime-certified`. wardner's entry
was recorded in #52 and never revisited when #55 disabled it — re-enabling it
would have shipped a hung board as playable. Delete a disabled target's
certification entry and re-derive it only from a real-ROM pass.

**Why:** the recorded reason in a disabled module header is usually one line
("Doesn't boot") and the certification file actively contradicts it, so the
only trustworthy evidence is an isolated build plus a real boot.

**How to apply:** build isolated, read `CAPABILITY_GAP.md`, then find where the
main CPU is spinning at a frame boundary and disassemble the ROM there — that
names the missing device far faster than the gap list does. See
[[known-broken-targets]] and [[wardner-dsp-handshake]].
