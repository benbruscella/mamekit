---
name: gameboy-blank-screen
description: "Game Boy #102: eleven compiler gaps between 'runs' and 'draws' — memory_view, machine().time, object-like register macros, 64-bit literals, container accessors — and how each was found"
metadata:
  node_type: memory
  type: project
---

2026-09-01. The Game Boy compiled, executed and showed nothing. Eleven
separate source-derived gaps stood between "runs" and "plays". The list is
worth keeping because most are *general* compiler capabilities, not Game
Boy quirks, and the next console will hit a subset.

1. **MAME `memory_view`.** `space.install_view(a, b, m_view)` plus
   `m_view[0].install_read_handler(...)` were invisible to
   `parseInstalledHandlers`. The Bus already models views (`viewTag`/
   `viewEntry`, used by Williams boards); only the parse and a `disable()`
   binding were missing. Without it the cartridge owned 0x0000 from
   power-on and the DMG never ran its own boot ROM.
2. **Driver `region_ptr` finders reached the runtime only via a video
   plan.** A console whose picture comes from a device has none, so
   `m_region_boot` was unbound and `boot_r` answered 0. Now emitted on
   `execution.regionBindings` too.
3. **`attotime_to_cycles` unbound on a CPU** -> every device interval read
   as zero; LY never left line 0.
4. **`machine().time()` answered the frame counter.** It is the
   scheduler's clock; it now comes from the *running* CPU's total cycles
   minus the timer backlog. This is what fixed venture's RIOT IRQ (#63)
   and what a Namco 06xx needs to align its NMI to a falling clock edge.
5. **Object-like register macros** (`#define CURLINE m_vid_regs[0x04]`,
   `#define JOYPAD m_gb_io[0x00]`). Distinct from the function-like case
   in [[statement-macro-expansion]]: the body is a postfix chain rooted at
   a member, so it is a pure alias and MUST expand, on the device side AND
   the driver side (kg/build's `handlerProps`). Unexpanded, LY was counted
   and never published, and the joypad register was never written so every
   button read as held.
6. **A CPU is a device.** `m_maincpu->set_ie(data)` went nowhere; the
   generated core's lowered methods are now registered as board calls.
7. **64-bit literals.** `plane * 0x0101010101010101U` is meaningless in a
   double. Literals wider than 2^53 now keep exact digits (`wide` on the
   number expression) and promote their expression through BigInt, in the
   interpreter and via `runtime.wide(...)` in emitted code.
8. **Container accessors.** `m_vram.get()` on a `unique_ptr<u8[]>`
   resolved interpreted but emitted `0` -> every tile fetched from
   address 0.
9. **`register_screen_bitmap` unbound** -> a full picture plotted into a
   0x0 bitmap.

**How to find these.** Walk the picture backwards, one observable at a
time, and never trust an inference: PC in a loop -> which loop (disassemble
the boot ROM) -> which register it polls -> read that register -> read the
device member behind it. Two traps cost real time: (a) a proxy on
`device.members` does NOT see writes the interpreter makes through a
captured reference, so poll the raw object instead; (b) a method you assume
is interpreted may be *emitted* — take `new Error().stack` inside a wrapped
leaf (bitmap `pix=`) to find out which engine is actually running it.

See [[mame-framework-runtime-gaps]] for the same exercise on the 2600.
