---
name: mame-window-flag
description: "MAME oracle runs use SDL_VIDEO_DRIVER=dummy so no window or cursor grab; a one-off run on the user's Mac needs that plus -window -nomaximize -video none -sound none"
metadata:
  node_type: memory
  type: feedback
  originSessionId: bb6f9c22-a036-4bd8-a560-4dd6b323f5c7
  modified: 2026-10-31T09:30:00.000Z
---

Any MAME run on the user's Mac: `SDL_VIDEO_DRIVER=dummy` plus `-window -nomaximize -video none -sound none`.

**Why:** without `-window`, MAME 0.289 took over the screen even under `-video none` ("can you make this tool not take over my laptop???", 2026-10-22, #170). With `-window` it still stole the cursor (2026-10-31, #220): SDL3's Cocoa video gives each process a 54x54 window. The dummy driver opens none. `compare dkong marble` under it was `same` on every measure, input and analog included.

**How to apply:** `tools/oracle/mame-side.ts` `mameEnvironment` bakes it in (not under `--watch`); use it for hand-run Lua traces too. `nice -n 10` is the polite default for CPU; `taskpolicy -b` (E-cores) is ~6x slower, so only opt-in. Related: [[mame-reference-capture]], [[cold-nvram-boot-divergence]].
