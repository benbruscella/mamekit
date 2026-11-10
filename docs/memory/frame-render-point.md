---
name: frame-render-point
description: "Frame-mode screen_update must run at vbstart (MAME's instant), not end-of-frame — fixed Berzerk's torn player sprite; shifts most goldens by one frame"
metadata: 
  node_type: memory
  type: project
  originSessionId: 07afc189-1d46-4696-a6fb-e06868efcf42
  modified: 2026-08-20T06:35:51.733Z
---

`GeneratedFrameLoop.frame()` (src/runtime/generated-frame.ts) used to present
frame-mode video AFTER all `vtotal` scanlines. MAME's screen device calls
`screen_update` at the **start of VBLANK** (`vbstart`), so we sampled the
framebuffer N scanlines late (Berzerk: 6 lines, vbstart 256 / vtotal 262).

**Why it matters:** a game that erases-then-redraws sprites inside its VBLANK
handler gets sampled *between* the two halves. Berzerk's player (drawn by the
loop at PC 0x3781: `EX AF,AF'` / `LD A,(HL)` / `LD (IY+0),A` / `INC IY` /
`EX AF,AF'` / `LD (HL),A` / `INC HL` / `DJNZ`, 5 rows x 2 cols) had 3 of its 5
colorram rows still holding the erased value 0x33 instead of 0xaa, so most of
the sprite rendered olive-on-black and looked like a fragment.

**Fix:** render inside the scanline loop when `line === screen.vbstart`, with an
end-of-frame fallback for boards whose vbstart is outside the line range
(asteroid has vbstart 1183 / vtotal 300).

**Verified against real MAME 0.288:** berzerk pixel-perfect (mean diff 0.0) at 7
gameplay frames, was 29-30 wrong px; pacman still pixel-perfect; mario still
pixel-perfect but its content now matches real frame 598 instead of 599.

**Expect goldens to shift by ~1 frame of content** for frame-mode and
partial-mode targets (~57 of 65; scanline-mode targets are unaffected). That is
a phase change, not a regression — confirm with a real-MAME frame-range match
(compare our frame N against real N-2..N+2) before assuming damage.
Don't re-record goldens for [[known-broken-targets]].

Ground-truth recipe used here, beyond [[mame-reference-capture]]: Lua ioport
presses must be re-asserted EVERY frame (`f:set_value(...)` in the frame
notifier) — setting only on the rising/falling edge gets overwritten by MAME's
input poll and the coin never registers. Berzerk's coin/start live on
`:SYSTEM` as "Coin 1" / "1 Player Start".
