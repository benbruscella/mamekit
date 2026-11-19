---
name: exact-attotime-272
description: "#272/#274: devices reading attotime fields hold exact attotime; Venture music back; levels' mix row reads ~5.6 dB low on Venture; residual RAM drift from frame 3932 is a MAME round we don't end"
metadata:
  type: project
---

#272/#274 (2026-11-19): the 8253 never toggled, so Venture had no music. User chose "exact where the source needs it": `markExactAttotime` (src/mame/exact-attotime-marking.ts) marks a device `exactAttotime` when it reads `m_seconds`/`m_attoseconds`, and its attotime ops `attotime: true`. These run on `ExactAttotime` (src/ir/exact-attotime.ts). Device timers carry `exactExpiry`, and `machine().time()` in the callback answers it. Only pit8253 qualifies today.

**Measuring:** `mamekit against venture --audio` (the real mix against MAME's -wavwrite) is the sound truth: −0.3 dB after the fix. `mamekit levels` "mix" still reads ~5.5 dB under MAME on Venture after the fix (−37.8 vs −32.3 in attract), while --audio says −0.3 dB. The board routes to `mono` at 0.50 and our `soundbd` row equals MAME's mix, so don't chase the levels mix row for this board.

**Residual (#275):** with contract input RAM is exact to ~3900. At frame 3188 MAME ends a round between the main CPU's PIA 5202 read and write (53.1199965–53.1200079 s); ours runs on to 53.12025. Ruled out: 8253 edges, the 6532 timer (fires only at underflow), VBLANK end (line 0), collision timers, 6821 (no synchronize). Lead: `input_merger::in_w` synchronizes on every call. Next step if pursued: a diagnostic MAME 0.289 build with schedule.cpp `VERBOSE 1`, which needs the user's OK and must stay separate from MAME_SRC/MAME_BIN.

**Gotcha:** `--build-runtime --targets <game>` prunes other devices' modules that dist/app still imports, so `against` fails with "Cannot find module ad7524.js". Use `--build-runtime --build-app` (~75 s) instead. See [[single-target-gen-scope]], [[venture-scheduler-time-271]].
