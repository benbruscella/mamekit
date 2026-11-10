---
name: mame-baseline-204
description: "#204: tools/mame-baseline.ts record/compare/show; baselines now in .oracle/baseline (moved out of .cache in #216); oracle --audio/--out; what the numbers can't say (size-mismatch machines, MAME without samples, qbert ROM quarantined)"
metadata:
  node_type: memory
  type: project
  originSessionId: 3445cc0e-302c-4318-a2fe-85b9b523272a
  modified: 2026-10-27T06:08:07.197Z
---

#204 (2026-10-27, PR #205, merged).

**Use it:** `MAME_BIN=... fnm exec --using=26.12.1 npm run oracle:baseline -- compare <targets>`
- Re-runs the stored oracle plans and prints better/same/worse for pixels:none, pixels:contract, ram, audio:none and audio:contract. Exits 1 on any worse.
- `show --markdown` gives the table. `record --baseline <commit>` finishes a baseline from a tools-only commit (src/MAME/Node/dist must match).
- The first baseline was 090275cf (src = main 0dce59a9, MAME 0.289, Node 26.12.1); it and 691ed10f were later lost to clean:all. Every run is deterministic: re-running unchanged gives `same` everywhere.

**Design choices:**
- Audio comes from the oracle (`--audio` = MAME `-wavwrite` against our `ours.pcm` capture, through compare-audio.mjs), with no input and with contract input. compare-game-audio's 30 s power-on run is silent attract mode on 16 machines and can't mount list software.
- Level is clamped at -80 dBFS (SILENCE_RMS) on both sides.
- Pixels: losing an exact frame is worse whatever else improves. RAM: a later first divergence is better.

**Traps found:**
- Derived RAM ranges for c64/c64p are only the 1541's. Tape, cart and quickload boots leave the drive out, so the oracle now drops processors the boot lacks (`RamPlan.fromBoard`).
- The baseline can't speak for these:
  - **Pixels on 9 size-mismatch machines** (asteroid, bzone, the galaxian family, tutankhm, junofrst): never exact against MAME.
  - **Sample machines** (carnival, congo, panic, qbert, zaxxon; invaders has none in 0.289): sets live in `.data/samples/<set>.zip` (user-managed; `_new/` is intake and MAME won't search it). The oracle passes `-samplepath`. Audio was re-taken with `--redo audio` on 2026-10-27. Ours misses most sample triggers (zaxxon 0.60 vs 5.75 onsets/s).
  - **qbert:** votrsc01a.zip was moved back to `.data/roms/arcade/` by the user. `roms-tidy` will quarantine it again until tidy keeps device sets MAME's own run needs (#206, which also covers samples import/status/private sync).
  - **spectrum/cartridge:** #208. It plays in the browser, where `fulltag.append` (a std::string call we don't compile) silently answers 0. The strict harness (#182's `failOnUnaccountedCalls`) refuses it. Candidates never run in the real-ROM sweeps, so it has been failing unseen since 2026-10-24.
  - **Galaxian family, tutankhm, junofrst:** MAME draws at 3x width (GALAXIAN_XSCALE, for sub-pixel stars). Done in #207 (2026-10-27): the oracle repeats ours along the board's horizontal axis by `scaledScreen` from -listxml (`pixels.scale`). The pixels were re-taken into 090275cf; frogger, junofrst and zigzagb are exact with no input, and galaxian/scramble/jumpbug/tutankhm differ only by stars (item 19). Only asteroid/bzone (vectors) remain incomparable.
  - **Redo after src moved:** main's src left dcb062f056 at 1c36815d (#209). The redo ran from a temporary detached commit: a44c1d80 + #209's mame-baseline.ts + the change (old mame-side.ts kept, since the new one imports src/paths samplesDir), then gen:all, the redo, back to the branch, stash pop, gen:all. The old src has listxml PARSE_VERSION 2, so it rewrites those machines' .cache/listxml entries (harmless).
- PR #205 merged 2026-10-27; #204 closed; epic #178 step 3 now points at `oracle:baseline compare` (edited on the user's explicit request after an earlier auto-mode denial).

**Location moved 2026-10-29 (#216, 3aecd199): baselines are in `.oracle/baseline/`, comparisons in `.oracle/compare/`** (gitignored). `npm run clean:all` (`rm -rf dist .cache`) had deleted every baseline because they lived in `.cache/oracle/`; the user runs it routinely. Per-run oracle reports stay in `.cache/oracle/<target>.json`. Check `ls .oracle/baseline` before planning a compare.

Related: [[mame-oracle-tool]], [[oracle-input-mirroring-198]], [[host-machine-faults]], [[dont-wipe-served-dist]].
