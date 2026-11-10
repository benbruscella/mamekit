---
name: device-children-and-delegates
description: "Three framework gaps found chasing Atari 2600 DPC support: device_add_mconfig children, memory-handler delegates, and child timers — plus what is still wrong with Pitfall II"
metadata:
  node_type: memory
  type: project
---

Landed 2026-08-31 while trying to support Pitfall II's DPC cartridge. All three
are general MAME-framework gaps, not 2600 work, and each failed silently.

1. **`device_add_mconfig` children were never compiled.** A device built out of
   other devices (`ATARI_DPC(config, m_dpc)`) left its `required_device` member
   unresolved, so every call through it answered 0. `GeneratedDeviceDefinition`
   now carries `children[]`, compiled recursively (guarded by a `compiling`
   set) and instantiated by `IrDevice` before `device_start`, bound to the
   finder member as a method proxy — the same shape as the slot-card proxy.
2. **Memory-handler delegates evaluated to a number.** `install_read_handler(
   lo, hi, read8sm_delegate(m_dpc, FUNC(dpc_device::read)))` recorded a handler
   with nothing callable behind it and the range was dropped. `memoryDelegate`
   in `execute.ts` now resolves `*_delegate(target, FUNC(cls::method))` to a
   bound closure; the target is whichever argument is not the FUNC, so it works
   for `*this` and for another device. **This was not 2600-specific: the F8
   bank-switch WRITE handler had been silently dropped on every F8 cartridge**
   — those games worked only because the read tap also switches banks.
3. **`IrDevice.tick` advanced only its own timers.** Nested devices never ran.
   It now recurses into `children` and `slotChild`. The DPC's 18400 Hz
   oscillator drives its random-number and music counters.

**Cost trap, and it bit immediately:** `indexMameHardware` reads every file
under `src/devices` and `src/mame` -- **20.8 s for 7368 device types** -- and
had no cache. Calling it from inside `compileMameDevice` to resolve children
meant one full-tree scan per device that declares a `device_add_mconfig`, and
the closure build visibly crawled. It is now memoized per checkout (0 ms on
every call after the first); the whole closure build is ~50 s. Anything called
during device compilation has to be assumed hot.

**Cart-board coverage** went 1393/1459 -> 1410/1459 of the user's dumps
(95.5% -> 96.6%) by enabling a26_3f, a26_ua, a26_fv, a26_8in1, each verified by
booting a real dump and checking the picture keeps changing.

**Still wrong, deliberately left disabled:**
- **a26_dpc** — Pitfall II now boots and animates, and the DPC is addressed and
  clocked, but the screen is **11,740 of 39,248 pixels (30%) off MAME** and it
  freezes after Reset. Not shipped; a board that half-works is worse than one
  that says it does not.
- **a26_dc** — worked *before* the delegate fix (megaboy animated) and is a
  black screen after it. A handler that now installs is probably shadowing the
  bank, which points at **install precedence**: MAME's later `install_*`
  replaces the earlier mapping over an overlapping range, and our `ranges`
  array is append-only. Worth checking before trusting any board that installs
  overlapping regions.
- **a26_e0** (24 dumps, the biggest single win left) and **a26_cm** boot to a
  black screen; **a26_e7/a26_3e** need `install_view`, which the board does not
  replay at all.

**How to apply:** `npm run test:unit`, `audit:generated` and a 14-game
acceptance sample all pass, so the three fixes are safe. Verify a cart board by
booting a real dump and counting distinct frame hashes — `boot=1/120` means a
frozen picture, not a working board ([[a2600-milestone]]).
