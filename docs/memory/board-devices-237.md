---
name: board-devices-237
description: "#237 (items 4-9, 12-15 of #178, one PR): baseline 5a11f2aa (=4ac71e89 src) over 53 targets, user decisions, fork-probe results"
metadata:
  node_type: memory
  type: project
  originSessionId: 6fdbae1c-bfbb-498a-95e4-3db5d8b44a3c
  modified: 2026-11-04T21:58:39.238Z
---

#237 started 2026-11-05 on branch `237-49-1215-compile-every-remaining-board-device-from-mame-in-one-pr`.

**User decisions (2026-11-05):**
- Baseline from `4ac71e89`, the branch base after #236, not the issue's `adc376b9`. Recorded as `.oracle/baseline/5a11f2aa`; that commit is the user's docs-only commit, so `src` = 4ac71e89.
- Target set: the 53 affected targets. That's the named machines, every GENERIC_LATCH_8 board (42), and the Sega crypt sets (congo pengo shinobi upndown wboy zaxxon). The list is in the issue body.
- Guard: a shrink-only list in architecture.spec.ts of the hostModel keys and saved board fields that model hardware.
- The issue body was updated with all of the above, at the user's request.

**Fork probe (plain compileMameDevice, fork removed):**
- NEOGEO_SPRITE_OPTIMZIED: 34/34, 0 diagnostics. The fork is semantic: it reads the raw ROM instead of the optimize_sprite_data cache, and skips device_reset's optimize call.
- SEGAIC16VID: 7 diagnostics. Six are `tile_data &info` in the tile_info callbacks; one is a parse failure in rotate_init.
- SLAPSTIC: 1 diagnostic, device_start (polymorphic state objects + tap lambdas).
- K053246: definition is K053247 (the alias is in hardware.ts). 1 diagnostic, zdrawgfxzoom32GP (`rectangle{}` braced temporary). The fork's sizeof-branch reason is stale. Its device_start replacement stands in for konami_decode_gfx, device_missing_dependencies and make_unique_clear.
- Clean as written: SEGA_SYS16A_SPRITES, I8255, UPD4990A, WATCHDOG_TIMER, GENERIC_LATCH_8, SEGA_315_5195_MEM_MAPPER. So that work is composition, not lowering.

**Trap:** while `oracle:baseline record` runs, don't rebuild dist AND don't edit src. Each target spawns a fresh node that imports src/games and src/runtime through tools/oracle/ours.ts.

Probe script: scratchpad `probe-forks.ts`. Related: [[device-forks-203]], [[mame-baseline-204]], [[ask-before-mame-sweeps]].

