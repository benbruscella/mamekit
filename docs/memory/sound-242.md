---
name: sound-242
description: "#242 (items 26–33, 35–37 of #178): all sound in ONE PR (user ruling), baseline e11059da over 92 targets, branch 242-sound"
metadata:
  node_type: memory
  type: project
  originSessionId: d893caa6-f058-4f34-8de4-3331b7d7f4bf
  modified: 2026-11-09T11:37:59.766Z
---

#242 started 2026-11-09 on branch `242-sound` (from e11059da, main after #241).

**User decisions (2026-11-09):**
- All of sound lands in ONE PR; the issue is not split. The issue body's "One PR" section says so; the family order (ymfm, read-back chips, simple chips, board sound devices) is only the commit order inside it.
- Issue body expanded at the user's request: 57 HAND_WRITTEN_ENGINES = ~15 engines × (core, frame renderer, mixer, processor), plus duplicates (MSM5205 ×3, OKI ×2, uPD7759 ×2); step 8 CI fps check names all 13 YM2151 machines (not only CPS1/S16/Konami).

- tia, sid and gameboy are IN the new sound-kind guard and move to `sound.kind = stream` too (user picked "fold them in"), so the guard reaches empty and the stream worklet is the only playback worklet. Follow-ups live in issue #247 (was docs/OUTSTANDING.md, deleted 2026-11-11 at the user's request), never duplicated in the feature issue (user ruling).

**Baseline:** `oracle:baseline record --jobs 4` from e11059da (user said "GO!"), into `.oracle/baseline/e11059da`, 107 scenarios / 92 targets. dist was built from d89969ca, whose src tree equals e11059da's.

**Why:** the user owns PR structure; see [[confirm-scope-on-open-questions]], [[stay-on-issue-branch]].
**How to apply:** don't propose splitting #242 again. Related: [[board-devices-237]], [[final-validation-240]], [[audio-engine-placement]], [[vrc7-ymfm-188]].

**Route facts (agent survey 2026-11-09):** every stream device (POKEY included) runs `sound_stream_update` on the MAIN thread via createStreamMixer (speaker/runtime.ts) and posts `stream.pcm`; the stream worklet only queues and resamples. STREAM_SOUND_TYPES + streamRoutedDevices live in src/hardware/speaker/definition.ts. OPM/OPN are hand engines that only read tables from ymfm; DS1001 (VRC7) compiles via plain compileMameDevice. The netlist solver is emitted into the AY worklet, so it has to move when `ay8910` goes.

**Sweep gaps found 2026-11-10** (each fixed generically; most hid behind "0 diagnostics"):
- Silent chips came from stream-surface holes: `add_int` was missing on the mixer surface (Namco WSG summed into nothing via `?.`), `output_count()` answered 1 so ymfm on an ALL_OUTPUTS route rendered FM only (commando). Grep emitted devices for `stream).X?.(` to audit the surface.
- XTAL constants read as `NAME.value()`/`.dvalue()` (exidysound SH8253_CLOCK) gave rate 0; rewritten to the number in compileMethod.
- Nested classes held by value (`class KDSC_Voice {...} m_voice[4]`) go through the existing `object`/allocation route, NOT the struct route; making classes structs broke z80pio's pio_port and atarimo. Brace-per-element initializers `{ {*this}, ... }` unwrap to the element args; `m_device.read_byte` needs device_rom_interface's read_byte on the `self` referent.
- The netlist solver was opaque to save states (`MAMEKIT_STATE_REPORT=1` lists opaque objects); solver classes now declare stateKeys().
- Diagnose silent boards with `MAMEKIT_OBSERVE_STREAMS=1` (reports per-stream nonzero counts).
- Clock-rate streams (Exidy 6840, NES APU at 1.79 MHz) cost fps: berzerk 44 (floor 60), NES 29 (floor 30).
- **xevious regression (2026-11-10), bisected in the user's tree:** 4a50149c bound `reset` in every device's call table (for TMS5220C self-reset). The call table answers before a class's own method on a board effect, so namco_51xx_device::reset(int) (pulses the MCU reset line) reset the whole chip on every misclatch write; the 51xx answered `02` instead of MAME's `ff` at frame 714 and attract diverged. Fix: bind self-reset only when the class has no `reset`. Affects every Namco 5xxx board.
- **Bisect method:** `oracle --io maincpu:6800-7100 --io-frames a-b` finds the first differing bus access vs MAME; build one target per commit with `mamekit <t> --skip-app` + `--build-runtime --build-app --targets <t>` (the games-manifest step then refuses a mixed dist; the app is built anyway). Commits whose board doesn't run (here ce530b3d..today for xevious) can't be bisected. The frame-53 c0e9 RAM diff in xevious is in the e11059da baseline too: compare a measure against the BASELINE's first divergence before chasing it.
- MAME's default resampler is audio_resampler_lofi; fast single streams now use it (Mat Mania was +6.7 dB above 12 kHz with a plain span mean).
- **Late fixes 2026-11-10 (Sound 9/10 + uncommitted):** (1) evalExpr's float-suffix strip ate hex (`0x8e7f`→`0x8e7`): popeye's IR went invalid and the whole compare died in 2 min; anchor literal regexes with `(?<![\w.])`. (2) Slow-path streams (below 48 kHz) that feed another device never `keep()`'d their samples: berzerk's S14001A→FILTER_VOLUME was silent; now exact vs MAME. (3) A route into an owner (`*this`) followed only the owner's first route: rampage/spyhunt boards on both speaker inputs lost 6 dB. (4) YM2610 never mixed ADPCM-A/B: `m_adpcm_a.output(...)` is a deduced `template<int NumOutputs>` emitted as output_1/output_2, so the bare call was a silent `?.` no-op; plus `fm_engine::output_data` resolved via the bare base with no scope (OUTPUTS=3). Spec pins native-ymfm numbers (clang recipe in ymfm-chips.spec).
- **Short oracle spot checks lie:** the default 10 s window is mostly attract silence; use the compare's own plan args (`.oracle/compare/<t>.json` → plan.none/contract.args) before claiming a fix.
- **Oracle audio artefact:** ours.pcm already carries the browser 20 Hz speaker high-pass and compare-audio adds another; MAME's -wavwrite is pre-effects. DC-step boards (rampage) look worse than they sound.
- The `--io` tap can't compare a 16-bit bus with umask16 byte devices (MAME logs `ffff`, ours `ff`), so first-difference stops at #0.
- rtype video (logo/sprites/ground missing) is pre-existing on main (baseline pixels identical) — not #242.
- **Final compare (2026-11-11)** on 24c605b2: table posted to #242; every material "worse" is in #247 section 4.3. Triage method: diff each verdict against the previous full compare (movers), then `persec.py` (per-second RMS with MAME's 20 Hz high-pass applied) on a `--keep` run before calling anything a regression.
- **`npm run test:games:record` stops at the first golden whose sound writes swing ≥5%** (`process.exitCode = 1` + `|| exit 1` in the loop). After a sound rewrite every board swings (stream samples are counted, not register writes), so loop `record-goldens.ts` per game yourself, log each exit, and hand the user the swing list to confirm.
- **Merged 2026-11-11** as `8213730b` (PR #243); #242 closed. Main had been red since #245 squash-merged most of the branch without its goldens; this merge carries the re-recorded goldens and semantic baseline. Seven CI fps floors were lowered (user's choice); the emitter perf follow-up is #247 4.5. rtype's missing ship is #246.
