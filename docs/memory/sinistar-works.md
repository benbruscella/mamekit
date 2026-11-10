---
name: sinistar-works
description: "#113 solved: Sinistar plays. The blitter was never the problem — the cold-CMOS operator menu is authentic, and IPT_AD_STICK (the 49-way stick) was never bound at all."
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-12T08:48:06.005Z
---

2026-09-12. Sinistar boots, runs attract, coins, starts, flies, fires and
scrolls; its sound board went from 4 sound writes to ~65,000. Nothing about
the diagnosis in issue #113 held up.

**"FACTORY SETTINGS RESTORED" is authentic.** Real MAME 0.289 run with an
empty `-nvram_directory` sits on that exact screen at frame 12000 too. The
MAME runs that appeared to reach attract were reading an nvram MAME had
written on a previous exit — [[cold-nvram-boot-divergence]] exactly, and I
walked into it before checking. The board is in its **operator menu waiting
for the Advance button** (IN2 bit 1, `IPT_SERVICE`, bound to F2). Press it and
the game runs. Any Williams board on a cold CMOS behaves this way, so an
acceptance contract for one has to press Advance.

**The ship had no controls.** Movement is `IPT_AD_STICK_X` / `IPT_AD_STICK_Y`
— MAME's *absolute* analog stick, `PORT_MINMAX(0x00,0x6f)` centred at 0x38,
converted to IN0's eight bits by `port_0_49way_r` through a 7-entry
`translate49` table. The binding generator only ever handled the *relative*
`IPT_DIAL` and `IPT_TRACKBALL_X/Y`, so both 49-way ports existed with their
centre value and nothing could move them. Now emitted as two `activeValue`
bindings per axis (full deflection while held, and `apply()` already restores
the port's own init on release, which is what autocentre is). `PORT_REVERSE`
decides which key reaches which end — Sinistar reverses Y. Verified against
MAME's table: centre 0x77, left 0x07, right 0x87, up 0x78, down 0x70.
**Blast radius is sinistar alone** — it is the only shipped target using
AD_STICK.

`WILLIAMS_BLITTER_SC1` is no longer a gap; the only one left is
`cvsd:HC55516` (speech), and the game plays without it.

Three general fixes were needed first, all shipped and all found by chasing
the sound board: a templated `TIMER_CALLBACK_MEMBER` had its `template <...>`
line ignored by the AST (so `deferred_snd_cmd_w<2>` kept `m_pia[A]`
unresolved); the KG's specialization regex only matched a single-parameter
template, so `A=2` never became a constant; and
`machine().scheduler().synchronize()` ran its callback **inline** rather than
deferring it past the running CPU's slice — which delivered the first sound
command before the sound CPU had configured CB1's active edge, latching the
line high so no later command could ever produce an edge.

**Why:** two of the three things the issue blamed were either authentic
behaviour or a missing *input* binding, not missing hardware.
**How to apply:** before blaming emulation on a Williams board, clear MAME's
nvram and check the reference actually boots cold; and when a game "does
nothing", check the contract's controls exist at all —
`config.json` bindings for every analog port, not just the digital ones.
See [[disabled-four-status]] and [[port-condition-controls]].
