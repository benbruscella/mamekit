---
name: snes-174-decisions
description: "#174 SNES: user decisions 2026-11-17 — ONE PR for the whole issue, stereo host audio is phase 2, IPL ROM is at consoles/snes/bios/spc700.rom (loose, CRC-verified)"
metadata:
  node_type: memory
  type: project
  originSessionId: 9e9e69c6-e37f-4806-b877-66271b86f0e4
  modified: 2026-11-17T02:53:48.898Z
---

Started 2026-11-17 on branch `174-super-nintendo-super-famicom` from main `5c2a2bf4`. The issue body was rewritten that day to match main (CPU cores compiled whole via #249, `mamekit against/diverge/levels` via #260, guards with no exceptions via #266).

**User decisions (2026-11-17):**
- **ONE PR** for all of #174 (do not propose splitting per phase).
- **Stereo host audio is phase 2** (today `monoRoutes` in src/gen/emit-machine.ts averages a two-channel speaker); it must be generic across every board.
- The S_SMP IPL `spc700.rom` (CRC 44bb3a40, SHA1 97e35255…, verified) was supplied loose at `.data/roms/consoles/snes/bios/spc700.rom`. The library convention is `consoles/<system>/bios/<set>.zip`, so it belongs in `snes.zip` once `snes` is a ROM-library system (tools/rom-library/systems.ts). Hand the user the make commands ([[run-data-commands-yourself]]).
- Carts: 1,913 MAME-softlist-layout sets in `.data/roms/_new/snes/` (clones in subfolders).

**Why:** the user owns PR shape and scope; see [[confirm-scope-on-open-questions]], [[snes-long-term-goal]].
**How to apply:** phase order is processors -> picture/sound (+stereo) -> cartridges -> room/controllers/speed, all on this branch. Follow-ups that aren't SNES work go to #247 ([[outstanding-issue]]). Post milestones on #174 ([[issue-progress-comments]]) AND keep the #174 issue BODY updated as facts are learned (user, 2026-11-17: "keep the issue body updated as you learn stuff") — edit the body via `gh issue edit 174 --body-file`, working copy in the session scratchpad issue174.md.

**Bring-up method (2026-11-17):** candidate `src/games/candidates/snes.game.ts` (scenario `smw`), built with `npm run game:dev -- snes` into `.cache/dev/snes`. Run it with `runGameAcceptance(contract, root, { outRoot: '.cache/dev/snes', registerCandidate: true, recording: true, frames, inspectFrame })` and `MAMEKIT_ROMS=<scratch root>`: a scratch root of hardlinks to `.data/roms/_new/snes/*.zip` under `consoles/snes/`, plus a scratch `consoles/snes/bios/snes.zip` holding spc700.rom. That leaves `.data` untouched. Never pipe a long run through `tail`: the output stays buffered until exit. Findings live in the #174 body ("Findings (kept current)").

**User directive (2026-11-17): "fix all, dont stop until this is done done"** for the four open items: (1) perfect-quantum scheduler: rounds of the named CPU's minimum_quantum that also end at timer expiries, as MAME's do (frame-60 APU echo seen 3.4 µs early; MAME-rule rounds without timer bases made it worse, reverted); (2) 240-line overscan via the PPU's screen().configure(); (3) S-DSP sound vs MAME; (4) speed (5 fps). Keep going through them without stopping to ask; verify Qix and C64 against MAME when the scheduler changes.

**State at end of 2026-11-17:** overscan done (pixel-exact frame 300 at 512x240). S-DSP within 1.8 dB of MAME in every 5 s window ([[sdsp-silence-gaps]]). Speed 5 -> ~18 fps (200 frames 50 s -> 12 s). Scheduler: SMW RAM exact to frame 84; a tested "let perfect rounds cross plain line ends" made it worse (frame 72; frames 70-72 were bus-exact WITHOUT it), so MAME does end a slice at those line starts; reverted. Next lead: frame 85, the 65C816 reads $2142 where MAME's taps show nothing. `diverge snes` names no ranges on its own; pass `--io maincpu:802140-802143:rw --io soundcpu:f4-f7:rw` etc. Candidate snes:smw golden recorded and passing (incl. save-state rewind, fixed by [[save-state-shared-arrays]]). Remaining speed: u64 BigInt in PPU update_line (~10%), bus mapRange.
