---
name: sdsp-silence-gaps
description: "#174 S-DSP was silent from three stacked general gaps: devcb offset dropped, space() with no arg, const pointers into file-scope tables"
metadata:
  type: project
---

The SNES S-DSP rendered -80 dBFS until three general fixes (2026-11-17):
1. A board `device-method` effect handed an `(offs_t offset, data)` target offset 0 always; a devcb_write8 carries its own offset (S-SMP `$F2`/`$F3` -> `dsp_io_w(offset-2, data)`), now passed through from the listener's source args (generated-board.ts deviceMethod).
2. `space()` with no argument is `space(0)`; `Number(undefined)` left `space().cache(m_cache)` unbound (generated-device.ts).
3. `static const int *const G4 = &gauss[0];` lowers as table + offset (`TABLE((off)+(i), ...)`, device-compiler constantTables). MAME itself reads `G2[vl]`/`G4[-vl-1]` past its 520-entry table (UB); TABLE's modulo wrap measured close to MAME's binary.

**Why:** each one alone still left silence, and `diagnostics: []` never flagged any ([[silent-mislowering]]).
**How to apply:** for a silent chip, probe in order: are its registers written (callback args), does it read its sample RAM (space binding), do its file-scope tables resolve. `mamekit levels <target> --alone` is the check.
