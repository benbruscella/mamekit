---
name: gameboy-294
description: "Game Boy #294: slot is self-mounting (softlist part -> regions, MAME call_load); namespace free functions/constants; views a card installs; what each silent gap was"
metadata:
  node_type: memory
  type: project
  originSessionId: 3481c670-8f20-4782-a2d0-6bacf7fe2635
  modified: 2026-11-24T00:09:19.291Z
---

Issue #294, branch `294-most-game-boy-cartridges`, 2026-11-24. `sml2` (MBC1 +
nvram) and `pokered` (MBC3) boot and match MAME 0.289; `gameboy:sml2` is a
contract scenario (6 frames pixel-exact, RAM-exact over 1800 frames).

**The slot is self-mounting now** (`src/gen/self-mounting-slots.ts`), like the
NES and SNES. The old host model hard-wired `loaded_through_softlist = 0` and
dropped `call_load`/`load_image_file`/`allocate_cart_ram`, so no `ram`/`nvram`
region could exist. Now: a software part's dataareas become regions
`<slot tag>:<area>` in `openImage` (image devices only), the slot's own
`call_load` runs inside `installSlotCard` (it needs the CPU space, so it is
NOT run at device start when `slot.install.space` is set), and a file goes
through MAME's `load_image_file`. `CART_SLOT_SUPPORT.gameboy` is gone; a board
with a method that does not lower is `slot.unsupported` (only `rom_camera`).

**Compiler gaps, all general:**
- A header of namespace inline functions with no `.cpp` (`cartheader.h`), or a
  library whose namespace is only *read* (`gbxfile::trailer`), joins the
  sources in `helperLibrarySources`.
- Nested-namespace constants get qualified keys (`cartheader::TYPE_MBC1` = 1,
  `gbxfile::TYPE_MBC1` = FourCC); free functions bind under the qualified call
  spelling AND bare (gbslot.cpp's helpers sit in `namespace bus::gameboy {
  namespace {`). I broke the bare binding once: check both.
- `namespaceStringConstants`: `extern char const *const` in a header, text in
  the sibling .cpp (`slotoptions::GB_MBC1`), via the string-macro expansion.
- A `.cpp`-declared device follows the same-directory header declaring its
  base (`mbc2.cpp` -> `cartbase.h`); MBC2/TAMA5 had no base class before.
- `member.owner`: `m_slot(dynamic_cast<T *>(device.owner()))`.
- execution-source: `return *p == x;` was read as a pointer declaration;
  `std::advance`; nothrow array `new`; C++14 digit separators (`0x10'0000`).
- A template's iterator parameter is `auto *` when the body dereferences it,
  or emitted code compares pointers as numbers and loops forever.
- `unresolvedNamespaceNames`: a `ns::NAME` whose namespace an included header
  declares and nothing answers is a compile diagnostic (the user asked for
  this error). It caught `slotoptions::*` the first time it ran.

**Runtime:** a view a card installs into the CPU space is bus ranges tagged
`cartridge:<tag>:view<n>`; `DeviceMemoryView.select/disable` call
`InstalledView.select` -> `bus.selectView`. `install_ram` windows are
writable (`entry.writable`); they were recorded read-only.

**Still open:** `machine().disable_side_effects` (known gap); `--survey` of
the other boards was not run (needs the user's OK, [[ask-before-mame-sweeps]]).

Related: [[gameboy-milestone]], [[cart-battery-saves]], [[codegen-silent-zero]],
[[hung-run-js-stack]].
