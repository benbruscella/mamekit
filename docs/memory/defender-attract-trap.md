---
name: defender-attract-trap
description: Defender needs ~6 spaced Start presses to leave attract; a token that only coins+starts once silently tests the demo loop
metadata:
  type: project
---

**Defender does not start on one Start press.** A coin lights `CREDITS: 1` and
the machine stays in attract — screenshotting frame 1216 showed the SCANNER
banner and a demo ship, not gameplay. Six Start presses spaced ~120 frames apart
are what put a ship in play (~frame 1750). Its token used a single `Digit1` at
frame 800, so every "gameplay" action after it was driving the **attract loop**:
the video hash was byte-identical with and without the button presses.

**A moving screen is not a running game.** Attract animates, so "the hash
changed" proves nothing. The test that works is an A/B from an identical start
with an identical frame budget: press the key in one run, idle the same number
of frames in the other, compare. Defender's Reverse and Thrust each produced a
distinct hash against idle; in attract they had produced none.

Fixed 2026-08-21 (issue #61): schedule rewritten to reach real gameplay, and the
golden now diverges only *after* the Reverse press (cp 1600 identical, 1880 /
1980 / 2100 all differ) — so it actually catches the binding disappearing.

Watch for the same trap in other tokens: a game that needs an unusual attract
exit will quietly grade its demo loop. See [[frugal-blast-radius]] for deriving
which games a shared-keymap change can reach.
