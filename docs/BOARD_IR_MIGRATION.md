# BOARD IR MIGRATION

Temporary working document for issue #38. It records the pre-refactor baseline and
the classified migration work list. Phase 6 folds the surviving conventions into
[SYSTEM ARCHITECTURE](SYSTEM_ARCHITECTURE.md) and
[ENGINEERING GUIDE](ENGINEERING_GUIDE.md) and deletes this file.

## 1. BASELINE

Recorded at commit `f83fad9`, branch
`38-refactor-compiler-around-a-composable-hardware-boardir-before-game-13`.

- MAME source: `mame0288-776-gbd4827c1312`
- `npm run test:unit`: pass
- `npm run test:games`: 12/12 pass
- `npm run audit:generated`: pass

Generated shape of each accepted target. Any movement in these numbers during the
refactor is a behavioural change and must be explained, not absorbed.

| target | sound | CPUs | devices | callbacks | handlers | frame events | gaps |
|---|---|---|---|---|---|---|---|
| digdug | wsg | z80+z80+z80 | 17 | 49 | 53 | 6 | 0 |
| galaga | wsg | z80+z80+z80 | 18 | 37 | 42 | 8 | 0 |
| galaxian | discrete | z80 | 8 | 2 | 27 | 2 | 0 |
| gng | ym2203 | mc6809+z80 | 11 | 6 | 19 | 5 | 0 |
| gyruss | ay8910 | z80+konami1+z80+i8039 | 17 | 11 | 24 | 2 | 0 |
| invaders | discrete | i8080 | 8 | 4 | 17 | 2 | 0 |
| junofrst | ay8910 | konami1+z80+i8039 | 13 | 12 | 25 | 2 | 0 |
| mpatrol | ay8910 | z80+m6803 | 15 | 10 | 25 | 2 | 0 |
| pacman | wsg | z80 | 7 | 7 | 17 | 2 | 0 |
| pooyan | ay8910 | z80+z80 | 12 | 11 | 22 | 2 | 0 |
| rocnrope | ay8910 | konami1+z80 | 12 | 10 | 23 | 2 | 0 |
| timeplt | ay8910 | z80+z80 | 12 | 12 | 24 | 2 | 0 |

Behavioural goldens (ROM CRCs, per-checkpoint video/state hashes, audio write and PCM
hashes) live in the `GameTestContract` values under `src/games/*.ts` and are already
version-controlled. They are the equivalence contract for this refactor: a golden that
moves is a regression to investigate, not a golden to re-record.

## 2. DEPENDENCY AUDIT OF THE GNG CHANGE

Commit `f83fad9` added Ghosts'n Goblins across 35 handwritten files. Classified:

### Game declaration (expected — the touch budget)

| File | Note |
|---|---|
| `src/games/gng.ts` | contract and acceptance goldens |
| `src/games/gng.spec.ts` | colocated source spec |
| `src/games/contracts.ts` | one import plus one array entry |

### Reusable capability (expected — real new hardware support)

| File | Capability |
|---|---|
| `src/mame/opn-compiler.ts` (+1277) | YM2203 / ymfm OPN lowering |
| `src/mame/cpu-compiler.ts` (+59) | MC6809 |
| `src/mame/device-compiler.ts` (+125) | device inheritance and method lowering |
| `src/mame/video-compiler.ts` (+101) | RAM palette recognition |
| `src/mame/ast.ts`, `src/kg/parse.ts`, `src/kg/build.ts` | source shapes GNG needed |
| `src/mame/handler-ir.ts` (+28) | handler vocabulary |
| `src/runtime/generated-{device,handler,video}.ts` | generic IR execution |
| `src/runtime/generated-machine.ts` (+38) | IR schema |

These belong in the codebase. After the refactor they belong in the owning capability
package rather than in a shared central module.

### Duplicated wiring (the accidental complexity this issue targets)

| File | What was duplicated |
|---|---|
| `package.json` | `gng` appended twice to the `gen:all` shell loop, mirroring `src/gen/targets.ts` |
| `.github/workflows/ci.yml` | MAME sparse-checkout path list |
| `src/mame/hardware.ts` (+33) | `MC6809` added to 3 separate lists; `YM2203` added to a closure probe, a manifest ternary and an emit block |
| `src/gen/generate.ts` (+13) | `ym2203` branch of the `sound.kind` chain |
| `src/gen/emit-machine.ts` (+68) | second `ym2203` branch, for the machine IR sound binding |
| `src/runtime/generated-board.ts` (+112) | third `ym2203` branch, for runtime register wiring |
| `src/runtime/shell.ts` (+4) | `ym2203: 0.7` in the `VOLUMES` table |
| `src/games/acceptance-harness.ts` (+39) | fourth `ym2203` branch, for the audio probe |
| `src/games/types.ts` (+2/-1) | `soundKind` string union widened |

