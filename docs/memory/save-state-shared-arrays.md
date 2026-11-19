---
name: save-state-shared-arrays
description: A pointer member into a constant table (65C816 m_opcodes) must save as an alias; arrays now alias like objects and table members are built first
metadata:
  type: project
---

Fixed 2026-11-17 (#174): the SNES rewind check diverged because the 65C816's `m_opcodes` (aimed at one of five `valueType: 'table'` mode tables) was captured by value, and the restore (which enters each container once) never re-aimed it. Fix: Capture aliases a shared ARRAY as it already did objects (Restore registers arrays by path for alias resolution), and IrDevice builds `table` members before the rest so the pointer, not the table, is the alias.

**Why:** with the pointer first, the restore wrote the saved mode's opcodes INTO whichever table was live (corrupting it).
**How to apply:** when a rewind diverges, diff `state` against `target.save()` right after `target.load` (load losslessness) before hunting unsaved fields. Board round fields (roundBaseSeconds etc.) turned out NOT to need saving; SAVED_BOARD_FIELDS is guarded by architecture.spec.
