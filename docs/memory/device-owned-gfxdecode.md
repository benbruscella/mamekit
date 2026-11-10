---
name: device-owned-gfxdecode
description: "A device_gfx_interface device owns its own GFXDECODE table and answers its own gfx(n); missing that lowering makes it draw nothing (Rygar sprites)"
metadata:
  type: project
---

`GFXDECODE(config, m_gfxdecode, m_palette, gfx_x)` is not the only owner of a
decode table. Any `device_gfx_interface` device takes its palette and table
through the *same constructor shape*:

    TECMO_SPRITE(config, m_sprgen, m_palette, gfx_tecmo_spr);

MAME then answers that device's `gfx(0)` from its own table, not from the
driver's `m_gfxdecode`. Before 2026-08-27 the parser only set `gfxDecodeName`
for `type === 'GFXDECODE'`, so Rygar's sprite region never reached the video
plan and `tecmo_spr_device::draw_sprites_8bit` drew nothing at all — the game
ran, scrolled and played with no player and no enemies.

The lowering is three linked pieces, all shape-based, none naming a device:
1. `src/kg/parse.ts` — a device's trailing argument that names a
   `GFXDECODE_START` table in source becomes its `gfxDecodeName`.
2. `src/mame/video-compiler.ts` `compileDecodeBindings` — a DECODES edge whose
   device is not a GFXDECODE still gets a `{decodeMember, paletteMember}` from
   its config line, so the entries carry `decodeMember: 'm_sprgen'`.
3. `src/runtime/generated-board.ts` — binds `gfx` on that device to
   `primitives.gfxForDecodeMember(member)`, because the device's own code calls
   a bare `gfx(n)`.

**How to apply:** a generated device that draws nothing, with its method
present in `methodNames()` and its handler compiled, is usually missing its
gfx set rather than missing its call.

Related: the same device also needed [[device-delegate-config]] for its
`set_pri_callback`, and its `layout[8][8]` tile order needed 2-D file-scope
`static const` tables in the device compiler.
