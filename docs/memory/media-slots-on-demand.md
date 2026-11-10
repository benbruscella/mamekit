---
name: media-slots-on-demand
description: "#157 — a computer title boots with only its own transport's slot filled (MAME -iec8 \"\"); why, how, and the kept-ROM trap it exposed"
metadata:
  node_type: memory
  type: project
  originSessionId: e6f3a7ee-598d-4a8d-8a44-383a3825536b
  modified: 2026-10-17T06:58:08.689Z
---

Decided by the user 2026-10-17 ("Only when needed", then "the tape should also only be attached when needed"): a C64 tape title boots with `iec8` empty, a disk title with `tape` empty, Power on with both. The empty transport's strip reads NOT CONNECTED with a **Connect** button that restarts the title with it attached (room reload via sessionStorage `mamekit:restart:<game>`).

Why: an attached 1541 puts the machine in permanent lockstep (set_perfect_quantum + 2 processors) even with the motor off — tape ran 47 fps headless vs 65 with the drive slot empty.

Mechanics (all generic, no C64 list): shelves carry `slots` (generator: outermost slot device above each MEDIA_MOUNT_DEVICES transport); `BoardConfig.emptySlots` → `withEmptySlots` strips everything tagged under `<slot>:` and sets the slot's `slotDefault: ''` (passed as `slot: ''`, so `!== undefined`, not truthy). Shell drops ROM regions under the slot, so c1541.zip isn't asked for.

Trap found on the way: `storedRomFiles` used to DELETE a kept set missing a critical region. With slot configs varying per boot, a disk boot would have wiped the c64.zip kept by a tape boot. Kept sets are now additive: they seed the drop screen ("Drop c1541.zip — this browser already keeps the rest"), and the union is stored.

Also fixed: the room's "Insert your own…" passed the visible tab as a hint that won even when that shelf couldn't take the image (a .d64 dropped on the Tapes tab was refused).

**How to apply:** a new computer with slot-hosted transports gets this for free; a transport fixed to the board has no slot and is always attached. Save/netplay identity already differs per slot config (machineIdentity hashes cfg.board + regions). See [[c64-1541-disk-bringup]].
