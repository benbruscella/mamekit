---
name: save-state-compat-policy
description: "Old save states are refused, not migrated — the user chose to drop the legacy EEPROM migration rather than put deleted handwritten field names into BoardIr"
metadata:
  node_type: memory
  type: project
  originSessionId: 67117b21-ba25-42d2-a3ec-e8ce0cf3579f
  modified: 2026-10-15T02:45:43.955Z
---

On 2026-10-14 the user accepted removing save-state migration
(`GeneratedLegacyDeviceState`, `Device.migrateState`) that mapped the deleted
handwritten ER5911 EEPROM's fields onto the generated device. Pre-change
Simpsons saves now fail with "Could not load".

**Why:** the migration only protected one game's saves and put a description of
deleted handwritten code into the canonical IR forever; refusing a mismatched
save is already the policy everywhere else (savestore `identity`).
**How to apply:** when replacing a handwritten runtime object with generated
code, don't add state-shape migration; let restore fail closed and say so. Keep
existing save-state root names (e.g. `declarativeEeprom`) — every game's save
contains them, so renaming breaks all saves, not one.

Fixed 2026-10-15: `IrBoard.load` used to throw after `restoreState` had already
written part of the save. It now snapshots with `save()` first and writes the
snapshot back on failure (`restoreMachine`); generated-board.spec covers it.
Related: [[save-state-walker]].
