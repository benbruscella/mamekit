---
name: mame-oracle-tool
description: "#170: tools/mame-oracle.ts replaces every scratch MAME comparison; four MAME command-line/Lua traps it encodes; first NES survey 248/344 exact"
metadata:
  node_type: memory
  type: project
  originSessionId: bb6f9c22-a036-4bd8-a560-4dd6b323f5c7
  modified: 2026-10-22T10:54:48.242Z
---

`tools/mame-oracle.ts` (#170, built 2026-10-22) is THE way to compare with
MAME now: pictures, `--ram`, `--io`, `--survey`, and `--input none|start|contract`.
Don't write scratch Lua comparisons any more; extend `tools/oracle/oracle.lua`.

Traps it encodes (each cost time on 2026-10-22):
- `screen:pixels()` in a frame notifier returns the frame BEFORE (MAME swaps
  bitmaps in update_quads first); use `video:snapshot_pixels()` (rotated).
- Slot options must precede the title: `-exp intf2 spectrum_cart:jetpac`
  works, the other order says the software doesn't exist.
- A bare `c64_quik:brklmts` mounts NOTHING; name the switch (`-quik`, `-cart`,
  `-cass`, `-flop`). Bare `list:name` only happened to work for cart/cass.
- Our TitleStart can type later than the shelf delay (it waits for a
  quickload), so MAME gets the frame ours actually typed on (harness
  `onTitleStart`).
- Old mame-ram-oracle offsets were ours-relative (its "-1" = MAME frame =
  ours + 1); `ram.nearest` reproduces its numbers (gberet 16/25/19).

Results 2026-10-22: NES survey 248/344 boards pixel-exact at 1500;
Bio Miracle now exact (was 41k px in #167); cvania3u differs from frame 120;
vrc7 needs ds1001.zip (missing from .data). Results ship as dist
`oracle.json` (src/gen/oracle-result.ts), refreshed post-cache.
Related: [[mame-reference-capture]], [[mame-window-flag]], [[cold-nvram-boot-divergence]].
