---
name: c64-disk-writes-161
description: "#161 1541 disk writes: user ruled MAMEKIT must not keep/write disks back (disk store removed); MAME write-protect semantics and three silent compiler gaps behind every failed write"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-19T15:05:55.654Z
---

2026-10-20, branch 161-fix-commodore-64-part-2.

- **MAME's write protect**: a softlist floppy is *writable* in MAME 0.289 (load_software never sets
  m_readonly); only call_load's `get_feature("write_protected")` protects it. Parts inherit every
  `<sharedfeat>` (softlist.cpp copies them at part end), so Bounty Bob's sharedfeat counts -- and it
  "will not load if disk is not write protected". Oracle: Lua `devices[":iec8:c1541:ucd5"].spaces
  ["program"]:read_u8(0x1c00)` bit 4 (1 = writable): bbsb e0, bldrdash f0. The floppy drive has no
  save items Lua can read.
- floppy-compiler's mount_image now carries call_load from the `write_protected` check on, with
  `best_format` a parameter (the format's name string); the drive hosts get_feature/make_readonly/
  is_readonly/exists. `std::strcmp` was an unknown macro (answered 0, so "false" protected too).
- **Silent write failures** (`25, WRITE ERROR, 18, 1` from the error channel; read it with a
  program line, INPUT# is illegal direct): `track.insert/erase` were optional-chained into nothing
  (arrays have no such methods) -> generatedVectorMethod; `track.begin() + si` concatenated the array
  into a string (begin()/end() now type as iterators in device-codegen); `std::vector<wspan>
  wspans(1)` lowered to the number 1 (cpu-compiler rewrite to VECTOR_OF). See [[codegen-silent-zero]].
- **User decision 2026-10-20: MAMEKIT does not write disks.** The IndexedDB disk store
  (diskstore.ts, keep-on-eject/pagehide, restore-on-insert, DiskMedia written/contents/restore) was
  built, passed e2e, then removed at the user's request. Writes now last only while the disk is in
  the drive, as MAME's commit_image stays with the image host.
  **Why:** the user doesn't want MAMEKIT writing to disks. **How to apply:** don't reintroduce disk
  persistence or written-image export without asking; in-session writes (MAME semantics) are fine.

See [[c64-cartridges-161]], [[save-state-walker]].
