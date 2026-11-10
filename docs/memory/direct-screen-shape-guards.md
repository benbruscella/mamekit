---
name: direct-screen-shape-guards
description: "A generatedDirectScreenShape fast path that fails its own type guard falls back to the interpreter SILENTLY — Wonder Boy ran at 6 fps with no background"
metadata:
  type: feedback
---

`generatedDirectScreenShape()` selects a direct renderer in
`src/runtime/generated-video.ts`, and each one re-checks the members it needs.
A failed check just `return false`s, so the board quietly runs the interpreted
`screen_update` instead. There is no report, no diagnostic and no audit entry.

Wonder Boy selected `system1-prom-mixer` correctly, then failed on
`Array.isArray(mixCollide) && Array.isArray(spriteCollide)`: the plan's initial
state declares those as plain arrays but `video_start`'s
`make_unique_clear<u8[]>` replaces them with a `Uint8Array`. Result: **5.8 fps
with an all-black background**, which looks like an emulation bug and is not.
Accepting either shape restored 95 fps and 0 differing pixels vs real MAME.

**How to apply:** when a board with a direct shape is slow or renders a layer
missing, log the guard before investigating the emulation. Write guards against
"is it a list of numbers" (`ArrayBuffer.isView(v) || Array.isArray(v)`), never
against one concrete container.

Also in that renderer: MAME's `(s16)(raw + 28)` and its `/ 2` truncating toward
zero are both load-bearing — `Math.floor` steps an extra pixel on every
negative odd value.
