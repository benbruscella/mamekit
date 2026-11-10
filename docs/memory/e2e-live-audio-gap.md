---
name: e2e-live-audio-gap
description: "e2e 'boots, takes a coin and is audible at full speed' fails for EVERY game on this machine; verified pre-existing against a clean base-tree worktree"
metadata:
  type: project
---

`npm run test:e2e` fails the second arcade test — "boots, takes a coin and is
audible at full speed" — for **all 51 machines**, with `no sound reached the
speakers` (peak exactly 0) and sometimes `audio never started` on the retry.
The first test, "plays its accepted contract on the app canvas", passes for all
51: region hashes, every checkpoint, the sound-register write counts and the
canvas snapshot all match. So the board and the audio *writes* are right; only
the live wall-clock pass measures silence.

**This is pre-existing, not a regression** (verified 2026-08-26): a `git
worktree` of the base commit, clean-generated in place, fails identically for
pacman. Headless Chromium itself can make sound here — a bare oscillator +
AnalyserNode measures rms 0.25 — so it is the app's real-time path, not the
environment's Web Audio.

**How to check it quickly** without the whole suite: drive the app with
playwright directly (script must live inside the repo so `playwright` resolves),
boot a game through `[data-dropzone]` + the file chooser, wait for
`window.mamekit.audio.monitor()` to be non-null, then read
`window.mamekit.soundWrites`. On pacman after coin+start it reports
`{total: ~10000, nonzero: 0}` — the board emits only zero-valued register
writes in the live loop, while the qa-driven pass emits the golden's 2375
nonzero ones. Input is not the cause: `?debug` shows Digit5/Digit1 reaching IN0
and IN1 with the right masks.

Don't treat this as caused by whatever you just changed; see
[[frugal-blast-radius]] and [[acceptance-harness-coverage-gap]].
