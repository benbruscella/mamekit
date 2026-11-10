---
name: browser-memory-rom-library
description: "#131/#132: arcade sets + NVRAM + hiscore.dat now persist in the visitor's browser; policy flip from 'never stored'; where each piece lives and the traps"
metadata: 
  node_type: memory
  type: project
  originSessionId: df7d16d6-d759-4ce3-a660-fb4cad65305c
  modified: 2026-09-09T07:46:16.672Z
---

On 2026-09-09 the user reversed the old "arcade ROMs are never persisted" rule
(README invariant 7, ARCHITECTURE §14): a dropped set is now kept in IndexedDB
`mamekit-roms` (src/runtime/romstore.ts) and the machine's NVRAM + hiscore.dat
bytes in `mamekit-memory` (memorystore.ts), keyed by game only, never by build
identity. Epic #131 (shared cabinet, verified scores, accounts later); stage 1
is #132. Server still never sees a ROM byte.

**Why:** "never turned off" needs stable RAM at fixed addresses; whole-state
autosave (#129) is bound to `machineIdentity()` and a rebuild would unplug it.

**How to apply:**
- Hiscore data is MAME's `plugins/hiscore/hiscore.dat` (5,798 entries; 64 of
  71 arcade targets). `src/mame/hiscore-dat.ts` parses it; `generate.ts` emits
  `config.hiscore`. Runtime logic mirrors `plugins/hiscore/init.lua` in
  `src/runtime/machine-memory.ts`: arm on sentinels (after `@delay=`), first
  write immediate (`last_write_time = -10`), then 5 s grace, never write the
  game's own defaults, prefill at reset. Timed-save mode + pagehide flush.
- Board accessors are generic: `persistentMemory()` = shares/regions of
  `type === 'NVRAM'` devices (14 boards); `memory(row)` = cpu program bus or a
  share. EEPROM-type devices and cart battery RAM (NES `m_battery`, GB nvram)
  are NOT covered yet — that is epic stage 2.
- e2e `bootGame` now races the drop screen against `window.mamekit`, because
  a reload inside one test boots straight from the stored set. Any new e2e
  that reloads must not assume the drop screen.
- Menu `hasRom` is now true for kept sets, which lights the old dead
  `coverShot` path; it still bails because `loadRegions` returns null.
- The menu's legacy purge must never touch `mamekit-roms`/`mamekit-memory`.
