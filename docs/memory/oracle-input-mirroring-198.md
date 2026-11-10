---
name: oracle-input-mirroring-198
description: "#198: oracle mirrors analog VALUES into MAME; four MAME 0.289 Lua/ioport traps (autoboot reruns on reset, whole-port override, toggle frame lag, reverse = ~x) and the per-frame input read-back"
metadata:
  node_type: memory
  type: project
  originSessionId: 2bbb9038-2498-4d78-a926-d5672b36d688
  modified: 2026-10-26T21:40:28.222Z
---

#198 (2026-10-26, uncommitted on branch 198-0b-...): `--input contract` now runs
every contract. Analog controls (pedal/paddle/stick/dial/trackball/light gun)
are given to MAME as the value our port read each frame (`InputRecorder` in
tools/oracle/plan.ts); toggles stay press/release. Every run now logs both
sides' port bits per frame and reports `inputs (...): MAME read what ours read`.
Check that line FIRST before blaming emulation for a picture difference.

MAME 0.289 traps found from ioport.cpp / mame.cpp:
- **Autoboot script reruns after EVERY machine reset** (contract reset or
  watchdog): mame_machine_manager::reset re-arms the autoboot timer. oracle.lua
  starts with `if oracle then return end`; without it frames restart at 0 and
  captures truncate. Any ad-hoc Lua script hits this too (it explains
  "machine.time 1500 s at frame 1" in a bare test).
- `analog_field::read` with set_value does `result = m_adjoverride` — the WHOLE
  port, unshifted. oracle.lua refuses an analog field that shares its port.
- The analog override is read immediately; digital set_value waits for the next
  ioport frame update; a PORT_TOGGLE flip is folded (update_defvalue) one update
  later still (ours now lags it too). So shifts: press/toggle -1 notifier, analog set 0.
- PORT_REVERSE on a relative field maps x -> ~x (rests at mask), ours -x (rests 0).

Follow-ups, done 2026-10-27 on the same branch:
- KeyboardInput now lags toggle flips a frame (MAME-exact); PORT_REVERSE relative
  fields start at their mask (lower-inputs reversedRest); IPT_DIAL honours reverse.
- **board.reset() rewinds our frame counter to 0** and the harness re-runs its
  full length with later actions relative to it; MAME's count does not reset.
  The oracle now counts frames itself — the "Williams reset divergence" was this;
  joust/robotron are pixel-exact through the reset.
- **START overrides in a called base config were ignored** (kg/build.ts read only
  cfg.raw): spyhunt's video_start_spyhunt (16-px shift) and 7 machines with no
  video start at all. `composedConfigRaw` splices called configs; the timer scan
  starts from the override; VIDEO_START_CALL_MEMBER(x) -> video_start_x().
- Centipede ~3k px = POKEY RANDOM from the hand-written src/hardware/pokey front
  end (per-read, MAME per-clock): needs a generated POKEY register side; own issue.
The oracle passes `-snapview native` (Spy Hunter's lamp layout).
Related: [[mame-oracle-tool]], [[analog-controls-unbound]], [[frame-boundary-input]].
