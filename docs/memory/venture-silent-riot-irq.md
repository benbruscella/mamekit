---
name: venture-silent-riot-irq
description: Issue #63 — venture silent because the RIOT's m_ie_timer reads 0 at every timer expiry; unexplained, plus the ASSERT_LINE constants fix
metadata:
  type: project
---

**Issue #63 (venture, no sound) is NOT fixed as of 2026-08-22.** One real bug was
found and fixed on the way; the remaining fault is localised but unexplained.

**Fixed: generated devices could never assert an interrupt line.**
`ASSERT_LINE`/`CLEAR_LINE`/`HOLD_LINE` live in MAME's `src/emu/diexec.h`, but
`numericConstants()` in `src/mame/device-compiler.ts` only reads a device's own
sources, so `state = ASSERT_LINE` lowered to an undefined read (0). `coreLineStates()`
now lowers the `line_state` enum from MAME. 23 devices gained the constants; 6
actually use them: mos6532, pia6821, namco_06xx/51xx/53xx/54xx. Games that can
change behaviour: defender, digdug, galaga, qix, rampage, venture.

**Still broken and unexplained.** Instrumented run:
- `timer_on_w` 866,439 calls, `m_ie_timer == 1` after *every one*
- `timer_end` 5,788 expiries, `m_ie_timer == 0` at *every one*
- `timer_off_w` 2, `device_reset` 1 — nowhere near enough to clear it
- same device instance throughout (tagged and confirmed)

`update_irq` gates on `m_ie_timer && m_irq_timer`, so the RIOT calls
`m_irq_cb(0)` forever, the ANY_HIGH merger stays low, the audio CPU never takes
an IRQ, never runs its service routine, never writes the 6840 -> silence.

**Ruled out with evidence** (each reverted, regenerated, re-run): the digdug
devcb fixes (#57) and the gyruss audio fixes (#59). Also verified *correct*:
the lowered address map (incl. the `.m()` RIOT submaps), the deliberately
crossed PIA devcb wiring, the `cpu-line` IRQ effect, the merger's `in_w_0`
change-detect, `timer_w`'s `m_ie_timer = ie`, and the emitted JS for all of it.

**Method lesson.** I called four of those broken and was wrong each time, from
reading JSON fields I assumed existed (`target` vs `tag`, a `method` on a
`cpu-line` effect, "0 KB" from rounding, and `maps` — the KG dump — instead of
`execution.cpus[].ranges`, the lowered map). Instrument and count; do not infer
from artifact shape. See [[frugal-blast-radius]].

Note `src/gen/runtime-certification.ts` lists venture's PIA and RIOT handlers as
tolerated `handlerGaps`, so this never tripped a gate.
