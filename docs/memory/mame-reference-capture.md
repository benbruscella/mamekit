---
name: mame-reference-capture
description: "How to capture ground-truth audio/register traces from the user's real MAME 0.289 binary for the wave technique"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0e753b12-d650-43f4-90b9-2dfacf319bce
---

User's real MAME binary: `/Users/benbruscella/Google Drive/My Drive/Emulators/mame/mame0289-arm64/mame` (re-confirmed 2026-09-11; reports `0.289 (mame0289)`). It **matches the `../mame` source checkout**, whose `BARE_BUILD_VERSION` is 0.289 — the user keeps the two in step deliberately, so the binary is a valid oracle for the same source the compiler reads (`-listxml` comparisons, reference captures). It is the only MAME binary on the machine (2026-11-05: no Homebrew mame, nothing on PATH; `../mame` is source only, no built binary). One trap: `../mame/build/generated/version.cpp` is a stale build artifact that also still says 0.288 — read the source version from `../mame/makefile` (`BARE_BUILD_VERSION "0.289"`) instead. The same binary is also reachable at `/Users/benbruscella/Library/CloudStorage/GoogleDrive-benbruscella@gmail.com/My Drive/Emulators/mame/...`, and older-numbered releases sit beside it in `Emulators/mame/` — re-check the highest `mame0*-arm64` directory rather than assuming this number. (SDL3.xcframework installed to /Library/Frameworks on 2026-07-07; quarantine cleared). ROMs resolve from its default rompath; snapshots land in `snap/` (not `snap/<game>/`).

**Deterministic reference WAV** (no input — interactive recordings contain coin-up and are useless as refs):
`./mame <game> -seconds_to_run N -wavwrite out.wav -video none -nothrottle`

**Register-stream trace** (the sharpest tool — diff against our soundWrite stream to split emulation bugs from rendering bugs):
Lua `-autoboot_script` with `mem:install_write_tap(lo, hi, name, cb)` on the audiocpu program space. Pitfalls learned 2026-07-07:
- Keep the tap handle and file handle in Lua **globals** — locals get GC'd and the tap silently dies (~0.25 s in).
- `emu.register_stop` is gone since 0.288 → `emu.add_machine_stop_notifier`.
- Timestamp: `machine.time.seconds + machine.time.attoseconds * 1e-18`.
- 8039 DAC bytes are NOT capturable this way (P1 is a devcb, not memory-mapped).

**Frame-exact video reference** (the decisive check for video work — lets you
diff our framebuffer against MAME at the same frame number):
```lua
target = tonumber(os.getenv("SNAPFRAME"))
count = 0; snapped = false
framesub = emu.add_machine_frame_notifier(function()
  count = count + 1
  if count >= target and not snapped then
    manager.machine.video:snapshot(); snapped = true; manager.machine:exit()
  end
end)
```
Run with `-video none -nothrottle -autoboot_script`. Pair it with a Lua
`space:read_u8` dump of video RAM to split CPU divergence from rendering bugs:
if VRAM matches byte-for-byte but pixels don't, it is purely a render bug.
Note our framebuffer is canvas order (0xAABBGGRR, see `packRgb`), so a naive
PPM dumper that assumes RRGGBB reports a spurious red/blue swap.

**Compare in ATTRACT, never in a scripted replay (2026-08-25).** A contract's
key schedule replayed into MAME (`field:set_value()` from a frame notifier)
drifts: the game's own timing shifts under input and the two runs never
re-converge, so every offset reads 12-18% different and proves nothing. With
*no input at all* both sides are deterministic from boot and align at a fixed
whole-frame offset — for sf2 our frame N is MAME frame N-4 — and static attract
screens then come out **0 differing pixels**. Recipe: run the harness with
`{...contract, actions: [], checkpoints: [], golden: undefined}` (it still
throws "video did not progress" at the end; catch it, the frames are already
written), sweep MAME's SNAPFRAME to find the offset once, then diff. Residual
diff confined to one or two horizontal bands is the parallax/dither animation
one frame out of phase, not a bug — check it by histogramming the differing
pixel pairs: symmetric swaps of adjacent shades mean phase, a uniform row
shift means scroll.

Render a captured trace through the worklet-DSP replica (scratchpad `render-trace.mjs` pattern) to A/B rendering with guaranteed-identical input. Absolute per-octave band RMS (not normalized fractions) is the metric that exposed the uniform +9.4 dB AY gain error — normalized bands hid it.

Calibration facts locked in commit 7edf9ab: MAME ay8910.cpp channel swing = (norm−0.25)×0.5 pre-route (build_single_table); DAC_8BIT_R2R default range −1..1 (same as ours); junofrst routes AY 0.30/channel, DAC 0.25. Known residual: audiocpu ~3% cycle drift vs MAME (music starts 0.13 s late).
