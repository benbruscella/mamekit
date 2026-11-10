---
name: z80ctc-daisy-181
description: "#181: Z80 CTC compiled from MAME with zero replaceMethod; seven silent general gaps (device arrays, mconfig config, owner finder, child clock 0, reset order, namespace const, daisy chain); Rampage 2.4x closer to MAME"
metadata:
  node_type: memory
  type: project
  originSessionId: f92ee792-41d7-41e5-aa2c-2512d6eb6f4c
  modified: 2026-10-26T01:42:38.944Z
---

2026-10-26, branch `181-1-generate-the-z80-ctc-from-mame`. compileMameDevice on
Z80CTC already had **0 diagnostics** — every gap was runtime/IR, all silent:
- `required_device_array<T,N>` children: `children[].tags` from the finder
  format (`"ch%u", 0U`), member holds an array of handles.
- `device_add_mconfig` run once at generation per child stand-in
  (`configureChildren` in device-compiler) -> `children[].configured`
  (`m_index = ch`).
- child handle exposes members (non-enumerable getters), not just methods.
- `DEVICE_SELF_OWNER` finder -> tag `^` -> `options.owner`; `self.clock()` /
  `clocks_to_attotime` on every device self (`m_device->clocks_to_attotime(16)`).
- child with no clock arg = clock 0 (MAME; only DERIVED_CLOCK inherits).
- reset order: device_reset, children, device_reset_after_children,
  interface_post_reset (MAME device_t::reset).
- column-0 `const uint8_t Z80_DAISY_INT = 0x01;` was never a constant.

Daisy chain: `z80DaisyChain()` in cpu-compiler compiles z80daisy.cpp's walkers
into the Z80; `m_chain` is a `link` member (emitted as #private accessor, out of
save states). KG resolves `set_daisy_config(table)` (table may be in another
family file, mcr_m.cpp) -> `execution.cpus[].daisyChain`; board
`linkDaisyChain` sets m_daisy_next (non-enumerable on device self) + m_chain.
cpu-codegen: call through a pointer-typed local now emitted (was silent 0).

Oracle (no input): Rampage MAME offset -2 -> +0, RAM mean/frame 394.6 -> 161.4;
Spy Hunter unchanged (3,044 RAM bytes from frame 48, 480x480 vs MAME 480x500,
silent attract — all pre-existing, not CTC).

**Trap:** a framework accessor put on a device `self` must never replace a
compiled method of the same name. `self.clock = () => clock` overwrote ymfm's
`fm_engine_base::clock(chanmask)` and the VRC7 OPLL rendered all zeros; only
ymfm-opll.spec caught it. Use `self.x ??= ...`.

Debug recipe that found the gaps: register the compiled definition, createDevice,
install `globalThis.mamekitMissingCall`, and dump child members after each write.
Related: [[unresolved-call-census-178]], [[m68705-generated-176]], [[codegen-silent-zero]].
