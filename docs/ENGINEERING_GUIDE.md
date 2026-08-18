# ENGINEERING GUIDE

This document is the operational reference for changing MAMEKIT. Read
[SYSTEM ARCHITECTURE](SYSTEM_ARCHITECTURE.md) first when changing compiler or runtime
boundaries.

## 1. ENVIRONMENT

### REQUIRED

- Node.js 23.6 or newer;
- npm dependencies installed with `npm ci`;
- this repository at any path;
- a MAME checkout, normally at sibling path `../mame`;
- local ROMs only for acceptance and manual browser validation.

### LOCAL ASSET TREE

ROMs and artwork are copyrighted, so they live outside version control in one
hidden, gitignored tree:

```text
.data/roms/<category>/<target>.zip    acceptance ROMs (arcade, consoles/nes)
.data/artwork/                        bezels, flyers, cabinet and marquee scans
.data/Makefile                        npm wrappers + the DreamObjects sync
.data/.env                            DH_ACCESS_KEY_ID / DH_SECRET_KEY
```

`src/paths.ts` is the only place that names `.data`; tooling resolves paths
through `romsDir()` and `artworkDir()` rather than hardcoding either. ROMs are
never served or deployed — `src/cli.ts` mounts artwork explicitly and nothing
mounts roms. Run `make -C .data help` for the sync targets.

MAME source discovery order is implemented by the CLI. Override automatic
discovery with:

```sh
node bin/mamekit.js <target> --mame-src /path/to/mame
```

or set `MAME_SRC`.

Node runs repository TypeScript directly. The browser distribution is compiled
with the local TypeScript dependency using `rewriteRelativeImportExtensions`.

## 2. COMMANDS

| Command | Purpose |
|---|---|
| `npm run clean` | remove all generated distribution output |
| `npm run gen -- <target>` | extract and generate one target, then build app |
| `npm run gen:all` | clean and generate every target with an acceptance contract |
| `npm run build` | type-check repository TypeScript without writing to `dist` |
| `npm run test:unit` | strict type check plus every source/compiler/runtime spec |
| `npm run test:current` | clean-generate and audit the currently supported games |
| `npm run audit:generated` | audit the games currently present in `dist` |
| `npm run audit:game-package -- <target>` | validate local artwork, history and dossier completeness |
| `npm run audio:compare -- <target> --mame /path/to/mame` | compare MAMEKIT and MAME power-on WAVs |
| `npm run test:generation` | clean-generate every required target and audit all output |
| `npm run test:games` | deterministic real-ROM contracts for supported games |
| `npm run test:blast-radius` | run every old and new real-ROM game canary |
| `npm run test:games:record` | record candidate game baselines for review |
| `npm run serve` | rebuild app shell and serve `dist` on localhost |
| `npm run deploy -- --artwork` | clean-generate and publish the static site |

The broad `test:generation` command is destructive to `dist` and expensive. It
generates every target in `REQUIRED_TARGETS`, which is the accepted set plus
consoles that have no acceptance contract yet.

Neither command holds a target list of its own. `gen:all` is
`node bin/mamekit.js --all`, and the set is derived from the acceptance
contracts in `src/games/contracts.ts`: a game with a contract is by definition
one that must generate and pass. `src/gen/targets.spec.ts` asserts that target
discovery, the generated catalog and the contracts name the same set.

Target generation is already parallel. `gen:all` uses a bounded worker pool
(memory-aware, capped at 8 — see `src/gen/generator-workers.ts`). Override it
with `npm run gen:all -- --jobs 12` or `MAMEKIT_JOBS=12`; do not launch an
unbounded process per target because every worker parses and lowers a sizeable
MAME source closure before the shared runtime/app build runs once. The
hardware closure's isolated CPU artifact workers run through the same bounded
pool policy.

Driver contribution history (`git log --follow` over the MAME checkout, ~6s
per driver) is memoized in the gitignored `.cache/driver-history/` tree. Each
entry records the exact MAME revision it was extracted from; entries are
reused only while the checkout's HEAD matches and are pruned when it moves.
Nothing under `.cache/` is ever committed — delete the directory freely to
force re-extraction.

