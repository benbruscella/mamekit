---
name: cold-nvram-boot-divergence
description: A MAME reference run with a reused -nvram_directory boots differently from our always-cold harness; wipe it per run or you chase a phantom 48-frame gap
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a06aeec6-3d2e-4d44-9e7b-6c762b7a4541
  modified: 2026-08-27T00:36:55.781Z
---

MAME **writes** nvram back to `-nvram_directory` when it exits, so the second
and every later reference run of the same game boots warm. The acceptance
harness always boots cold.

On mslug (2026-08-27) that made the MVS BIOS skip its destructive test of the
0xd00000 backup RAM entirely -- MAME left the logo screen on frame 708, we left
it on frame 756 -- and the 48-frame "divergence" was pure capture artifact. A
fresh `-nvram_directory` per run put both at frame 277.

**Why:** the difference looks exactly like an emulation timing bug, and the
routine it points at (a memory-test loop) is plausible enough to burn an hour
disassembling.

**How to apply:** `rm -rf` the nvram directory inside the MAME wrapper script
itself, not once by hand, so a multi-frame capture loop cannot silently reuse
it. Same rule for `-cfg_directory` when input remapping is in play. Extends
[[mame-reference-capture]]; the same trap is noted in
[[sixteen-bit-bank-window]].
