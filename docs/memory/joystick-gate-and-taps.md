---
name: joystick-gate-and-taps
description: "#144: PORT_nWAY was parsed but never lowered, so 4-way games read diagonals as horizontal; a tap inside one frame's batch cancels itself in advance()"
metadata:
  type: project
---

Two separate input gaps, both found only once someone played on a real arcade stick (a keyboard almost never makes a diagonal, and a keyboard tap is long).

**1. The gate the lever moves inside.** `PORT_4WAY` reached the knowledge graph's field `modifiers` and stopped there — no `FieldBinding` field, no `config.json`, nothing in `src/runtime/input.ts`. MAME's rule is `digital_joystick::frame_update` in `src/emu/ioport.cpp`, run once per lever per frame, and `ioport_field::frame_update` reads `current4way()` only when `m_way == 4` (and skips the restriction entirely at 16). The lever a switch belongs to and which switch it is are arithmetic on the IPT enum: number `(type - (IPT_DIGITAL_JOYSTICK_FIRST + 1)) / 4`, direction the remainder, order UP, DOWN, LEFT, RIGHT, sticks JOYSTICK, JOYSTICKRIGHT, JOYSTICKLEFT. 19 of the generated machines declare 4; several (gyruss, robotron, tmnt, mslug) declare nothing at all, which MAME treats as 8 — that is not a parser gap, check the driver before chasing one.

**2. The tap.** Polling faster was *not* the fix. Both edges were already posted; they cancelled inside `advance()` because a down and an up in the same batch settle in order and the field ends released. The poll rate only widens the window (the browser refreshes the pad snapshot once per animation tick, so per-emulated-frame polling re-read the same snapshot during a catch-up).

**Why:** a 4-way game reads left+up as horizontal, so the player walks past the ladder they are trying to climb. Both bugs are invisible to every Node golden: the acceptance harness holds a key for whole frames and never presses two perpendicular directions (only spyhunt holds two arrows, and its stick is a pedal and a paddle, so no golden moved).

**How to apply:** joystick direction fields are now settled in `settleSticks()` at the frame boundary, not at edge time — so SOCD had to move there too and needs a press-order stamp to keep newest-wins. MAMEKIT keeps newest-wins where MAME zeroes both opposites; that is deliberate, because a keyboard rolls one arrow onto the other routinely. A wholesale `release` event must cancel the tap carry or a lost focus leaves a control stuck on.

**3. A real stick does not behave like a cabinet lever, and that took three rounds of the user's own `?debug=1` logs to see.** The gate landed correct and the game still fought back. Two follow-ons, both host-side departures from MAME and both commented as such:

- *The corner from rest.* MAME resolves a diagonal by favouring the direction that just changed; when nothing changed first it always picks horizontal, and its own comment says why it can afford to (rare with a keyboard). With a lever it is the normal way into a corner, so up-left from centre gave left and held it. Now the lever follows which way it is leaning: `activeControls` posts the stronger axis second and the gate reads that generically as "arrived later". Nothing downstream learns what an axis is.
- *The bounce.* A switch reported open for one sample and closed again makes the returning switch look like a new direction, so a corner held perfectly still flips axes and flips back. **Filter it at the pad, in polls, not in `input.ts` in emulated frames** — I got this wrong first and it cost a round trip: the noise is the pad's sampling, and a 60.606Hz board against a 60Hz display makes one missed sample straddle two emulated frames, so a frame-counted window stops recognising it. A direction absent from one poll is not believed until a second agrees. It costs a poll of lateness on release, so pay it only where a flip loses the machine: gate it on `ways === 4` from the binding. Trap: clear the grace from what the pad *reported*, never from the believed set, or a direction kept alive by its own grace clears the grace keeping it and never releases.

**A trap of my own making:** polling the pad in both `tick()` and `stepFrames()` is two `getGamepads()` calls per tick, and Chrome resamples between them, so one switch can be down in the first and up in the second. Poll once per tick; `stepFrames` polls only under `qaDrive`.

**Diagnostics are part of the fix here.** The dev server's trailing-slash redirect dropped the query string, so `?debug=1` silently turned itself off. The gate logged its decision every frame, burying the edges under a thousand identical lines; log only when the answer changes. And an edge-time port dump cannot show the edge yet (input settles at the frame boundary), which reads as a press that did nothing in the very log meant to find presses that did nothing.

Related: [[frame-boundary-input]], [[analog-controls-unbound]], [[port-condition-controls]], [[acceptance-run-flake]].
