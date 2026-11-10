---
name: port-condition-controls
description: PORT_CONDITION selects which controller's fields are live; ignoring it gave coleco a contradictory control legend
metadata:
  type: feedback
---

Fixed 2026-08-28 after the user called the ColecoVision control legend
"bollox": it offered "purple action button" and "steer left" alongside the
standard pad, with `Z` and `Space/X` each listed twice meaning two different
things — and no keypad digits, so no game could be started.

**Why:** MAME hangs alternate controllers off the SAME ports as the standard
one and marks every field with `PORT_CONDITION("CTRLSEL", mask, EQUALS, value)`
naming the selector setting it belongs to. coleco.cpp's `PORT_CONFNAME(0x07,
0x00, "Port 1 Controller")` defaults to the standard pad. The generator ignored
the condition and bound the Super Action, Driving and Roller controllers all at
once.

**How to apply:**
- `fieldConditionHolds` (src/gen/generate.ts) evaluates the condition against
  configuration-switch defaults. Those must be collected in a PRE-PASS: MAME
  declares the selector wherever it likes and coleco.cpp puts CTRLSEL *last*,
  after every field that depends on it.
- `IPT_KEYPAD` binds by LABEL, not IPT type — all twelve keys share one type.
  Beware `\b` in a label regex: it never matches after `#` or `*`, which
  silently dropped two of the twelve keys.
- Only the first keypad gets keyboard keys; a ColecoVision has two pads with
  identical keys and one keyboard cannot press "1" on one without the other.

Verified: zero of the 56 arcade targets changed a single binding, so this is
safe to extend. Donkey Kong and Venture both start from a keypad press.
