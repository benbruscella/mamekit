---
name: direct-screen-removal-240
description: "#240 item 22/20 — general gaps exposed once hand-written screen shapes/atarimo were deleted and MAME's own screen_update ran"
metadata:
  node_type: memory
  type: project
  originSessionId: e4e6f132-9e50-49c2-bac6-07e6745af23e
  modified: 2026-11-08T10:28:17.586Z
---

Deleting DIRECT_SCREEN_SHAPES + GeneratedMotionObjects (2026-11-08) exposed these general compiler/runtime gaps, each a silent "draws wrong" with state hashes still matching:

- Overloaded driver methods were keyed by name, one survived (taitosj copy_layer 5/6 params → draw_sprites never ran). Now `name__aN` handlers (ast.ts overloadsInHierarchy/lowerOverloadedCalls; CALL_METHOD tries `leaf__a<argc>`).
- Struct-method tables (generated-device STRUCT_METHODS) also collapsed overloads → atarimo sprite_parameter::set recursed. structOverloads picks by argumentFits.
- Unqualified member struct type resolved to a global of the same name (emumem `entry` vs atari_motion_objects_config::entry). Scope to declaring class first.
- Driver constructor bodies never ran (sega_16bit_common_base → palette_init; shinobi palette all black). driverConstructorCalls → startHandlers first.
- `&ptrSlot[i]->pix(y)` looked up `pix&` on the pointer wrapper → one pixel, not a row (system1 bg blank). Deref first, interpreter AND emitter.
- `palette.pen(n)` is identity on bitmap_ind16 screens, RGB only on rgb32 (MAME allocate_color_tables). popeye sprites were black.
- File-scope `rgb_t(...)`/`rgb_t::black()` tables weren't lowered by static-aggregate → vicdual all black.
- Board codegen scope lacked videoExecution.bitmapMembers + video.regionBindings + memregion/ioport chains → whole renderers interpreted (venture 11 fps, wboy 5 fps).

**Why:** a renderer that "runs" with diagnostics [] can still draw nothing; see [[silent-mislowering]], [[codegen-interpreter-parity]].
**How to apply:** when a shape removal regresses, oracle the frame, then recompute the expected pixel from live state in an inspectFrame probe to split "inputs wrong" from "mixer wrong".
