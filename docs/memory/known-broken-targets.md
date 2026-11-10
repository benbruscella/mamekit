---
name: known-broken-targets
description: "History of broken targets; as of 2026-08-27 all 56 enabled contracts pass (mslug, arkanoid, rygar, wboy re-enabled) and everything still listed as broken is in src/games/disabled/"
metadata: 
  node_type: memory
  type: project
  originSessionId: 07afc189-1d46-4696-a6fb-e06868efcf42
  modified: 2026-08-20T07:12:34.442Z
---

Verified failing identically on a clean tree on 2026-08-18 (so NOT caused by
that day's audio/CPU-clock work):

- **tmnt, rtype, simpsons** — acceptance "video did not progress": main CPU
  never boots the video path (rtype's soundcpu holds at pc=0 too).
- **gauntlet FIXED 2026-08-26** (issue #88), was "generated sound is silent".
  Seven faults, all general: the Atari slapstic never lowered, a `.bankr()`
  window read by word on the 16-bit bus, `COMBINE_DATA` never reached a memory
  share, the motion objects had no plan, the gauntlet direct screen shape read
  16-bit shares as bytes and ignored scroll, `PORT_READ_LINE_DEVICE_MEMBER`
  dropped every device line but the screen's vblank, and the frame quantum was
  a scanline where MAME's is the interval between timers. It now coins, plays,
  and its attract mode is within 0.4% of real MAME frame for frame. Its
  POKEY effects and TMS5220C speech followed the same day: both chips are now
  generated and audible, video hashes byte-identical across the change. See
  [[latch-burst-interleave]], [[sixteen-bit-bank-window]] and
  [[audio-engine-placement]].
- **spyhunt** — stale golden + MCR "Cheap Squeak Deluxe" board dead; its
  `csd:pia.read_alt/write_alt` are runtime-certification handlerGaps (the CSD
  68000 is not even in its execution plan), so it is a lowering gap, not the
  rampage bug. (spyhunt is currently in src/games/disabled/.)

**rampage FIXED 2026-08-23** (issue #74) — THREE stacked bugs, all general:
1. `.umask16(0xff00)` on an address-map
range was parsed away entirely, so the Sounds Good PIA — an 8-bit device wired
to D8-D15 of the 68000 bus — got `data << 8` on writes (truncated to 0 in the
device) and `value >>> 8` on reads (always 0). Its DDRA walking-bit self-test
at sg:cpu 0x2864-0x2874 never read back, so the 68000 spun forever on the
`bne.s *` at 0x2870. Modelled umask end to end (kg/parse -> kg/build ->
gen/generate -> ir/board+decode -> runtime/bus lane adapters).
2. The generated DAC worklet masked every write to 8 bits and inferred width
   from the values seen. The AD7533 is 10-bit, so codes wrapped four times per
   sweep — audible as a sawtooth. Now lowered from the DAC_GENERATOR lines in
   `src/devices/sound/dac.h` (bits/mapper/gain per chip). Also fixed
   `analogValue` in mame/audio-compiler.ts: it emitted `1e-12` into evalExpr,
   which has no exponent form, so EVERY CAP_P/CAP_N in MAME source silently
   evaluated to NaN and was dropped.
3. `prio_transmask` in runtime/generated-video.ts discarded the priority
   bitmap entirely (`if (priority !== 0) return`). MCR sprites are drawn from
   the end of sprite RAM backwards and each claims its pixels, plus a second
   invisible pass claims pen 8 to cut away the sprites behind it. Now a real
   `GeneratedPriorityBitmap` shared by `m_screen->priority()` and the screen
   argument. rampage is the only generated target using prio_*.

Also lowered MAME's three FILTER_BIQUAD op-amp stages (opamp_mfb_lowpass_calc)
between the DAC and the board output; verified against MAME's own source
comments (fc 4912.19 / 5310.69 / 5404.72 Hz).

Verified against the real MAME binary: octave-band RMS within ~1-3 dB below
4 kHz with music playing, and attract-mode frames are pixel-identical apart
from ~19 frames of animation drift. Residual: 4-8 kHz is ~+5 dB hot because
the DAC renders straight at 48 kHz while MAME oversamples at 48000*32 before
filtering.

**Why:** their goldens in git no longer match a clean-tree run, so something
between their original recording and now regressed them; they need their own
investigations, not golden re-records.
**How to apply:** don't treat these failures as caused by the change under
test; clean-tree-verify before re-recording any golden ([[gen-cache-policy]]).

**carnival "silent" was the TEST, not the game (2026-08-24).** The e2e audible
check hardcoded a 500 ms pause between the coin and the start press. Vic Dual
resets the main CPU on the coin edge, so Carnival's start landed mid-reset, was
never seen, and the game sat on its silent attract screen — the live analyser
read exactly 0 while the offline probe rendered 0.073 AC RMS. Every symptom
pointed at the worklet and it was the input schedule. The gap now comes from
the contract's own spacing (`startDelayFrames` in e2e/support/contracts.ts:
actions[1].atFrame - actions[0].atFrame, 30 frames when unstated), which is
where that machine fact already lived. Carnival needs 400 frames; the median
game needs 30.

**How to apply:** when browser QA says a machine is silent but the user says it
plays fine, believe the user and check the harness's input timing before the
audio path. Dump `window.mamekit.soundWrites` from the live page first — 8
writes where a working game shows 749 says the board never got going, which is
an input problem, not an audio one.

**Untriaged acceptance failures** (partial sweep, 2026-08-18, after the
prepared-cache/set_granularity/OPM day — NOT clean-tree-classified, so each
could be pre-existing OR a golden shifted by the intended execute.ts cache
fix): arkanoid, crush, gberet, pengo, polepos, qix, rocnrope (digdug and
mpatrol since fixed). If one looks/sounds right in the app, its golden is
stale → re-record; if broken in-app, it needs its own session.

**mpatrol fixed 2026-08-19/20** (user-confirmed), two stacked compiler/runtime
bugs, both general-purpose fixes:
1. cpu-compiler.ts normalizeMameExecutionSource's pointer-decl rewrite used
   `\s+` and reached across a newline into a preceding `//` comment, splicing
   `const uint8_t *x = memregion(...)->base();` into the comment (silently
   deleting it) whenever a comment line preceded it. Fixed to single-line
   `[ \t]+`. Also affected (regenerated + acceptance-passed): dkong/dkongjr
   (radarscp_scanline, user-confirmed working 2026-08-20), berzerk
   (vpos_to_vsync_chain_counter, not yet eyeballed), gauntlet
   (build_active_list).
2. generated-video.ts tilemap draw ignored TILE_FORCE_LAYER0 (0x10) — m52
   status rows are opaque and their vertical wrap covers the bottom 2
   scanlines. mpatrol is the only target whose tiles set the flag. Title
   screen verified pixel-perfect (mean diff 0.0) vs real MAME f600; golden
   re-recorded.

**bublbobl fixed 2026-08-18**: its no-boot came from the stale-bindings bug
class — effect executors spread-copied `calls`/`referenceCalls` at bind time
(generatedCompositeCallbackBindings / generatedCpuMemberBindings), so
later-added CPU calls (m_mcu.pulse_input_line → the 6801 IS3 handshake) and
video referenceCalls silently no-opped. Fixed at the root with live
prototype-chained overlays plus shared mutate-in-place referenceCalls dicts
(generated-board.ts, execute.ts). The remaining untriaged failures above may
have been healed by the same fix — retest in-app before investigating.

**Never swept that day** (no acceptance run at all): rygar, scramble,
sinistar, timeplt, trackfld, travrusa, tutankhm, upndown, venture, wardner,
wboy, zaxxon, zigzagb.

**2026-08-20 golden re-record after the [[frame-render-point]] fix** — user
asked for a batch re-record; 51 of 58 goldens re-recorded successfully. Treat
these 7 as BROKEN (user's call, "lets assume they are broken") — their goldens
still encode the OLD end-of-frame render point and will fail acceptance:
- **polepos** — record failed both attempts.
- **upndown** — runs at ~2 fps against its own 30 fps gate, so recording fails
  the performance check. ~9 min per 1200-frame attempt. Pre-existing (the
  render-point change moves WHEN a frame is presented, not per-frame work).
- **venture, wardner, wboy, zaxxon, zigzagb** — never attempted, run killed.

Also note: `node src/games/record-goldens.ts <many games>` died with SIGSEGV
(exit 139) after 3 games — the flaky node segfault in this repo. Record one
game per process with a retry, never one process for the whole list.

**Update 2026-08-25 (issue #85):** `nes` is no longer broken — it is back in
`REQUIRED_TARGETS` and runs at ~76 fps. See [[nes-console-shelf]].

**Update 2026-08-26 (issue #87):** every accepted arcade contract passes. A
full sweep of all 51 discovered targets — including crush, pengo, qix,
rocnrope, rampage, scramble, timeplt, travrusa, tutankhm, venture, zaxxon and
zigzagb, i.e. the whole "untriaged"/"never swept" list above that is still
enabled — came back 51 PASS / 0 FAIL. Everything else named as broken here
(arkanoid, gauntlet, gberet, polepos, rtype, rygar, simpsons, sinistar,
spyhunt, tmnt, trackfld, upndown, wardner, wboy) now lives in
`src/games/disabled/` and is therefore out of the sweep, not fixed.

Two flakes to expect in a sweep, both of which pass on retry: the exit-139
segfault ([[node-rom-inflate-segfault]]), and a spurious "generated behavior
changed" when another acceptance process is still running — kill background
runs before starting a sweep, or retry each game up to three times.

**2026-08-26, issue #88 (gauntlet).** The frame-quantum change reaches every
board, so re-run the full real-ROM sweep after touching it — that is the only
gate that covers it. Final state: **52/52 real-ROM contracts pass**, with 36
goldens re-recorded for the timing shift (no behaviour moved: mrdo and
mspacman stayed 0-differing-pixels against real MAME). qix and carnival keep
their goldens because `set_perfect_quantum` is now read from their source.

**2026-08-27, issue #91 (mslug). Metal Slug is re-enabled.** Its issue-#53
"player sprite is missing" is gone under the current architecture; the sprite
renderer is 0-differing-pixels against real MAME wherever the two runs are in
the same state, and the mirrored NEO*GEO logo / scrambled MISSION START that
looked like flip bugs are authentic (MAME draws them identically). The real
fault was general 68000 cycle accounting -- see [[m68k-icount-cycles]] -- which
also moved ghouls, sf2, sf2ce, gauntlet and rampage. All five were verified
against real MAME before their goldens were re-recorded (sf2, sf2ce and ghouls
are 0 differing pixels; gauntlet <=1.1%; rampage 0 at 300/1800). **53/53
real-ROM contracts pass.**

mslug's remaining honest gaps, all reported by its runtime report: `ctrl1`/
`ctrl2` NEOGEO_CONTROL_PORT, `edge` NEOGEO_CTRL_EDGE_CONNECTOR, `memcard`
NG_MEMCARD and `upd4990a` UPD4990A are blocked lowerings. Inputs and the RTC
TP/data pins still reach the game through generated port bindings and
`execution.customs`, so it boots, coins, starts and plays. Residual: ~1 frame
of lead over MAME appearing at the end of the BIOS RAM test.

**mslug contract gotchas:** a ten-frame coin tap is silently dropped -- the MVS
BIOS needs ~30 frames to sample the edge. Starting a credit opens Metal Slug's
own HOW TO PLAY tutorial, and a joystick press dismisses it, so the first
movement action doubles as the skip; Mission 1 only begins ~600 frames later.

**2026-08-27, issue #92 (arkanoid, rygar, wboy). All three are re-enabled;
56/56 real-ROM contracts pass.** None of the three faults was game-specific:

- **rygar** "no player sprite" — the sprite GFXDECODE belongs to TECMO_SPRITE,
  a `device_gfx_interface` device, and only `GFXDECODE(...)` devices were
  lowered. See [[device-owned-gfxdecode]] and [[device-delegate-config]].
  Its issue-#53 "squares off screen at boot" is authentic: **0 differing pixels
  vs real MAME** at 5 of 6 sampled attract frames, including that boot frame.
  The contract's start press was simply too early — the title reaches
  "PUSH ONLY 1PLAYER BUTTON" around frame 600.
- **wboy** "about 10 fps" — its direct renderer was silently disabled by a
  type guard; see [[direct-screen-shape-guards]]. 5.8 -> 95 fps and **0
  differing pixels vs real MAME** at all 5 sampled frames.
- **arkanoid** "rounds advance without input" — its MCU was never executed; a
  hardcoded PC-keyed shim answered for it. See [[arkanoid-mcu-live]] and
  [[device-handler-namespace]]. The boot HARDWARE CHECK is now pixel-identical
  to MAME and the game coins, starts and plays.

Watch out: arkanoid's `pcmHash` differs run to run **when another acceptance
process is running concurrently** (its video/state/writeHash/rms are stable).
Record its golden with nothing else running.

**2026-08-31, issue #108 (the eleven parked targets).** Four re-enabled after a
no-input attract diff against real MAME 0.289: **gberet** (0/53760 differing
pixels at frames 200 and 600), **trackfld** (0/57344 at 600), **upndown**
(0/114688 at 600, ROT270) and **polepos** (390/57344 = 0.68% at 600, all inside
x 242..254 / y 193..222 — one zoomed sprite beside the CREDIT counter that
`polepos_v.cpp zoom_sprite` draws and we do not). Three of the eleven could not
even be generated on main; see [[cpu-header-comment-trap]] and
[[mame-listxml-port-audit]] for the five compiler fixes that unblocked them.

Still disabled, with measured stopping points now in their module headers:
- **outrun** — composition will not construct: 14 unresolved `pcm.voice_*`
  handlers plus five missing Sega device families.
- **qbert** — attract is correct at 430 fps; the coin reaches IN1 on the bus
  (0x40 -> 0x44), vblank NMI fires every frame, DSW now matches MAME, the CPU
  takes a one-frame excursion to 0xC8F8 and credits nothing. Needs an
  instruction-level I8088 diff.
- **spyhunt** — attract is correct at 50 fps; the coin reaches `ssio:IP0`
  (0xff -> 0xfe) with `m_ports` bound; the SSIO does not credit it.
- **rtype** — V30 spins at CS:IP 3F00:0837 with IF clear from frame 9, video
  RAM and both palettes stay zero, sound Z80 stops at PC 0 after ~557k cycles
  despite its program being uploaded (port 02 reset line or the PIC handshake).
- **simpsons, tmnt** — black throughout; K052109/K051960/K053246/K053260/
  K007232 are still generation gaps.
- **sinistar** — `WILLIAMS_BLITTER_SC1` is a generation gap so the bitmap is
  never written; noise frozen at frame 71. **Its recorded golden dates from
  that broken state and PASSES acceptance** — a golden blessing a dead game.

**Pre-existing golden drift on main at 957f4ae (2026-08-31).** Ten enabled
targets fail acceptance on main's own dist, before any change: frogger, gyruss,
junofrst, pooyan, rocnrope, scramble, timeplt, tutankhm, venture, wboy. In every
case every checkpoint's `video` hash still matches and only `state` plus the
audio fingerprints moved, so it is timing drift the goldens were never
re-recorded for. sf2/sf2ce hit the known native crash on both trees. Baseline
any sweep failure against main's dist before calling it a regression.