**Progress 2026-11-05:** item 13 committed (bdadaad4), item 15 committed (b78cf7c5); both posted to the issue.
- 13: device maps in the driver's own directory now expand (expandSubmap also searches the family's maps). Device-map lambdas are compiled as device methods named `__inline_<map>_<start>_lw8`. Typed constructors' constant setters and forwarded shared_ptr tags are lowered (`constructorShares`). Also fixed: the generic address_space handler path dropped `offset`.
- 15: `compileDeviceRomProgram` in driver-init-compiler.ts (device lifecycle + hook as an init-program with a `device` env). Handler-IR now parses multi-dim local arrays; this fixed MSM5205 nbl2bit = ALLOC(16) zeros.
- Traps: `node bin/mamekit.js a b` builds only the FIRST target. Contracts run in a sequential batch can flake (gameboy 2 fps, writeHash) and pass alone.
- The user asked "how long until done done"; my answer was 4-7 working days. I offered splitting into two PRs vs one as written; no answer yet.
- Trap (2026-11-05): `--build-runtime --build-app` died from a native signal mid-build. It left dist/runtime/generated/devices EMPTY, and the next sweep "failed" 36/36 on ERR_MODULE_NOT_FOUND adc0804.js. After any rebuild, check the build exit code AND `ls dist/runtime/generated/devices | grep -c .js` before sweeping. Fix: clean gen:all (retry once).
- Item 7 sweep (pre-fix): 52 pass, 44 state-only (the watchdog device is now in the state; video/audio identical over every checkpoint), mk/nbajam/rygar audio writeHash only (PCM/RMS/count identical), elevator start-order crash (fixed by holdsChildren -> deferStart), ffight native signal.
- Item 7/8 (2026-11-05): the user committed my WIP as `ff005a9a`/`cfc6e387` "fix". Always check `git log` before diffing/stashing.
- The real elevator bug: the generic READ handler path never passed `address_space &space`, so data_r(space, offset) got offset-as-space and every status poll took the data branch. Write side fixed in item 13. Now shared (`spaced`).
- MB88 macro bindCalls were dead (the C-preprocessor pass already expanded them). The hosted firmware/RAM memory model (m_cache/m_data/READOP/RDMEM/WRMEM in configureHostedProcessor) is LIVE: removing it silences digdug. It stays, listed as remaining.
- Elevator oracle vs 5a11f2aa: pixels better x2, audio:none better; RAM "worse" only from 899/900 comparable frames (bytes 206,866 -> 3,208); contract onsets 0.72 -> 0.92.
- **Item 7 closed 2026-11-06 (`c3514d4c`):** a compiled WATCHDOG_TIMER re-arms 3 s on every kick. armedTimer aborted the slice whenever no device timer was pending (budget = Infinity). The fix ignores arms longer than one frame period (MAME's VBLANK-start timer always comes first). Bounding by our round's last line instead was WRONG: those lines aren't MAME timers, and gameboy:tetris's PCM moved. After the fix: 53 pass, 48 state-only (exactly the WATCHDOG_TIMER boards), plus elevator; 49 goldens re-recorded.
- Diagnosis recipe that worked: temporary perl patches to `dist/runtime/core/generated-board.js` (back up first, restore after). For runtime-vs-compile, an A/B: `cp -Rc dist` (APFS clone, instant) + `ts.transpileModule` of the old runtime files into the copy, run with MAMEKIT_OUT_ROOT. For a compile-side suspect: revert one src file, `node bin/mamekit.js dev-game <t>` (builds into .cache/dev/<t>), restore.
- A writeHash-only change (count and PCM identical) is a sub-sample timing shift of CPU-stamped writes. Find the scheduler cause before re-recording.

**Item 9 (slapstic, 0e6154a9, 2026-11-07):** compiled whole; access-tap IR deleted, device_start installs its tap via the space finder. Lessons: struct `__call` methods only run emitted when the struct type is an *allocation of the class that builds the value* (checker's `return test(...)`), otherwise line ~666 of generated-device interprets them (gauntlet 36→94 fps once fixed); a method handing a lambda to `install_*` must be a codegen root or the lambda is an interpreter closure per bus access; nested `make_unique<T>` only for T inside the device's own class (a CPU base's `mi_default` broke gen:all); save walker now aliases repeated objects (`$alias`). sweep.sh is zsh — `bash sweep.sh` runs only the first game.

**Item 6 (System 16A, 2026-11-07):** user committed my WIP as `8127e3c6` "fix"; rest in `263ca4ad`. Semantic baseline re-recorded `9cb6d74d` (CI's "Clean generation and audit" had failed on audit:semantics since early in the branch; ROM shards are skipped behind it). Re-record after each item: build the commit in a scratch worktree (`git worktree add --detach`, symlink node_modules, gen:all), sweep with MAMEKIT_OUT_ROOT=<wt>/dist, then `MAMEKIT_OUT_ROOT=<wt>/dist node src/gen/semantic-baseline.ts --record` — keeps the user's dist up. Lessons: delegate→method-name lowering must skip delegates passed straight to install_* (broke Game Boy MBC1 spec); the video can't see IrDevice via state (finders are call adapters) — use `primitives.deviceMembers(tag)`; shinobi's old rms 0.40 was a DAC DC offset (7751 never ran). Neo Geo hardware fields still in board: `__neoGeo*` + `neoGeoRtc`; hostModel hardware key left: `mario.coin`.

**Items 4/5/8/14 + lifecycle (2026-11-08):** committed as 74dbc860 (Neo Geo + held device resets), 1cd2c333 (item 14), 35361acb (MB88), 481028c6 (guard), 742a6225 (mame-baseline forwards --mame-src), 5c9eb631 (set_constant), 710c2cc7 (unresolved list -36). Not pushed yet as of this note.
- Holding device resets until after machine_start made i8255/PIA/MCS-48 resets reach driver handlers. Two silent gaps surfaced: (1) `tri_pX_callback().set_constant(0)` was dropped, so the PPI floated at 0xff (zaxxon no-input 57.8 dB, MAME silent); fixed as a `constant` connection effect. (2) Mario's `netlist_mario` is never compiled. Netlists only lower behind an AY8910 sound plan (lower-sound.ts), so `m_audio_snd[N].write` stays unresolved and mario's audio is the raw DAC. That's a follow-up issue; its old golden only looked closer because of the hand overlay's fake DAC writes.
- `mame-baseline compare` from a worktree: oracle children ignored --mame-src and fell back to ../mame beside the worktree (all 53 "worse", "oracle exited 1"). Fixed in 742a6225, so set MAME_SRC anyway on older trees.
- frogger/scramble no-input "worse" is noise floor. Both sides are silent attract: MAME's only content is the AY DC step when the game unmutes at frame 98, and ours was already -68 dB. frogger RAM's first divergence (frame 44, audiocpu:43fe) predates the branch.
- **Merged 2026-11-08** as `a4ff9752` (PR #239); #237 closed; epic #178 rows 4–9, 12–15 struck. Next: #240 (Video items 17–23 in one issue, linked as a #178 sub-issue; baseline from a4ff9752). Known issues from #239 are in `docs/OUTSTANDING.md` (created at the user's request, uncommitted when written).
