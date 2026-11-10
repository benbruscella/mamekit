---
name: nes-184-part3
description: "#184 (2026-10-24): MAME origin board-wide (user approved), 6502 reset as instruction, timer catch-up/lookahead/backlog rules, arg conversion, ctor shadow members, line-239 via remaining() at present; NES survey 272->314 exact; card inputDefaults; strict catch-up delivery; oracle --io time column + RAM at presentation"
metadata:
  node_type: memory
  type: project
  originSessionId: ff25136a-0b3c-4fb2-b87a-ec43ac0079c5
  modified: 2026-10-24T08:59:52.184Z
---

Branch 184-finish-the-nes-part-3, 2026-10-24 (uncommitted at time of writing).

Section 2 (g101/jf24/tqrom) all pixel-exact vs MAME; found with the oracle's
new `--io` time column (MAME: `machine.time:as_double()` in the tap = CPU
local time; `device.clock` is nil in 0.289 Lua). General fixes:
- 6502 `resetInstruction`: MAME's device_reset only sets STATE_RESET; the .lst
  reset (7 cycles, $FFFC/D reads) runs as the first step. Specs updated.
- MAME origin (`origin: 'vbstart'`, lead-in pass, nothing fires on origin
  line) — USER CHOSE ALL BOARDS; every golden re-records. gberet RAM 16/25/19
  -> 0/0/1 (with RAM-at-present), pacman offset -1 -> 0.
- 6502 timer rules: catch-up lag 0 before every device read/write (registry
  path too — PPU is mapped straight into the bus registry, bypassing calls[]);
  2-cycle lookahead before each instruction (MAME's prefetch() suspends between
  the opcode read and prefetch_end's poll => poll sees t < k+2).
- Settle zeroes timerCpuCarriedCycles in follow mode (OAM DMA overrun was paid
  twice: 2C02 264 cycles ahead).
- IrTimer.adjust credits timerBacklogSeconds; board brackets deliveries
  (begin/endGeneratedTimerDelivery) — unbracketed device.tick (specs) must not skip.
- Beam read inside a delivery uses deliveredSliceCycles.
- CPU method args converted to declared C types (set_l uint8_t: PLA at S=$FF
  read $0300).
- device-compiler ctor initializers resolved per declaring class (G-101's own
  `m_prg_mask` shadowed the interface's; stayed 0).
- Line 239: NOT timer order — MAME's ppu2c0x::render partial-updates only if
  `m_scanline_timer->remaining() != 0`; at the snapshot it is 0. Fixed with
  withGeneratedPresentTime (remaining() measured from the present instant) +
  device time held short of vbstart until presented (awaitingPresent).
- `present: 'frame-boundary'` removed (with MAME origin every screen presents
  at vbstart = MAME's instant).
- Oracle reads our RAM at presentation (wraps frameRunner.video.render) =>
  smb1 no-input RAM identical.

Methods: hot-patch dist/runtime/core/*.js via ts.transpileModule for fast
experiments (scratchpad hotpatch.mjs), real --build-app (5.5 min) before
grading; never hot-patch during a survey. MAME instruction trace via Lua
`dbg:command('trace file,:maincpu,noloop')`.

Related: [[nes-171-part2]], [[mame-oracle-tool]], [[console-blank-regressions]].

Later the same day:
- Frames now run VBLANK->VBLANK (`origin: 'vbstart'`, present at frame END);
  the lead-in version applied input 22 lines late (mc_4jy1 drifted 2 frames).
- Oracle: MAME Lua `field:set_value` takes effect at the NEXT ioport frame
  update (itself a frame notifier registered before the script's), so control
  events go to MAME one notifier early (`luaEvents` in tools/oracle/mame-side.ts).
- IrTimer fires within 1e-10 s (gberet line-80 NMI late at frame 388 from a
  float hair); settle counts heldDeviceSeconds; running beam subtracts held.
- Duck Hunt residual at frame 1041 = hand-written APU DMC DMA steal (#178).
- VRC7 split to #188 (user chose defer); ds1001.zip found in _new/_unidentified
  (importer only knows sets a generated machine asks for).
- Mamekit stays on Node 26.8.1 (.nvmrc); on 2026-10-24 the user asked to move
  to 24.22.1 then retracted it ("mamekit is on node 26! sorry, continue").
- After the VBLANK->VBLANK rotation, anything measuring "how far through the
  frame" from currentLine/vtotal broke: soundFraction (sound write stamps ->
  Gyruss/Mat Mania garbled), frameFraction (trackball), neoGeoRtcSeconds.
  Fixed via frameLines() (from frameRunner.originLine). User heard it by ear;
  goldens recorded before the fix had wrong audio hashes -> re-recorded.
  Lesson: a frame-shape change needs an audit of every frame-relative quantity.
- Section 5 (finished 2026-10-24): general gap = card-declared input ports
  (device_input_ports -> device IR `inputDefaults`; unknown port read all ones:
  ncc91 timer expired, karaoke buttons held, sheroes wrong jumper). Catch-up
  deliveries are now strict at their end (`withExclusiveTimerDelivery`): a timer
  due on the access/poll cycle fires after it (VRC4 prescaler). That moved 9 of
  10 C64 goldens (CIA timers expire on read cycles) and nothing else in the
  6502 family; checked vs MAME (BASIC f900 now exact, pacman no-input exact).
- Unresolved, recorded on #184: cityfgt4 (f347) / fighthr3 (f67) IRQ one
  instruction early; mc_190/mc_150b/cclimber need mid-instruction input
  (MAME's VBLANK lands mid-instruction); xmas12/mc_860/crayonc are APU (#178).
- Oracle quickload scenario without a title doesn't load (114k px) -- not a signal.
