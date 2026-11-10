---
name: c64-autoboot-161
description: "#161 one-click play: MAME natural keyboard from PORT_CHAR, BOOT_POLICY (tape LOAD+RUN then PLAY via the KERNAL keyboard buffer), warp while loading, Paste, fast-forward message pump; traps found"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-18T14:58:33.197Z
---

2026-10-19, branch 161-fix-commodore-64-part-2 (uncommitted when written).

- **Natural keyboard** `src/runtime/natural-keyboard.ts`: MAME `build_codes`/`post_coded`/timer
  semantics (50 ms step, 200 ms on CR, shift a step before the key, released together, max one
  step per frame). Bindings carry `chars` (PORT_CHAR per shift state, `{F1}`/`{SHIFT_1}` codes,
  src/gen/input-bindings.ts `portChars`); config carries `naturalKeyboard.alternates` from MAME's
  `charinfo` (src/gen/natural-keyboard.ts) filtered to the machine's keys. Ticked after
  `netplay.begin()` so a waiting room doesn't collapse presses.
- **Boot** = host policy table `BOOT_POLICY` in src/gen/software-shelves.ts keyed by the slot
  device type (user specified the defaults in the issue; MAME usage notes are prose -- only
  Jingle Disk's names a command). Tape: `LOAD{ENTER}RUN{ENTER}` typed while the KERNAL waits at
  PRESS PLAY ON TAPE (it still scans the keyboard, so RUN sits in the buffer = SHIFT+RUN/STOP),
  then PLAY. Disk: `LOAD"*",<slotAddress>,1{ENTER}RUN{ENTER}`. Verified in Node: Spindizzy title
  screen, Boulder Dash running. 3 s delay.
- **Traps**: kg/parse.ts `matchParen` treated `'"'`/`'('` char literals as code -- every key lost
  its 2nd PORT_CHAR (quotes untypeable). `CBM_IEC_SLOT(config,"iec8",8,...)`: slot path nulls the
  clock (deliberate), so iec8's address was lost -- now `slotAddress`. Labels had raw `\xE2..`
  (cString). Cmd/Ctrl+V can't paste: input.onKey preventDefaults every bound key, so Paste is a
  toolbar button (clipboard API).
- **Warp while loading**: shell `updateWarp()` per rAF tick from `media()`/`disks()`; toggle per
  machine in localStorage `mamekit:warp-while-loading:<game>`.
- **Fast-forward pump**: rAF batch quantised to 2 frames/tick at 7 ms (120 fps); MessageChannel
  task per frame -> 136 fps in headless Chrome (Node 143). 3x needs ~6.6 ms/frame.
- e2e: `computer.spec.ts` tape + disk self-start tests use local sets from the available index.
  Local env gaps (not ours): `.data/roms/arcade/puckman.zip` missing breaks pacman e2e; NES dumps
  added 2026-10-18 (smb, mario, ...) lack cart art -> console.spec fails until tools/nes-cart-art.ts.

See [[c64-speed-161]], [[media-slots-on-demand]], [[frame-boundary-input]].
