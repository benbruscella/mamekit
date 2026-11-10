---
name: analog-controls-unbound
description: "Absolute analog controls (IPT_AD_STICK, IPT_PADDLE) were never bound, and the shared key map stops at BUTTON3 — two silent ways a game ships with no controls"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-12T09:03:17.944Z
---

Two games in #142 looked like emulation failures and were missing *inputs*.
Both faults are silent: the port exists in `config.json` with its power-on
value, nothing binds it, and the game simply never responds.

**1. Only *relative* analog controls were bound.** The generator handled
`IPT_DIAL` and `IPT_TRACKBALL_X/Y` (two `relativeDelta` bindings each) and
nothing else. MAME's *absolute* analog types were dropped entirely:
- `IPT_AD_STICK_X` / `IPT_AD_STICK_Y` — Sinistar's 49-way stick
- `IPT_PADDLE` / `IPT_PADDLE_V` — Spy Hunter's and Out Run's steering wheel

These are now two `activeValue` bindings per axis carrying MAME's
`PORT_KEYDELTA`, and `KeyboardInput.rampAnalog()` travels the port toward the
target by that much **per frame** -- never jumping. The first cut snapped
straight to the extreme and back, which made Spy Hunter's wheel undrivable;
MAME ramps, so a wheel takes ~6 frames from centre to full lock and springs
back over the same. `apply()` leaves a ramped control alone entirely; `latch()`
snaps it, for probes that read the port back immediately. The extremes come from `PORT_MINMAX`, and
`PORT_REVERSE` decides which key reaches which end (Sinistar reverses Y).
`IPT_PEDAL` is on this path too, and it ramps like the rest: Spy Hunter's
throttle is `PORT_MINMAX(0x30,0xff) PORT_KEYDELTA(10)`, about 21 frames from
idle to the floor, and snapping it made the car undrivable. The first cut
exempted pedals to protect Pole Position's golden -- that was protecting a
golden, not matching MAME. Only two shipped games have a pedal at all (polepos,
spyhunt); polepos is identical through frame 900 and moves one checkpoint at
1200, exactly what a throttle that takes 9 frames to reach `0x90` at
`PORT_KEYDELTA(16)` should do. Re-recorded.
Direction suffixes (`IPT_AD_STICK_X_LEFT`, `IPT_PADDLE_RIGHT`, …) also go in
`gamepad.ts` so a pad binds by type.

**2. `KEYMAP` stops at `IPT_BUTTON3`,** and the generator *drops any input it
cannot key*. Spy Hunter's panel is five weapon switches: oil slick
(`BUTTON4`), smoke screen (`BUTTON5`) and **machine guns (`BUTTON6`, the
primary weapon)** all vanished. Fixed with a `GAME_KEYMAP.spyhunt` entry —
the same shape as the existing `CPS1_SIX_BUTTON` override for Street
Fighter's kick row, which is the same bug found once before (issue #82).

**How to verify a machine's controls, cheaply:** press each key, then
`input.latch()` and read the port back; compare against MAME's `PORT_BIT`
mask and polarity. Spy Hunter rest `IP1=0x9f` → machine guns `0x8f`,
missiles `0x9d`, oil slick `0x9e`, smoke `0x97`; wheel `0x74` → `0x34`/`0xb4`.
Sinistar's stick, through MAME's own `translate49` table: centre `0x77`, left
`0x07`, right `0x87`, up `0x78`, down `0x70`.

**Why:** a missing binding reads exactly like broken emulation, and neither
issue (#113, #114) suspected inputs.
**How to apply:** when a game "does nothing", diff `config.json` bindings
against the driver's `INPUT_PORTS_START` block *before* touching emulation —
every analog port and every button number, not just the ones the shared map
happens to know. A probe must also call `input.advance()` each frame like
`acceptance-harness` does, or no press reaches the CPU at all.
See [[sinistar-works]] and [[disabled-four-status]].
