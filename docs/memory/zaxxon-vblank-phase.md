---
name: zaxxon-vblank-phase
description: "Zaxxon's residual after #70: our board runs one vblank ahead of MAME, so its attract demo diverges from frame ~354 (rendering itself is pixel-exact)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6a4114d9-85e2-4644-8285-79c03ef311f0
  modified: 2026-08-23T09:15:29.545Z
---

Issue #70 (fixed 2026-08-23) left one characterized residual. Zaxxon's video
path is pixel-exact against real MAME 0.288 for attract frames 1–352 (0 px
diff, no input on either side), then the *demo* diverges: from ~frame 354 our
run plays an explosion MAME does not, settling into a constant 704-px delta at
frames 420 and 600.

It is **not** a rendering bug — proven three ways:
- the bg tilemap pixmap is byte-identical to a from-ROM reference (1 MB, 0 diff);
- a Python port of MAME's `draw_background` matches MAME's own frame to 25 px
  and our frame in the same box;
- `m_bg_position`/`m_bg_color`/`m_bg_enable`/`m_flip_screen` match MAME exactly,
  while `spriteram` (0xa000–0xa0ff) differs in 23 bytes.

Main RAM (0x6000–0x6fff) already differs at frame 300, before any pixel does:
- `0x600d` and `0x62b7` are per-frame down-counters and ours reads **exactly
  one lower** at every sampled frame → our board is one vblank ahead of MAME at
  the same frame index. (Caveat: MAME's `add_machine_frame_notifier` and our
  `inspectFrame` may not sample at the same instant, so confirm the phase before
  chasing a cause.)
- `0x6418` (MAME 08 / ours 00) and `0x6be2` (MAME 00 / ours 15) are persistent
  demo object state, not counters.

**Why:** a one-frame phase error is invisible on a static attract screen and
only shows once the demo makes collision decisions, so it can hide for hundreds
of frames behind a picture that matches perfectly.
**How to apply:** treat it as a CPU/interrupt-timing question, not a video one;
a fix there moves the frame phase for every target, so expect goldens to shift
([[frame-render-point]]). Reproduce with the frame-exact recipe in
[[mame-reference-capture]].
