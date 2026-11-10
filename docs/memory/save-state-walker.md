---
name: save-state-walker
description: "Save states (#129) are a structural walk over runtime containers; the list of state that hid in closures, the palette trap, the proxy trap, and the harness round trip that finds the next one"
metadata: 
  node_type: memory
  type: project
  originSessionId: 181429b1-4b09-408d-a3f9-20edace0f9a8
  modified: 2026-09-08T05:26:33.967Z
---

Save states (issue #129, branch 128-two-player-netplay..., 2026-09-08) are a MAMEKIT host feature: `src/runtime/machine-state.ts` walks every container the board holds and writes it back in place. A class names its state with `stateKeys()` (plus `stateRestored()` for derived caches); an emitted CPU core is walked by its own fields (`walkOwnKeys`); a closure a CPU slot holds (the IRQ vector source) is a `namedStateFunction`. Board-composed models register their record through `IrBoard.hostModel()`.

**Why:** every accepted game now proves it survives a save in `src/games/acceptance-harness.ts`: capture at the second-to-last checkpoint, run to the end, rewind, replay the logged keys, and every frame must hash the same (video, state hash, sound writes). `MAMEKIT_STATE_DEEP=1` adds a divergent second board; `MAMEKIT_STATE_DEBUG=1` prints the full-machine diff and, with `MAMEKIT_TRACE_CPU=<tag>`, an instruction and bus-read trace of the first frame after the load.

**How to apply:** when that gate fails, the walker missed something. Everything it missed the first time was invisible state, never a walker bug:
- unshared bus RAM lived in `Bus` handler closures (`Bus.ram` now);
- `hostedCarry` (fractional cycles owed to hosted MCUs), the Z80 CTC/DMA/8255/Sega mapper models, Mario's coin latch and bank selections were `let`/`const` in the board constructor (now `hostModel()`);
- every sound hook kept closure state: AY addresses/registers/filters, POKEY random, WSG registers, OKI voices, YM timers, UPD7759, NES APU, Berzerk S14001a, C64 stream cursor, a2600/Game Boy carries, the TMS5220 sample carry that put Gauntlet's /READY pin one sample out (all now `hooks.state`);
- a `GeneratedRamPalette` recomputed from RAM is wrong: Centipede and CPS1 set pens directly, so `colors` is saved as it stands;
- a device-finder Proxy answers `stateKeys` with a function that returns junk; `statefulKeys()` only trusts an array.

A "video only differs on the first frame after load" symptom was the palette; "state equal, one CPU a cycle off" was a hidden carry. Trace the bus reads of the CPU that drifted: the differing byte names the device.
