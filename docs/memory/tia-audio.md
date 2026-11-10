---
name: tia-audio
description: "Atari 2600 sound (issue #94) works and matches real MAME to 0.1-4%; how the chip was extracted, why it runs main-thread, and the three silent traps that hid it"
metadata:
  node_type: memory
  type: project
---

TIA audio landed 2026-08-30 on `94-add-support-for-atari-2600-console`.
`src/mame/tia-audio-compiler.ts` compiles `class tia` out of
`src/devices/sound/tiasound.cpp` into an ordinary `GeneratedDeviceDefinition`.

**Why it needed a bespoke extractor and nothing else did.** `parseMameAst`
finds *no classes at all* in tiasound.cpp: `class tia` sits in an anonymous
namespace with every method defined inline. The lowering itself is boring —
`write`, `tia_process` and `poly_init` all compile with zero diagnostics. Only
the extraction is special. Method names follow the wrapper in tiaintf.cpp
(`tia_sound_w`, `sound_stream_update`), because that is what callers use.

**It runs main-thread, not in the worklet.** `tia_video_device` reaches its
sound half through `required_device<tia_device>` and calls `tia_sound_w` on it
directly — across a worklet boundary that finder has nothing to resolve to. So
the chip is a generated device beside the CPU and only PCM crosses, exactly the
TMS5220 shape ([[audio-engine-placement]]). New generic plumbing for that:
`sound_stream::put_int` is bound in `generated-device.ts` (as
`stream_put_int`), drained by `Device.takeStreamSamples()`, exposed to sound
runtimes as `SoundRuntimeContext.deviceStream(tag)`. The a2600 installer pumps
`sound_stream_update` from `cpus[0]` and posts `<tag>.pcm` writes; the
generated worklet is a queue plus a phase-accumulator hold — no DSP.

**Three separate silent failures, each producing plausible-looking output:**
1. **No `start:` field.** `IrDevice` only runs a startup method when the
   definition names one (`start: 'device_start'`). Without it the constructor
   never ran, every polynomial stayed zero, and only the constant and pure-tone
   modes made a sound — Combat silent, Asteroids silent, Space Invaders thin.
2. **File-scope lookup tables.** `Div31[]` is `constexpr` *outside* the class,
   so the member scan missed it and every DIV31 mode read zero and never
   toggled. The compiler now also lifts file-scope constexpr arrays.
3. **The closure cache.** `.cache/closure` keys on target-graph bytes + MAME
   rev, NOT on mamekit's own compiler source, so an edited extractor is
   silently not run and the artifacts look stale-but-fine. `rm -rf
   .cache/closure` after touching any capability extractor. Note also that
   `node bin/mamekit.js <target> --build-runtime` does NOT rebuild the closure:
   the closure branch is `else if`, so it needs `--build-runtime` with no
   target ([[single-target-gen-scope]]).

**Verified against the user's real MAME 0.289** over an identical 20 s window
([[mame-reference-capture]]), post-gain: combat 0.2876 vs 0.2873, spaceinv
0.0918 vs 0.0954, asteroid 0.0000 vs 0.0000, pitfall 0.2250 vs 0.2250. Pitfall
with no input is a constant DC on both sides — that is the hardware, not a bug
(AUDC=0 holds the output at AUDV). Attract silence on 3 of 4 carts is also
correct: MAME with no input is silent too. **Measure with `-seconds_to_run 20
-wavwrite -video none`, and press Reset on both sides over the same frames, or
the windows are not comparable.**

**Do not diagnose a TIA by sampling AUDV.** Space Invaders' marching tone
pulses, so reading `members.AUDV` every 100 frames catches zeros and looks
stone dead -- that reading alone had me believing fire and sound were broken in
the browser when both worked. The honest metric is **per-frame PCM peak**, and
the honest reference is *when* MAME's WAV first crosses the same threshold
after Reset: spaceinv ours 148 frames vs MAME 150, combat ours ~0 vs MAME 2.
Space Invaders simply takes ~2.5 s of its own attract after Reset before it
makes a sound, on both sides.

**`?qa=1`** parks the shell's wall clock and hands frames to
`window.mamekit.step(n)` -- that is what makes a browser run comparable to a
Node probe, and it is how "browser differs from Node" got ruled out here.

**Unrelated bug found the same way:** the console room hardcoded
`['.rom','.col','.bin']` (the ColecoVision set) as the cart file-picker filter
for every non-NES console, so a 2600 `.a26` was greyed out in the picker. Now
lowered from each slot's own `device_image_interface::file_extensions()` into
`config.cart.extensions` -- a2600 `.bin/.a26`, coleco `.rom/.col/.bin`, nes
`.nes/.unf/.unif` (the NES gained `.unf`/`.unif` it never had).

**How to apply:** the browser proof is `window.mamekit.audio.node.port`
(tap `postMessage` and count non-zero `batch` writes) plus
`board.devices.get('tia').members` — the AnalyserNode reads 0 in headless
Chromium, which is [[e2e-live-audio-gap]], not a failure.