**One hardware family, five independent registration points.** Nothing enforces that
all five agree; a family registered in four of them fails silently in the fifth.

### Generated output / tooling (not counted)

`Makefile`, `README.md`, `CLAUDE.md`, and every `*.spec.ts` update.

### Conclusion

The migration work list is the *duplicated wiring* row set. Post-refactor, that entire
column must collapse to one capability package plus its tests.

## 3. DEPENDENCY DIRECTION

The rule, in the direction facts must flow:

```
src/kg  +  src/mame  +  src/hardware/<family>/extract.ts     compile time
                        |
                        v
                     src/ir                                  neutral, both sides
                        |
                        v
src/runtime  +  src/hardware/<family>/runtime.ts             execution
```

- Compiler layers must not import runtime *implementations*.
- `src/ir` must import neither, and must contain no browser API.
- `src/hardware/<family>/runtime.ts` compiles into the browser bundle, so it must not
  reach back into `src/mame`, `src/kg` or its own `extract.ts`.

### Violations present at baseline

Enforced by `src/ir/dependency-direction.spec.ts`. Non-test source only — specs may
import across layers, since a compiler spec legitimately executes its own output
against the generic interpreter.

| Importer | Imports | Resolution |
|---|---|---|
| `src/mame/{cpu-compiler,cpu-codegen,device-compiler,device-codegen,handler-ir,video-compiler,audio-compiler}.ts` | types from `src/runtime/generated-machine.ts` | Phase 1 — types move to `src/ir/board.ts` |
| `src/mame/audio-compiler.ts` | types from `src/runtime/audio-protocol.ts` | Phase 1 — types move to `src/ir/` |
| `src/kg/build.ts` | `executeGeneratedHandler` from `src/runtime/generated-handler.ts` | Phase 2 — the generic IR interpreter is neutral and moves to `src/ir/` |

`'../../core/generated-*.js'` strings inside `cpu-codegen.ts`, `device-codegen.ts` and
`audio-compiler.ts` are *emitted source text* — import paths written into generated
artifacts — not imports of the compiler itself. The spec parses import statements, so
it does not flag them.

## 4. CALLBACK VOCABULARY TO LOWER (PHASE 2 WORK LIST)

220 callbacks across the 12 targets, carrying 79 distinct MAME `targetMethod` strings
into the browser. Only these are actually *interpreted by name* at runtime today and
must become typed triggers and actions:

| Interpreted at runtime | Where | Becomes |
|---|---|---|
| `irq(\d)_line_(hold\|assert)` | `generated-board.ts` `interruptGenerator()` | `{action:'cpu-line', line:'irq', delivery:'hold'\|'assert'}` |
| `nmi_line_(pulse\|assert)` | same | `{action:'cpu-line', line:'nmi', delivery:'pulse'\|'assert'}` |
| `INPUT_LINE_NMI` / `INPUT_LINE_RESET` | `callbackEndpoints()` | `{action:'cpu-line', line:'nmi'\|'reset'}` |
| `mute_w` | `callbackEndpoints()` | `{action:'audio-write'}` on a typed mute port |
| `flip_screen{,_x,_y}{,_set}` | `bindGeneratedDriverState()` | typed video control port |
| `bank.*`, `watchdog.*`, `palette.write8/16/32{,_ext}` | `installDeclarativeHandlers()`, `installMemoryBanks()` | typed memory intrinsics |
| `q_out_cb` slot fan-out (56 uses) | `IrBoard` constructor | `{trigger:'power-on'}` plus a typed latch component |

The remaining `targetMethod` values already resolve structurally, through device method
lookup or the handler registry, and need no name interpretation — they become
`{action:'device-method'}` or `{action:'handler'}` at lowering time.

Signals driving the frame scheduler — `screen_vblank` (12), `set_vblank_int` (2),
`set_periodic_int` (1), `timer` (3), `vck_callback` (1) — become the typed `Trigger`
set.