## 3. CLEAN GENERATION IS MANDATORY

Never evaluate a complete build on top of an existing `dist`. Deleted or
renamed generated modules can survive and hide missing compiler behavior.

The accepted full sequence is:

```sh
npm run clean
npm run gen:all
npm run audit:generated
```

`gen:all` already invokes `clean`; the explicit form is useful when running
individual CLI phases manually.

The app build also recreates `dist/app`, `dist/runtime/core`, and its temporary
`dist/.build` staging tree. It does not delete canonical per-game or generated
hardware data because those are emitted by earlier phases.

## 4. GENERATING ONE TARGET

Use this sequence while bringing up a target in isolation:

```sh
npm run clean
node bin/mamekit.js <target> --skip-app
node bin/mamekit.js --build-runtime --build-app --targets <target>
npm run audit:generated
```

`--targets` accepts registered targets from `src/gen/targets.ts`, which derives
from the acceptance contracts. A `--targets` build produces a partial
distribution on purpose; `audit:generated` rejects it as a mixed build until a
full `gen:all` rebuilds the closure and the manifest together.

The target is categorized from its MAME declaration:

```
dist/games/arcade/<target>/
dist/games/consoles/<target>/
```

Inspect these files before opening the browser:

- `graph.json`: target dependency graph;
- `graph.full.json`: full driver context;
- `config.json`: browser/ROM/input facts;
- `generated/board.json`: complete executable board IR (decoded, not asserted);
- `generated/provenance.json`: source ownership;
- `runtime-report.md`: generated behavior and hardware gaps;
- `DOSSIER.md`: generated archival machine document.

## 5. ADDING A TARGET

### STEP 1: REGISTER AND EXTRACT

A game joins the accepted set by gaining an acceptance contract in
`src/games/`; the target lists derive from there. To look at a driver before it
has one, run:

```sh
node bin/mamekit.js graph <target>
```

Review the CLI's device and ROM-region digest. Open the generated graph viewer
or inspect graph JSON. Confirm:

- the intended `Game` node exists;
- the category is correct;
- machine configuration call chains are complete;
- every CPU and device has the expected tag and clock;
- each CPU has the correct program and I/O maps;
- ROM regions, offsets, sizes and hashes match MAME;
- input polarity and DIP defaults are present;
- graphics layouts and decode entries are reachable;
- callbacks and screen-update handlers have source locations.

Do not begin browser debugging while the graph is visibly incomplete.

### STEP 2: GENERATE MACHINE IR

Run target generation with `--skip-app`. Inspect `runtime-report.json` and the
generated machine. Compiler diagnostics identify unsupported source forms more
reliably than a blank browser screen.

The generated board module should remain a small import/composition wrapper.
If it contains game logic or large literals, that logic is being emitted at the
wrong layer.

### STEP 3: BUILD THE HARDWARE CLOSURE

Build runtime/app for only the target. Check
`dist/runtime/generated/hardware-report.md` and
`hardware-manifest.json`.

Each required non-host hardware type must be executable. A type may be:

- generated CPU;
- generated device;
- generated audio implementation;
- generated machine composition;
- explicitly declarative browser-host service.

Audio machines may compose several generated cores. Preserve MAME
`add_route` output, target, gain, and destination-input facts in the graph and
machine IR; route secondary stream devices through the primary generated
worklet. Do not replace a source-declared `AY8910 + MSM5205 + DISCRETE` chain
with a game-specific mixer or silently select only the first supported chip.

Do not mark unsupported hardware as executable to make the catalog button
appear. The runtime report and manifest are honesty contracts.

### STEP 4: ADD ACCEPTANCE COVERAGE

Add focused compiler specs for every new AST or lowering rule. Add the small
game token and colocated source spec described in [TESTING](TESTING.md), then
record a real-ROM contract when target behavior reaches boot/video/input/audio.

Acceptance tests import compiled modules from `dist`. They should not import a
source-side emulation implementation because that bypasses the artifact being
validated.

### STEP 5: COMPLETE AND VERIFY THE GAME PACKAGE

