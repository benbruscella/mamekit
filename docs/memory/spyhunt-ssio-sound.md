---
name: spyhunt-ssio-sound
description: "Spy Hunter's silence was three stacked compiler faults in Midway's SSIO: clock() in device_add_mconfig, m_cpu on a map-reached handler, and a device_start that never ran"
metadata:
  type: project
---

2026-09-13. `peak=0.0000 rms=NaN` -> `peak=0.2664 rms=0.0268 nonSilent=44.3%`.
`rms=NaN` with `peak=0.0000` is the tell: NaN loses every comparison, so a NaN
sample reads as silence. Three independent faults, each general:

**1. `clock()` inside a class's own `device_add_mconfig` is the *configured
device's* clock, not a sub-device's.** `midway_ssio_device` derives both its Z80
(`DERIVED_CLOCK(1, 2*4)`) and that Z80's periodic /SINT
(`clock() / (2*16*10)`) from the board's 16 MHz (a constructor **default
argument** in the header: `uint32_t clock = 16'000'000`). `kg/build.ts` passed
`dev.clock` — the Z80's 2 MHz — so `periodHz` came out 6250 instead of 50000 and
the whole sound engine ran 8x slow. Fixed by resolving `clock()` against the
class being configured (`ownerClocks[cfg.cls] ?? defaultClocks[cfg.cls]`).
Survey first: `spyhunt` was the **only** shipped target with `clock()` in a
period expression (`grep` every board.json's `set_periodic_int` callbacks).

**2. `m_cpu` in a device handler reached through an *address map* was not scoped
to that device's CPU.** The callback path already scoped it
(`generatedCpuMemberBindings`); the map path did not. So
`midway_ssio_device::irq_clear` — a read whose entire job is
`m_cpu->set_input_line(0, CLEAR_LINE)` — could not drop /SINT, and the sound Z80
spent its whole life re-entering its own ISR: 546,786 entries in 900 frames,
~11 instructions each, never reaching the main loop. More than one class on a
board can declare `m_cpu` (Spy Hunter has both an SSIO and a Cheap Squeak
Deluxe), so resolve it from the owning class's own hosted CPU.

**3. A board-level device's `device_start` never ran.** The SSIO reads its
82S123 duty-cycle PROM there to build `m_ayvolume_lookup`, and *every*
`set_output_gain` it ever writes indexes that table — unstarted, the array was
undefined, `Number(undefined)` was NaN, and NaN gains poisoned the mixer.
`memregion("proms")` in a device handler also has to resolve device-relative
(`ssio:proms`).

**The trap in fix 3:** lowering `device_start` for *every* board device is too
broad — see [[device-start-scope]].

**Diagnosis recipe that worked:** histogram the sound CPU's PC by wrapping
`cpu.step`, *while `board.frame()` runs* — sampling PC once per frame told me
nothing, and stepping the CPU by hand outside `board.frame()` produced a bogus
"stuck in ISR" reading because the periodic interrupt generator was not being
clocked. Then read the ROM bytes at the hot PCs and hand-disassemble: 0x38 is
the Z80 IM1 vector, so a hot 0x38-0x47 with a matching hot main-loop address is
"the IRQ is never acknowledged".
