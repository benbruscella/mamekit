---
name: ask-before-mame-sweeps
description: Ask before starting a full MAME baseline record or any multi-job MAME sweep in the background; the user objected strongly when one started unannounced
metadata:
  node_type: memory
  type: feedback
  originSessionId: 1f617197-fae9-4f33-8801-f89e0f5dd4d8
  modified: 2026-10-29T08:03:04.817Z
---

On 2026-10-29 I started `tools/mame-baseline.ts record --jobs 4` (a full 90-target baseline, four MAME processes at a time) in the background. I mentioned it only in passing, and the user reacted angrily ("what the fuck is running mame in the background"). I stopped it.

**Why:** a full sweep runs several MAME instances at once on the user's machine for 10–20+ minutes, and they notice it (CPU, fans, processes). A one-line mention inside a long status message isn't consent.

**How to apply:** before any full baseline record, survey or multi-target MAME sweep, ask first. Say what it does, how many MAME processes it runs, and how long it takes. One-off oracle runs of one or two targets are fine without asking. Related: [[dont-wipe-served-dist]], [[mame-window-flag]], [[mame-baseline-204]].
