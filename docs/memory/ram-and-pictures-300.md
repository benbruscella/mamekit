---
name: ram-and-pictures-300
description: "#300 (branch 300-ram-and-pictures): oracle address shift, MC6845 reset_origin re-base, soft reset keeps time, held CPUs run last; what each fixed"
metadata:
  node_type: memory
  type: project
  originSessionId: 0bf6619a-ff43-4160-8467-7062c36df23e
  modified: 2026-11-26T01:01:00.220Z
---

#300 (started 2026-11-26) works the 27 scenarios still off MAME, family by family. Re-measured on main `c65e14e9` with fresh gen:all: identical to the issue's tables (`.mamekit/compare/against-c65e14e90746/`).

Findings, each generic:

1. **Oracle address shift.** MAME's Lua accessors and taps take the space's own units: TMS34010 is bit-addressed (`space.shift` 3), TMS32010 word-addressed (-1). `oracle.lua` now converts (`to_address`/`to_byte`, RAM via `read_range(first<<s, ((last+1)<<s)-1, 8, 1<<s)`, since read_range sizes its buffer `(last-first+1)/step`). `ours.ts` converts a core space's addresses back to bytes. mk/nbajam's "frame-1 RAM difference" was the tool: both are RAM-identical over 2,400 frames. Changing oracle.lua code invalidates the whole MAME cache.
2. **MC6845 `reset_origin`.** `has_screen` resolves to 1 (unconfigured video interface = first screen). `GeneratedFrameRunner.resetOrigin` moves `frameBase` to the CRTC's grid; line labels keep their numbers, only times move. The loop jumps only when the beam's new line is past the line it is on (rounds spanning lines leave the loop ahead of machine time). Compute on the frame `now` falls in: the device clock leads the loop by up to a round, so a wrap lands in the next frame. The board shifts `timedHardwareDelivered` by how far its current line's start moved. Qix none: RAM-identical; wardner first diff 1 → 114.
3. **Soft reset keeps time.** `board.reset()` = MAME soft_reset: devices/CPUs reset, runner `softReset()` keeps clock and beam, re-arms periodic events a period from now, frame count restarts (the harness counts frames from it). Restarting the clock had the CRTC's self-re-arming timer on the old epoch. Qix contract: RAM-identical on 900 frames (reset at 150).
4. **Held CPUs run last.** CPU processors report `suspended: 'eating'` when held (RESET/HALT); `roundOrder` puts them after active ones, as `rebuild_execute_list`. Wardner's halted Z80 had eaten to the round's end before its DSP's synchronized release; first diff 114 → 410.

5. **Whole-cycle pull for a synchronizing processor.** MAME's `if (m_localtime < target) target = max(m_localtime, m_basetime)` applies to every device run, synchronized or not; ours skipped it for a synchronizing one that ran out its slice. Wardner 410 → 1930.
6. **vblank() is unrounded time.** `inVblank()` (screen host, custom PORT_READ_LINE vblank bits) reads the beam unrounded; vpos's half-pixel rounding dropped Wardner's VBLANK bit one poll early. Wardner RAM-identical over 3,600 frames.

7. **Synchronized work's timer lead.** Work posted by the timer-clock CPU runs at drain, devices at the round's end (past the post time); `armLead` returned 0 for that poster, so a timer armed there (06xx NMI re-arm) counted down from round end: 2 Z80 cycles late for good. Now takes the generic lead. digdug/xevious RAM-identical 2,400 frames; galaga 721→1288, polepos 246→329 (closed by 8–10). Only 22 targets compose `synchronize()` (`grep -l synchronize -r dist/games`): a cheap blast radius for scheduler-sync changes.

8. **devcb defaults from the constructor** (`devcbDefault` in device-compiler.ts): the second constructor arg, e.g. z8002 `m_iack_in(*this, 0xffff)`; was guessed 0xff/0. ~60 moved, mostly to 0 (i8255, Z80 PIO, PIA ports).
9. **Valued set_inputline** (`delivery` hold/assert/clear from the emitter's `*_LINE` regex): acts only when data is set, no synchronize otherwise (polepos LS259 Q0 `CLEAR_LINE).invert()`). `pulse` is NOT valued: it is the lowering's name for the MSM5205 VCK NMI, whose falling edge must still synchronize. Including it moved kungfum and congo sound.
10. **Hosted MCU reset synchronized** (host `reset` signal → `model.resetHeld`): galaga's 54xx started 37 MCU cycles early. galaga/polepos RAM-identical 2,400 frames.

Tooling: `--io cpu:data:a-b` taps a data space (hosted MCU via `hostedCalls().space(1)`).

Speed floors: the MC6845 with a screen runs MAME's line/HSYNC/DE timers every scanline; qix CI 68→78 s (15.6 fps), floor lowered 16→14 (90% rule). `roundOrder` asks suspended() once/round. gunsmoke's 42 floor sits at CI's measurement; a slow runner fails it, and a rerun passed. To attribute a CI speed drop, grep the `PASS <game> (Ns)` durations across `gh run view --job` logs per commit.

CI goldens: after this PR's fixes, simpsons robotron ladybug cavenger joust bublbobl qix wardner ddragon nbajam moved by design; reset contracts (joust/robotron/qix) show +14–23% sound writes from soft reset, within MAME tolerance.

Tooling notes: `against --runtime <commit>` overlays use the current tree's `unresolved-calls.ts`, so removing an entry breaks main's runtime there (temporarily restore it). `diverge` can't time-compare across a reset when our clock restarted (fixed by 3).

Related: [[mame-scheduler-synchronize]], [[held-cpu-eats-cycles]], [[gauntlet-296]], [[mamekit-compare-commands]].