The adjacent token/spec pair is auto-discovered, putting the game in
`gen:all`, the required-target set and the acceptance run without a central
list edit. Complete the local presentation assets and extracted history
described in [CONTRIBUTING](CONTRIBUTING.md), then run:

```sh
npm run audit:game-package -- <target>
```

For a sound-capable game, compare the generated power-on sequence with a real
MAME recording before accepting its audio golden:

```sh
npm run audio:compare -- <target> --mame /path/to/mame
```

The command runs MAME with `-wavwrite`, captures the actual emitted MAMEKIT
worklet, and writes both WAVs plus their spectrogram under `.files/`.

## 5A. ADDING HARDWARE

A MAME device family is one package under `src/hardware/<family>/`:

| File | Layer | Purpose |
|---|---|---|
| `definition.ts` | neutral | id, MAME types, typed ports, browser constants |
| `extract.ts` | compile time | MAME source to IR plus emitted artifacts |
| `acceptance.ts` | tooling | probe against the emitted artifact in `dist` |

Register it in `src/hardware/registry.ts` (compile time) and, for audio, in
`src/hardware/acceptance-registry.ts`. `registry.spec.ts` fails if a package
directory exists but is not registered.

`extract.ts` must return undefined when it cannot lower the family, so the
manifest leaves the type unresolved rather than claiming an executable core
that is not there. It must also not touch MAME source before it has seen its
device: every registered extractor runs against every closure.

Never import `extract.ts` from a neutral or runtime module —
`src/ir/dependency-direction.spec.ts` enforces the compile -> IR -> execution
direction and will fail the build.

## 6. WHERE TO FIX A FAILURE

Choose the layer from evidence, not from the visible symptom.

| Evidence | Correct owner |
|---|---|
| Target or macro facts missing from graph | `src/kg/parse.ts` or `src/kg/build.ts` |
| Method/class/source span missing | `src/mame/ast.ts` or source discovery |
| Wrong graph relationship or closure | KG edge construction/subgraph logic |
| Handler has unsupported syntax | `src/mame/handler-ir.ts` |
| CPU opcode expansion/semantics missing | opcode DSL or CPU compiler/codegen |
| Device method cannot lower | device compiler or generic handler vocabulary |
| Palette/tile/sprite/bitmap plan incomplete | video compiler and generated video IR |
| Audio control/topology/component plan incomplete | audio compiler and generated worklet |
| IR is correct but execution is wrong for every target | generic runtime |
| Only one game needs a hardcoded branch | source/graph/IR model is still missing a fact |
| A callback does nothing at run time | connection lowering in `src/ir/lower-connections.ts` |
| A hardware family needs a new central branch | it needs a capability package instead |
| Audit reports a mixed build | regenerate fully; `--targets` builds are partial by design |
| App cannot locate config/module | output layout, manifest `dataPath`, or relative URL |
| Old deleted code appears to work | stale `dist`; clean and reproduce |

The default solution is a reusable MAME-source lowering improvement. Never add
`src/runtime/z80.ts`, `src/runtime/ay8910.ts`, a game-named renderer, or a
family board adapter.

## 7. TEST STRATEGY

The complete QA architecture, supported-game token pattern, CI boundary,
golden policy and failure triage are defined in [TESTING](TESTING.md).

### GENERATED AUDIT

```sh
npm run audit:generated
```

The audit scans every target currently present under both game categories. It
checks:

- required config, graph, machine, board and provenance files;
- machine schema, CPU plan, callbacks and screen timing;
- source handler lowering diagnostics;
- hardware closure artifacts;
- canonical app registry imports;
- no handwritten MAME hardware files under `src/runtime`;
- no legacy `dist/app/modules` duplication;
- no temporary `.build` tree;
- no embedded serialized IR in generated JavaScript;
- no imports of `src` or absolute local paths.

### ALL-TARGET GENERATION

```sh
npm run test:generation
```

This is the highest-confidence compiler contract. It deletes `dist`, generates
every required arcade game and console, builds one hardware closure and app,
runs the generated audit, and verifies that the generated catalog has no
blocked target.

