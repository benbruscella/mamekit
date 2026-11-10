---
name: discrete-compile-236
description: "#236 DISCRETE compiled from discrete.cpp + disc_*.hxx: user scope (19 machines, AY feeders compiled), baseline adc376b9, scratch harness, and the C++ idioms taught so far"
metadata:
  node_type: memory
  type: project
  originSessionId: 72c3f642-bdac-48a0-baac-3238222d34c1
  modified: 2026-11-03T15:54:34.975Z
---

#236 (started 2026-11-03, branch 236-24-compile-mames-discrete-sound-from-its-node-tables, uncommitted).

**User decisions:** one issue for all 19 machines (asteroid bnj btime bzone digdug dkong dkongjr elevator galaga galaxian gyruss invaders junglek mpatrol phoenix polepos qix travrusa xevious); reference = `oracle:baseline compare` + listening, a WAVLOG MAME build only on demand; AY-fed tables (bnj btime gyruss mpatrol travrusa): chips routed into a DISCRETE render as compiled stream devices (ay8910.cpp compiles 76/76, 0 diags) beside it; the hand AY engine stays elsewhere until item 31. Baseline recorded: `.oracle/baseline/adc376b9` (38 runs, after a fresh gen:all — dist was stale vs main). Plan comment posted on the issue.

**Traps found:**
- `compileMameDevice('DISCRETE')` as written gives 4 diagnostics and ZERO node classes: they exist only after the C preprocessor (DISCRETE_CLASS_* macros). Only the preprocessed path works, and nothing forces it yet when as-written reaches 0 diags — must add a trigger (class-declaring macros) before shipping.
- `DISCRETE(config, tag, table)`: the KG reads the table name as `clockExpr`.
- Node methods expand to `cls :: step(void)` — spacing and `(void)` both broke method discovery/override.

**Taught so far (general):** `src/mame/static-aggregate.ts` (driver table → data, factory strings `discrete_node_factory<C>::create`); class-template static instances from `references`; function-pointer field calls → CALL_METHOD; DYNAMIC_CAST with `$hierarchy` on allocated objects only; typed overloads (`interface__discrete_step_interface`); std::atomic lowering; OSD work queue run synchronously; fatalerror throws; ALLOC_OBJECTS; struct `__construct`; C strings walked by pointer; EXPECTED/HUGE_VAL; typedef aliases; named casts with nested `<>`.

**Harness:** scratchpad `harness.ts` (EMITTED=1) compiles DISCRETE with one table and renders; `src/mame/discrete.spec.ts` is the committed check (qix, both executors). Preprocessed path is now forced by `macroDeclaresClasses`.

Related: [[netlist-native-rate-inputs]], [[pokey-200]], [[silent-mislowering]], [[mame-baseline-204]].

**Native per-node reference (2026-11-04), the tool that found every bug:** scratchpad `native/` — a stub `emu.h` (device_t, sound_stream, osd work queue run inline, XTAL, attotime, rand) lets clang compile MAME's own `discrete.cpp` + `disc_*.hxx`; `make_ref.py` extracts one driver's table/descriptors/defines/custom classes; `nodediff.ts <driver> <table> <samples> [port value]` drives both sides with the same random input writes and reports each node's first divergence. Build the reference with `-ffp-contract=off` (clang fuses multiply-adds on arm64 and fakes 1e-6 drift). EXTRA_HEADERS for namco54.h/namco52.h/ay8910.h defines. All 16 distinct tables match node-for-node (asteroid's two unused transforms read NaN in MAME, Infinity in ours — unexplained, output unaffected).

**Bugs it found (all general):** C++ `double` division done as integer division when values were integral — calls to `double` methods (`input(n)`), free constexpr functions (`RES_K`), and struct fields (`info->r3`) are now `floating`; `std::min/max` with NaN (C++ returns the other operand); the interpreter's `&expr.field` re-evaluated `expr` on every read (all dkong task inputs read the last source buffer); pointers walking adjacent struct fields (`r_info_ptr = &info->r1; r_info_ptr++`); pointer-typed members/fields stepped with JS `+` (a pointer became a growing string — 46% of dkong's time); `memberObject` decayed `vector<struct>.back()` to element 0.

**Results (compare vs adc376b9):** asteroid/dkong/dkongjr/qix audio within 0.01-0.2 dB, bands <0.2 dB except qix 2.0 (unchanged); goldens re-recorded; fps 58-83.

**2026-11-04, all 18 converted, hand code deleted (still uncommitted):** galaga/xevious/polepos (WSG runtime mixes streamDevices), bzone (stream feeders: `get(input,n)` from per-output lanes), bnj/btime/gyruss/mpatrol/travrusa/elevator/junglek via **stream variants** (`streamRoutedDevices` → `HardwareUse.stream` → `devices/<type>.stream.ts`, key `<TYPE>:STREAM`, board device `stream: true`), galaxian/invaders/phoenix (GALAXIAN_SOUND/INVADERS_AUDIO in DEVICE_MAME_TYPES; new packages sn76477, tms36xx; phoenix-sound = extractStreamDevice). Open: phoenix contract 250/500 Hz -14/-9 dB + onsets 4.4 vs 2.65; gyruss/travrusa/btime/junglek contract onsets worse with level/bands matching.

**Traps found later:** mono fold = mean of ALL speaker channels (polepos 4ch); stream `put` ignored channel (only last DISCRETE_OUTPUT kept); ALL_OUTPUTS → [0,1,2] is an AY-ism; constructors: header-default params, inline ctors in class bodies, macro-declared classes (DAC_GENERATOR: preprocess header minus its #undef, expand `definition.macro`), function-pointer members via CALL_METHOD, vectors sized by ctor; tables zero-padded to declared length; pointer-to-table tables as 2D (`tunes`); table entries can be function macros (`C(3)`); body-local `#define`; `T()` struct value-init; KG evalExpr needs qualified-enum leaf fallback (`tms36xx_device::subtype::MM6221AA` was silently dropped from config); `memberObject` must decay to element when the struct has the member (ymfm `output->clear()`). Board-held mconfig children: IrDevice `heldChild` binds the finder to the board's device instead of building a table-less copy.
