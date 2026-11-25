---
name: sound-298
description: "#298 (2026-11-25, branch 298-sound-against-mame): MAME -wavwrite is pre-effect and per speaker input; the fold tools; three route bugs; inliner value-param width (68000 set_8xh); diverge's 68000 tap gap"
metadata:
  node_type: memory
  type: project
  originSessionId: aa81c12d-7116-44b1-bf12-e80ef50569e6
  modified: 2026-11-25T03:08:14.352Z
---

Branch `298-sound-against-mame` off main 1de5bcef (2026-11-25). User: "if you need to update sound audit tooling do that too".

**Measurement facts (mame0289 sound.cpp):**
- `-wavwrite` copies each speaker's raw sum in `output_push`, BEFORE the effect chain (default: 20 Hz Q 0.707 highpass only). Our capture is after it. A DC step through both highpasses vs one reads exactly -3.010 dB: every exact -3.01 row.
- The WAV has one channel per speaker INPUT (C64's 2nd = 1541 `flopsndout`, NES carts' `addon`). Host mapping (`find_channel_mapping`): centred channel -> both host channels at full volume, side -> its own; host sums speakers with a clamp per add. Listener mono = centred whole + half of each side.
- The 16-bit clamp in `output_push` is the RECORDING only; the heard path clamps after the effect chain, per host channel. (Corrects the "MAME clamps the raw sum" line in [[sound-mix-234]] for what a listener hears.)

**Tooling:** `tools/compare/mame-wav.ts` folds MAME's WAV by `config.sound.speakers` (new generated field), applies `speakerFilter` (`src/games/speaker-filter.ts`, shared with the harness), host-clamps each side. compare-audio `--layout <config.json>`, stereo compare, `levels`, compare-game-audio all use it. A layout with off-centre channels and a channel-count mismatch throws rather than guesses.

**Compiler bugs the old measure hid:**
- `monoRoutes` divided by total channels; now per-channel weight (centred 1, side 1/2). Only polepos moved (0.2 -> 0.4). Stereo mono capture = mean of the clamped sides.
- SSIO AYs played twice (graph route + `mixerChildren`); a child the board already holds is skipped.
- spec128 AY twice: card mconfig calls base `spectrum_ay_device::device_add_mconfig`; hosted route pass re-applied statements the parse already took. Dedupe by raw + output.
- **Inliner** (`inlineReferenceCallees`) bound value params as `auto`: `set_8xh(u16 &r, u16 v)` kept the 32-bit register -> movep.w high byte 0xff once movem.w sign-extended a phase past 0x8000. Spy Hunter +18 dB, Rampage +16 dB -> 0.

**C (fixed):** devcb `mem_mask` dropped (`generatedDeviceCallbackArguments` now forwards the source's offset+mask): Galaga 54xx `O_w` picks its channel by mask. Child read devcbs returned undefined -> initial 0xff because `bindChildCallbacks` read the type from a member list child definitions don't have; callbacks now carry `reads: true`. SMB3 DMC bytes were all 0xff. Debug recipe: back up a dist/runtime/generated/devices/*.js, inject an env-free counter dumped on process exit (use String.fromCharCode(10), not "\n", in a heredoc), run `against`, restore.

**Trap:** `diverge`'s ours-side tap missed compiled 68000 cores entirely (they use `read_interruptible`/`write_interruptible` on their own space); fixed in tools/compare/ours.ts. "0 ours accesses" on a 68000 meant the tap, not the CPU. Probe recipe: scratchpad probe68k.ts runs MAME's m68000 compiled (interpreted) or dist's emitted module on a tiny program.

**B:** `std::vector<s16>` members were Uint16Arrays (memory `signed` flag now) -> Spectrum tapes 0 dB. c64p/tape -24 is a LOAD failure on our side in the compare (PLAY at a whole-frame boundary; acceptance passes) = #161-class datassette phase fault, not sound. **E:** MAME's rest "level" is a <=4-sample WAV start-up transient then digital silence; explained, left.

**User decisions (2026-11-25):** keep the C64 PAL tape load phase AND Q*bert's Votrax in #298; then acceptance on ALL contracts, re-recording goldens only where the change is these fixes (list each with reason), stop on other failures; then `compare --against main` approved once acceptance is green.

**C64 PAL tape (fixed):** broken since #249 (goldens re-recorded the failure twice). VIC-II `spin_until_time(m_rdy_cycles)` on `cpu_cycles == vic_cycles` (8-bit) never fires in MAME (CPU first each 1-cycle perfect-quantum slice). Ours read the CPU level/behind the VIC when device time ran ahead (line settle, timer pre-fire) or was held (presentation, >256 cycles). CPU finder's `total_cycles` now answers own+1 under perfect quantum, never-behind otherwise. Check a golden's video hash repeating + rms 0.5 for a silently failed load.

**F (done):** Q*bert speaks, 0.0 dB vs MAME. Twelve generic gaps: braced-list call args -> ARRAY; comments stripped from AST parameter text; array-bound template deduction (`deduceArrayBound`, N -> std::size(arr)); clock = configuring class's own function run at gen time (kg build.ts); hosted config.replace type/clock; device_input_ports lowered under the device tag (+ custom deviceTag and set_ioport resolved relative); hosted PATCHES_MAP scoped by host tag (lower-topology); device ROM host found through called configs (lower-roms hostOf); named casts wrapped whole (postfix precedence); u64/s64 packed views + `generatedBitswap` (plain `bitswap(` lowered too); IrTimer.expire()/param(); stream rates truncated to u32 (fractional rate -> resampler NaN). Debug order that worked: chip-level `levels`, then count calls into the device's emitted methods, then a standalone device probe with its ROM. Related: [[sound-mix-234]], [[mamekit-compare-commands]].
