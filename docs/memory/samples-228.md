---
name: samples-228
description: "#228: samples.cpp compiled whole; zaxxon/panic/congo/tmnt now match MAME; open items are qbert bands, gauntlet instability and the clean-main comparison"
metadata:
  type: project
---

#228 (2026-11-01, uncommitted on branch 228-25-...). SAMPLES is a stream device (`extractStreamDevice`); the mixer renders one stream a channel through MAME's LOFI (`hardware/speaker/runtime.ts`); sets reach `BoardConfig.samplePath` (`runtime/sample-path.ts`).

Against baseline 105af76f, contract input: zaxxon -0.0 dB, panic -0.2, congo -0.1, tmnt -0.0; carnival better. qbert bands read slightly worse (17.17 -> 17.66; 30.03 -> 32.09 with no input), not attributed: reverting its mix did not change them. Marble and gauntlet read worse with or without `streamLevel`; #225's changelog already reports Marble as worse against this baseline.

**How to apply:** a clean-main run was never taken. Files named `main-cmp-*` and `crash-main.txt` from that session are BRANCH numbers (see [[stash-in-scripts]]). Crash rate on the branch varied by batch (8/102, 4/32, 1/32); gauntlet also failed with rc=1 twice in 4 runs (save-state rewind divergence, then a golden mismatch), so it is unresolved, not cleared as [[host-machine-faults]]. `node bin/mamekit.js <game> --build-runtime` ignores --build-runtime; use `--build-runtime --build-app` with no game.

PR #229. Gauntlet speech: `speech_squeak_w` runs the TMS5220C at 9943 Hz vs 8135, and the OPM worklet's LOFI was fixed at the configured rate (since #194), so a sentence fell 300 ms behind and its closing mute cut it. Fixed with the live rate in the `.pcm` offset (0 = configured, so goldens hold) and `setSourceRate`. The contract never toggles squeak, so the fix is proven by simulation, not yet by ear. Contract balance: speech -3 dB, music +3 dB against MAME, unchanged.

Update, same day: the squeak fix did NOT stop the cut-offs. The cause was the OPM worklet's fast-forward queuing `.pcm` from stale frames with no time to play them, leaving speech up to 500 ms behind after main-thread stalls, so the closing mute cut sentence ends. Only the browser stalls, so the harness never showed it. Fixed by skipping `.pcm` on stale frames; the user heard "much better". Carnival never started a sample: `#define PLAY(samp,id,loop) samp->start(...)` was unexpanded (`collectParameterCallMacros`).

Gauntlet levels against MAME with DC removed (firing run, per-second table from both WAVs): music +2.5 to +2.9 dB, speech -2.9, POKEY -3.3. Consistent with YM2151_MASTER_GAIN 0.7 where MAME's stereo average gives the YM 0.5 and other chips 1.0. Changing it touches 13 YM2151 boards, so it's the user's call. When comparing MAME WAVs by hand, remove DC first: unipolar POKEY read -6 dB without it.

Update: #230 removed YM2151_MASTER_GAIN and streamLevel, on a branch stacked on #229 (merge #229 first, then retarget). Levels are within 0.8 dB of MAME on 11 of 13 boards; shinobi 1.54 and simpsons 4.53 remain. CI on #229 went green (31 pass), so the local crash rate is this Mac. Harness goldens are measured before the master gain, so a master gain change moves only boards whose worklet output changes. Q*bert's Votrax is unlowered, and its speech doesn't play; DAC route ignores reset_routes (0.25 vs MAME 0.20). In zsh, `for g in $LIST` does not word-split.
