---
name: musashi-prefetch-slapstic
description: "MAME's 68010 is still Musashi with a prefetch queue; skipping the PC+2 prefetch reads desynced Marble's slapstic bank state (#93)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-15T08:05:23.750Z
---

MAME 0.289's `M68010` is `m68000_musashi_device` (m68kcpu.h), whose `m68ki_read_imm_16/32` re-read the word after every one handed out (`m_pref_addr`/`m_pref_data`). MAME's `M68000` is the different microcoded `m68000_device`. Our compiler hand-writes the imm readers in `m68000SupportMethods`; since 2026-09-15 the 68010 variant carries `prefetch: true` and lowers the queue, the 68000 stays as it was.

Why it mattered: the Atari slapstic taps every address the CPU touches (`install_readwrite_tap` over the whole space), so the extra prefetch reads advance its state machine. Without them Marble Madness read the same banked ROM address (0x81F01) with different results at different times, a height buffer diverged, a binary search at 0x1abd4 never terminated and the watchdog tripped at frame ~346. With it, main RAM is 1 byte from MAME at frame 900.

**How to apply:** when a board with a slapstic (or any access-sequence tap) drifts, suspect *accesses the core doesn't make*, not data. Diagnosis recipe that found it: `tools/mame-ram-oracle.ts --keep` for the first divergent frame → MAME debugger `trace file,:maincpu,noloop,{tracelog "D0=%08X ...",d0,...}` vs a per-step register dump of ours → first register mismatch → the instruction that read it. Clear `.cache/cpu/m68010` before `--build-runtime` or the old core is served ([[gen-cache-masks-breaks]]). Related: [[mame-scheduler-synchronize]].
