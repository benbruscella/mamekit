---
name: compiler-not-porter
description: "Core principle — mamekit is a compiler, not a porter; no hand-crafted game-specific files, but MAME-specific detail is encouraged"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7330d0f2-51bb-4376-aa0d-6d036a5c94f3
  modified: 2026-11-01T09:56:16.260Z
---

Ben's core principle for mamekit (stated 2026-07-22 when green-lighting the Galaga migration): "this needs to be a compiler, not a porter."

**Why:** The whole point of the architecture is that game/hardware behavior is *derived* from MAME source via lowering + knowledge graph + generated IR. Hand-porting a game (writing game-specific runtime/behavior files by hand) defeats the project and recreates the maintenance burden the rewrite deleted.

**How to apply:**
- Never add hand-crafted game-specific behavior files to make a game work. If a game needs something, extend the compiler/lowering/KG so it is extracted from MAME source (with provenance).
- Game-specific *test contracts/specs* under `src/games/` follow the existing repo pattern and are fine — they describe expectations, not behavior.
- 2026-11-01, on epic #178: "we don't want rewritten, we want compilation and transpilation." Hand-written code that matches MAME today is still debt, not finished work, so don't propose closing #178, leaving code hand-written for good, or dropping "all five lists empty". Only the order is open: wrong today, then one compiler change that retires several items, then what a new machine needs, then the rest down to the CPUs.
- This is NOT a general C++→web compiler. It is MAME-specific: compiler code may be arbitrarily detailed and specific to MAME idioms, macros, device patterns, and source layout (e.g. devcb, address maps, discrete netlists, historical device-protocol sources with `file@commit` provenance). Specificity to MAME is fine; specificity to a single game is not.
