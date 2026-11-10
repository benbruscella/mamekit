---
name: declared-member-widths
description: "modern MAME's in-class initializers hid every driver/device member from memberDeclarations; giving driver state its declared widths is what gave the Game Boy music"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b896811-b929-4032-8912-a008d3064819
  modified: 2026-09-02T02:11:10.077Z
---

Fixed 2026-09-02 on `102-add-support-for-gameboy-console`.

**`memberDeclarations` (src/mame/device-compiler.ts) required a member's `;` to
follow its declarator**, so every member written the modern MAME way was
invisible: `uint8_t m_gb_io[0x10]{};` and `uint16_t m_divcount = 0;`. The whole
Game Boy driver state read as a class with *no members at all*. Every pattern
now admits an in-class initializer. This affects devices too — check what a
device's member list gained before blaming anything else for a behaviour change.

Nothing then carried widths to the **board**: a driver's state object holds
whatever a handler wrote, at whatever a JS `+` produced. `m_gb_io[5] += 1`
counted TIMECNT past 255 and never returned to zero — the one event that raises
the Game Boy's timer interrupt, which is what a GB music driver runs on. Games
drew perfectly and played silence. `m_divcount` ran unbounded beside it, so the
divider compared a masked old value against an unmasked new one and fired the
timer increment 11.5M times where MAME fires it ~200k.

Driver state widths now travel as `BoardIr.stateMembers` (name/bits/signed/
arrayLength), collected in `src/kg/build.ts` from the **root** machine config's
class hierarchy only (a device's `device_add_mconfig` is a MachineConfig node
too, and its members are the device's, not the board's).

**Two traps, both found by the acceptance sweep, both worth remembering:**

1. **Do not seed the state object.** Driver members are materialised on first
   touch by design — an identifier that is not yet an own property resolves as
   a *symbolic reference* (`execute.ts` `member()` / `compileFastExpression`),
   which is how a member a later pass binds stays unresolved instead of
   freezing at zero. Pre-defining all 17 of pacman_state's stopped
   `video_start` setting `m_xoffsethack`, and Crush Roller's first two sprites
   lost their one-pixel offset — **video hashes moved from frame 600 while CPU
   state and audio stayed byte-identical**. The widths are a `set`-trap Proxy
   on the state object instead; arrays are allocated typed at the existing lazy
   allocation site (`writableMember` / `writableIndexObject`).

2. **A negative into an unsigned member is left alone.** MAME's
   `INPUT_LINE_NMI` is 64 and lives in a `uint8_t` happily (ddragon keeps
   `uint8_t m_sprite_irq = INPUT_LINE_NMI`), but this compiler lowers the input
   line constants to negative tokens of its own (NMI -1, RESET -2, HALT -3).
   Narrowing one to 8 bits sent the sprite IRQ to line 255: **Double Dragon
   booted to an empty screen with no sound.** The real fix would be lowering
   those constants to MAME's actual values, which touches every CPU compiler.

**How to apply:** a state-identical + video-changed acceptance failure after a
member-model change means presence/absence of a member, not its value. Bisect
by disabling the binding in `dist/runtime/core/generated-board.js` and re-running
the one game; then log which member's write sequence differs.
See [[struct-field-widths]], [[pointer-member-types]], [[codegen-silent-zero]].
