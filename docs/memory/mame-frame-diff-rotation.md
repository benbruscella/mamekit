---
name: mame-frame-diff-rotation
description: "Diffing our framebuffer against a MAME snapshot: ours is native, MAME's is rotated; which rotation and which frame offset each ROT class needs"
metadata:
  type: reference
---

Extends the recipe in [[mame-reference-capture]]. `MAMEKIT_CAPTURE_FRAME` writes
the **native, unrotated** framebuffer as PPM; MAME's `video:snapshot()` writes
the **rotated, presented** image. So a size mismatch is expected and the diff
must rotate ours first. Measured (PIL `Image.rotate(angle, expand=True)`, which
rotates counter-clockwise):

| driver rotation | rotate ours by |
|---|---|
| ROT270 (mrdo) | 90 |
| ROT90 (congo, mspacman, pacman) | 270 |

Frame numbering does not always line up: our frame N is sometimes MAME frame
N-1. Sweep `SNAPFRAME` over a few frames and take the minimum rather than
assuming N.

Results on 2026-08-26 for the three games added for issue #87, no input, attract
mode: **mrdo 0 differing pixels** at 600 (and 0 differing VRAM bytes),
**mspacman 0** at our 600 vs MAME 599, **congo 0** at 60/120/180/240 and ~3.2%
from ~300 on — that residual is animated-demo sprite phase, since the score,
HUD and background still match exactly and only moving objects differ.

A VRAM dump (Lua `space:read_u8` over the video RAM window) beside the pixel
diff is what splits a CPU divergence from a render bug — if VRAM differs, stop
looking at the renderer.
