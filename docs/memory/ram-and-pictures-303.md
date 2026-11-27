---
name: ram-and-pictures-303
description: "#303 (branch 303-ram-and-pictures-still-off-mame): diverge --list/--around, hosted-processor taps, and the scheduler rules that closed wboy, matmania, elevator to 892"
metadata:
  node_type: memory
  type: project
  originSessionId: a2db6e3d-fa2b-4b33-a9d7-486bb53745c7
  modified: 2026-11-27T10:19:26.853Z
---

#303 continues [[ram-and-pictures-300]]. Commits "303 1".."303 4" are the user's; work after 303 4 (2026-11-27) is soft reset as synchronize, periodic re-arm on soft reset, and hosted taps.

**Tooling (use these first):**
- `mamekit diverge <t> --frames a-b --io cpu:lo-hi:rw --list all|<cpu> --around N` pairs every access with both times.
- The access logs stay in `.cache/compare/diverge/<t>/`.
- A processor a device hosts is tapped by its device path (`bmcu:mcu`, not the finder's `mcu:mcu`).
- Device-space taps mask addresses to the space's width; the 68705 reads its vector at 0xfffa, which decodes as 0x7fa.
- The `cycles` column is blank for hosted processors, because diverge's clocks come from the board's CPUs only.

**Rules learned, each MAME's:**
- `synchronize()` outside a slice drains only the work due by now (wboy).
- Posted work bounds a round on its exact attotime (wboy).
- NMI edges are dropped only in RESET, not HALT/WAIT (wboy contract; ours lowers Z80 WAIT as `halt`).
- `vblank()` = time < end set when the begin fired (matmania).
- `schedule_soft_reset` is a zero-delay timer, plus a periodic re-arm from the reset (elevator's watchdog at frame 131).
- Offset trap: `against` chose `-1` for elevator from a still picture. Pin `--offset 0` when RAM and pictures disagree.

**Open:**
- ddragon frame 1058: the main IRQ lands one 6309 instruction early.
- elevator frame 893: the MCU sits out by 1.7 fs inside the perfect-quantum window.
- Both need MAME's scheduler state, which the oracle doesn't record. [[mame-scheduler-synchronize]]
