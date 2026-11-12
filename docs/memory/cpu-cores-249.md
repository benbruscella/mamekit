---
name: cpu-cores-249
description: "#249 (items 38–41 of #178, CPU support layers): user decisions, baseline ff52ccd9, branch 249-3841-compile-the-cpu-cores"
metadata:
  node_type: memory
  type: project
  originSessionId: e2f1d4b1-4272-4ec9-b23a-625923bd3304
  modified: 2026-11-11T06:32:51.655Z
---

#249 started 2026-11-11 on branch `249-3841-compile-the-cpu-cores` (from main ff52ccd9).

**User decisions (2026-11-11):**
- ONE PR for all four items; commit core by core.
- EVERY hand CPU layer is in #249 (user: "update the issue with all scopes"): issue body rows 41a–41i = MCS-48, I8080/I8085A, Z80 refresh_en/nomreq_en, LR35902, TMS320C10, TMS34010 (tms34010-compiler.ts hand step, budget 256, empty shape check), shared execute_run/clock dividers/widths/CPU_INTERNAL_ROM, register-union classes (Pair*/WordByteRegisterFile/Z8000RegisterFile/Xy*), Namco 51xx/53xx HLE protocol compilers (spec-only, delete).
- 68000 core: user "not sure". Plan: compile Musashi's support layer from m68kcpu.h first (68010 needs it anyway), measure, then put the microcoded `m68000_device` choice back to the user. Don't start m68000_device unasked.
- Baseline: full `oracle:baseline record --jobs 4` from ff52ccd9 approved ("Record now"). dist was stale (built 15:10, before Sound 18 and the Node bump), so it ran a clean gen:all first (code-shaped .cache dirs cleared).

- ROUTE (2026-11-11, user: "whatever is more correct, dont take anymore shortcuts in this PR"): CPU cores become their MAME classes compiled WHOLE by the generic device compiler and run through their own execute_run/m_icount (the hosted-processor path), retiring cpu-compiler paths. Probe: M6800 family, Z8002, I8080/85, LR35902, MC6809E, KONAMI compile with 0 diagnostics; MCS-48/TMS320C10 execute_run, I8088 device_start, M68010 (3), V30 (9) have parse gaps. Check DSL cores for generated .hxx (m6809make.py/z80make.py/m6502make.py) before trusting 0 diagnostics.

Device-compiler gaps found + fixed (2026-11-11, uncommitted until sweep): MAME build generators (mame-build.ts runs scripts/src/*.lua PYTHON tasks into .cache/mame-generated/<hash>); the PREPROCESSED path (preprocessed-device.ts) is where a non-header include (the 6809's in-function m6809.hxx) resolves — it silently dropped it; goto flattening in handler-ir lowerSwitchGotos (labels in if/while/for/switch, Duff cases, function-level wrap in parse()); assert = no-op (MAME release NDEBUG); lowerMemberPointerCalls for every device source; scalar typedef substitution; lambda w/o param list; implicit default ctor; std::string/ostringstream via STRING_APPEND. Probe scripts in scratchpad: probe-device.ts, probe-method.ts, probe-body.ts.

Commits: 3e1f3033 guard, 06a344f8 constants, d7c66ea4 registerBindings, 74d74d41 device-compiler whole-class work.
M6800 family on the device route (uncommitted at 2026-11-12): runtime/device-cpu.ts adapter (board createCpu -> DeviceCpu when a device with execute_run exists for the CPU tag; hostedProcessors exclude execution CPU tags); configuredSpaces option -> has_space/has_configured_map; device-owned map shares (.ram().share(m_x)); DEVICE_SELF region; PAIR locals (PAIR_VALUE); constructor-chain tables (m_insn/m_cycles); member-pointer values lowered on plain path; grouped template members (memory_access<...>::cache a, b;); codegen roots for methods named in member tables + execute_set_input; CALL_METHOD direct __methodTable dispatch; no-effect statements dropped; framework constants (INPUT_LINE_NMI) in emitter (was members.X ?? 0 -> IRQ taken as NMI); nested-class compiles collected then run outside the walk (stack overflow). Clock divider from execute_clocks_to_cycles (mameExecuteFacts.clocksToCycles, ctor-seeded members); CPU_INTERNAL_ROM + M6801U4 exemption gone.
Results: 11 games video identical; kungfum/travrusa/friskyt writeHash-only (timing, check oracle). fps old->new: mpatrol 208->130, defender 302->192, kungfum 89->73, ddragon 80->67 (all above floors). Profile recipe: node --cpu-prof + scratchpad topprof.ts; MAMEKIT_COUNT_INTERPRETED-style temp counter in executeMethod finds interpreted hot methods.
Host flakes: zero-byte acceptance logs (native crash), SIGILL/SIGSEGV workers in gen/NES spec -> retry.

Guard draft: scratchpad cpu-guard.ts (TS-AST scan; 321 layer entries + 52 facts at ff52ccd9); extend to tms34010/namco5x compilers.

**Why:** the user owns scope and PR shape; see [[confirm-scope-on-open-questions]], [[sound-242]].
**How to apply:** no new branches; don't edit src or rebuild dist while the record runs ([[board-devices-237]] trap). Related: [[mame-baseline-204]], [[musashi-prefetch-slapstic]], [[m68k-icount-cycles]].