Run it after changes to shared parsing, graph reachability, IR schemas,
hardware closure resolution, build topology, or app registration.

### BROWSER VERIFICATION

For UI/runtime changes, test the final generated distribution with Playwright
or a real browser. Required checks:

1. menu loads both categories from `games.json`;
2. target route imports its canonical generated board;
3. JSON module imports receive `application/json` MIME;
4. local ROM file picker accepts and validates the correct set;
5. framebuffer is nonblank and correctly oriented;
6. status PC values progress and frame rate is stable;
7. coin, start and gameplay inputs are observed;
8. generated audio worklet loads after a user gesture;
9. page and console error logs remain empty;
10. desktop/mobile layout has no overlap.

Use screenshots and canvas-pixel checks for visual changes. A successful HTTP
response alone does not validate an emulator frame.

## 8. OUTPUT INSPECTION

Useful checks after generation:

```sh
find dist -maxdepth 5 -type f | sort
du -sh dist/app dist/runtime dist/games
rg -n "app/modules|/src/|JSON\.parse\(\"\{" dist
git diff --check
```

Expected properties:

- `dist/app` is small and contains no runtime/game copies;
- shared generated hardware appears once under `dist/runtime/generated`;
- each target appears once under its category;
- generated board source is small;
- large machine/hardware values are JSON;
- compiled output uses only relative imports within `dist`.

## 9. TYPESCRIPT AND SOURCE CONVENTIONS

Repository TypeScript uses strict mode and `erasableSyntaxOnly` because Node
runs CLI files through native type stripping.

- avoid enums, namespaces and constructor parameter properties;
- use `import type` for type-only imports;
- use `.ts` extensions in source imports where repository conventions require
  them;
- generated browser builds rewrite relative TypeScript imports to `.js`;
- use structured parsers/IR rather than source-string replacement;
- preserve source spans through each lowering stage;
- fail with diagnostics instead of adding permissive behavior.

Keep checked-in comments focused on non-obvious source assumptions or lowering
semantics.

## 10. DOCUMENTATION RULES

The current documentation set is intentionally minimal:

- root `README.md`;
- `docs/SYSTEM_ARCHITECTURE.md`;
- `docs/ENGINEERING_GUIDE.md`;
- `docs/TESTING.md`;
- `sessions/ARCHIVE_INDEX.md` for historical evidence.

Documentation filenames use `UPPERCASE_WITH_UNDERSCORES.md`, except the
repository-standard root `README.md` and tool-standard `CLAUDE.md`.

Do not add another README or a narrow document that duplicates an existing
section. Extend one of the three engineering references. Generated per-machine
archival text is named `DOSSIER.md`.

Raw session transcripts are historical. Current code and current engineering
documents always take precedence.

## 11. DEPLOYMENT

Production is a static GitHub Pages site at `mamehistory.com`.

```sh
npm run deploy -- --artwork
```

The deployment script:

1. runs clean `gen:all`;
2. optionally copies deployable artwork while excluding development history
   data;
3. updates generated artwork flags;
4. writes `.nojekyll` and the configured `CNAME`;
5. creates an ephemeral Git repository inside `dist`;
6. force-pushes one static snapshot to `gh-pages`;
7. removes the ephemeral repository.

ROMs are never deployed. Deployment requires the local MAME checkout and any
opt-in local artwork/history assets, so it is manual by design.

All runtime paths must remain relative. Pretty routes are real
`app/g/<target>/index.html` files with `<base href="../../">`. Production audio
requires HTTPS because AudioWorklet requires a secure context.

## 12. CHANGE COMPLETION CHECKLIST

Before considering compiler/runtime work complete:

1. clean generation succeeds;
2. unit and focused compiler tests pass;
3. generated audit passes;
4. relevant real-ROM acceptance passes;
5. browser frame/input/audio verification passes when behavior is user-facing;
6. generated output contains no duplicate or stale tree;
7. runtime reports expose no hidden new gap;
8. documentation still describes the actual output and ownership boundary;
9. `git diff --check` is clean;
10. unrelated user changes remain untouched.
