---
name: mame-listxml-port-audit
description: "MAME's -listxml is ground truth for every port's power-on value; the PORT_* defval rule that four drivers spell four different ways"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 267f507f-5979-48ba-bf29-dc13cd60c3bc
  modified: 2026-08-31T04:55:06.696Z
---

`mame -listxml <game>` prints every `<dipswitch>`/`<configuration>` with its
`tag`, `mask` and the `<dipvalue default="yes">`. OR those together per tag and
you have MAME's own power-on byte for each port, which diffs directly against
the generated `dist/games/<cat>/<game>/config.json` `ports[].init`. That audit
over the whole shelf on 2026-08-31 went 49/61 -> 59/61 machines matching, and
is the cheapest way to catch a silently wrong port default. It only covers
dipswitch/configuration fields — `PORT_BIT` defaults are absent from listxml,
so do not treat a listxml-derived port value as the whole byte.

**The rule the parser now follows.** Every `PORT_BIT(_mask, _default, _type)`
and the whole `PORT_DIPUNUSED`/`PORT_DIPUNKNOWN` family (both with and without
`_DIPLOC`, all lowering to `ioport_configurer::onoff_alloc`) pass
`field_alloc`'s **defval** as the second argument. It is a value, not a
polarity flag, and four drivers in one MAME tree spell it four ways:

| driver | writes | means |
|---|---|---|
| konami | `PORT_DIPUNUSED_DIPLOC(0x20, 0x20, …)` | bits set |
| gottlieb | `PORT_DIPUNUSED_DIPLOC(0x20, 0x00, …)` | bits clear |
| namco | `PORT_DIPUNUSED_DIPLOC(0x04, IP_ACTIVE_LOW, …)` | 0xffffffff & mask = set |
| tecmo | `PORT_DIPUNUSED_DIPLOC(0x01, IP_ACTIVE_HIGH, …)` | 0 = clear |

`IP_ACTIVE_LOW` is `0xffffffff` and `IP_ACTIVE_HIGH` is `0` (ioport.h) — read
them as constants, never as a polarity token. For an analog `PORT_BIT` the
defval is a real resting position inside the travel: Spy Hunter's wheel is
`0x74` inside `PORT_MINMAX(0x34,0xb4)`, Sinistar's 49-way stick `0x38`.
Defaulting those to zero pins the control at one end from the first frame.

Ground-truth scripts live in the #108 session scratchpad pattern: parse the
listxml, rebuild each port, diff against `config.json`. Requires the real MAME
binary ([[mame-reference-capture]]), so it cannot be a build gate.
