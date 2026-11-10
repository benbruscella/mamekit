---
name: mame-framework-runtime-gaps
description: "Getting one 2600 cart on screen took nine MAME-framework gaps, each silent and each general — the pattern for diagnosing \"it runs but draws nothing\""
metadata: 
  node_type: memory
  type: project
  originSessionId: fb7744c5-8dc2-43e6-b818-44fc02029876
  modified: 2026-08-28T08:35:39.314Z
---

Booting the first Atari 2600 cartridge (2026-08-28) needed no 2600-specific
code. Every blocker was a MAME framework surface the runtime modelled wrongly or
not at all, and every one failed *silently* — the machine ran, and drew nothing.

**The chain, in the order it unblocked, as a diagnostic order for next time:**

1. **A cart that installs itself.** A 2600 cartridge is in no address map: it
   runs `install_memory_handlers(address_space *)` when mounted, and banks
   switch through **read taps**. `src/runtime/address-space-install.ts` records
   what MAME's own installer asks for; the board replays it.
2. **Device submaps.** `map(...).m("riot", FUNC(mos6532_device::io_map))` was
   ignored and the window lowered to `nop`. Expanded in `kg/build.ts` by reading
   the `.cpp` beside each included header. Also revived Defender's blitter and
   Double Dragon's bank device — and changed venture ([[a2600-milestone]]).
3. **Device clocks lost between the two graph walks.** `generate.ts` and
   `emit-machine.ts` walk devices separately; only the first resolved the
   state-class crystal, so every device in BoardIR clocked at 1 Hz and the RIOT
   timer never expired. Shared in `src/gen/class-constants.ts`.
4. **`screen().width()`** was not a host service (only vpos/hpos/height/
   frame_number/time_until_pos), so the TIA allocated 0-wide bitmaps. MAME's
   screen dimensions are the WHOLE raster; `htotal` had to be added to the IR.
   The screen object handed to a device screen_update also lacked `height()`.
5. **`set_pen_color(pen, r, g, b)`** — MAME's four-argument overload was read as
   `(pen, rgb_t)` in BOTH the interpreter and the emitter, storing the red byte
   as the whole colour. Pen 0 became transparent black.
6. **`pow` was unbound**, along with the rest of the C math set. The TIA gamma-
   corrects all 128 base pens with `pow(R, 0.9)`; an unbound call answered zero
   and the entire palette came out black.
7. **`rgb_t` channel accessors** (`.r()/.g()/.b()`) on a packed number, which
   `extend_palette` needs for the 16k blend table — needed in interpreter AND
   emitter, which have separate call paths.
8. **`bitmap_ind16`/`ind8`, bitmap arrays, and `memory_bank_creator` members**
   all resolved to `0`. No scanline buffers, and no ROM window on any
   bank-switch cart.
9. **`struct player_gfx p0gfx;`** — the member scanner required MAME's `m_`
   convention and did not handle elaborated type specifiers. That made `drawS0`
   unemittable, which pruned `update_bitmap` (the hot path) into the
   interpreter. Fixing it plus address-of on struct members took the console
   **from 10 fps to 73**.

**Why:** "runs but draws nothing" is almost never the CPU. Walk the picture
backwards — framebuffer, then the device's own bitmap, then its palette, then
the values it composes — and check each framework call the source makes is
actually bound. A host call that answers 0 looks exactly like hardware that
does.

**How to apply:** the cheap probe is a Node script that creates the board from
`dist`, runs frames, then reads `device.members` and `device.executionContext.
palette` directly; `Device.bindCall` stubs a suspect host call to see whether it
is reached and what it answers. Widening a member or codegen rule is safe to
land only after diffing the member sets of every device type before and after —
two of 47 changed, both gaining state they should always have had.
