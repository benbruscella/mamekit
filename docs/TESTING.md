# TESTING

MAMEKIT tests a compiler, generated emulator hardware, and a browser host. A
single test style cannot cover all three honestly. This document defines the
quality gates for supported machines and the evidence required before a
behavioral baseline may change.

## 1. GOAL

When a new machine is added, every target in `src/games` must continue to
produce the same generated machine behavior unless an intentional, reviewed
fix changes it. The tests therefore protect both sides of the compiler
boundary:

1. MAME source is parsed and lowered as expected;
2. a clean generated distribution remains complete and self-contained;
3. real ROM code follows the same input, CPU, video, and audio trajectory.

The tests do not prove universal MAME compatibility. They prove specific
source forms, generated hardware contracts, and named supported machines.

## 2. TEST LEVELS

| Gate | Command | MAME source | ROMs | CI |
|---|---|---:|---:|---:|
| Type and colocated specs | `npm run test:unit` | yes | no | yes |
| Current clean generation + semantic drift | `npm run test:current` | yes | no | yes |
| All registered target generation | `npm run test:generation` | yes | no | manual |
| Generated game behavior | `npm run test:games:matrix` | no after generation | yes | required commit status |
| Shared-core blast radius | `npm run test:blast-radius` | no after generation | yes | local |
| Browser presentation | `npm run test:e2e` | no after generation | yes | local |

`npm test` runs every colocated spec, clean generation/audit, and then every
real-ROM game contract. It is the local shared-core gate and requires the ROMs
under `.data/roms`. CI runs the first two gates separately because it cannot
legally contain those ROMs. The separately published `ROM-backed accepted
contracts` commit status is required on `main`; green public CI alone is not a
release gate.

### TYPE AND COLOCATED SPECS

`test:unit` runs strict TypeScript checking followed by every `*.spec.ts` under
`src`. Tests live beside the implementation they constrain:

```
src/mame/video-compiler.ts
src/mame/...generic compiler specs...
src/games/pooyan.game.ts
src/games/pooyan.game.spec.ts
```

These specs cover source parsing, graph construction, IR lowering, generated
source topology, CPU/device semantics, and hardware-neutral runtime behavior.
The game specs verify the named MAME source contract used by each supported
machine. They do not load ROMs or import a handwritten game implementation.
`npm run build` is also non-emitting, so colocated specs and QA tokens can
never be compiled into or pollute the canonical generated `dist` tree.

Every executable module in `src/runtime` must have an adjacent spec. The
`runtime-spec-inventory.spec.ts` guard enforces this as new files are added.
Declaration-only modules (`types.ts` and `audio-protocol.ts`) are explicit
exceptions because they have no runtime behavior to execute. Browser
orchestrators expose small pure contracts for Node unit tests; complete DOM,
canvas, audio and interaction behavior remains part of browser QA.

### CURRENT CLEAN GENERATION

`test:current` invokes `gen:all`, which deletes `dist`, generates every
auto-discovered supported-game contract from MAME, builds their shared
hardware closure and app, then runs the generated-output and semantic-baseline
audits. It detects stale-output masking,
missing modules, unsupported hardware, duplicate trees, embedded machine JSON,
imports from `src`, blocked catalog entries, and ROM-free BoardIR drift across
all supported targets. Source locations are excluded from the semantic digest;
callbacks, frame events, devices, handlers, maps, palette configuration and
the rest of executable BoardIR are not.

### ALL-TARGET GENERATION

`test:generation` retains the wider all-target compiler contract. It is
intentionally separate while targets are being restored one at a time. Run it
before broad parser, KG, IR schema, hardware closure, or app registry changes.

### GENERATED GAME BEHAVIOR

`test:games:matrix` imports the compiled modules from `dist`, loads local ROMs, and
executes each generated board for the frame count declared by its token. For
each supported game it checks:

- every required ROM slot and CRC;
- assembled region hashes;
- generated coin and start input bindings;
- native framebuffer dimensions;
- exact framebuffer hashes at each token's checkpoints;
- exact CPU/device state hashes at the same checkpoints;
- generated audio register write count and trace hash;
- required named-device activity for composite paths, including source clock
  events where decoding depends on them;
- generated PCM hash and RMS level;
- visible frame progression and non-silent output;
- measured full-contract throughput above the token's minimum fps.

Each token owns its checkpoint and input schedule because machines reach their
input-ready attract state at different times. Frame counts range from 600 to
2,400 so each golden reaches active gameplay; Galaga and Dig Dug use longer
contracts to cover their three-CPU self-tests before coin and start input.
Every action has deterministic press and release durations. A test failure
therefore identifies a changed trajectory, not only a final screenshot.

Each contract runs in its own optimized Node process. The short gap between
contracts lets macOS reclaim JIT mappings for the unusually large generated
CPU modules; without it, rapid process churn can end in a native Node signal
instead of a useful emulator assertion. This isolation does not affect the
generated browser runtime.

The matrix is deliberately non-fail-fast. It writes
`.cache/acceptance-report.json`, including the tested commit and every target's
result, so one early failure cannot hide the rest of the regression set. An
accepted suite is green only at 100%. A mismatch is never waived merely because
it also occurs at the PR base: either identify the last proven-green commit and
fix the regression, or move an honestly unsupported target out of the accepted
inventory with a linked issue.

Maintainers publish the required GitHub status from a clean committed tree:

```sh
npm run test:games:publish
```

That command clean-generates first, runs every accepted contract, and publishes
`ROM-backed accepted contracts` on the exact HEAD SHA. The publisher refuses a
dirty tree and refuses `MAMEKIT_ACCEPTANCE_GAMES`, so a focused pass cannot mark
the full suite green.

The throughput measurement includes CPU execution, generated video, checkpoint
hashing and deterministic audio probing. It is not the browser's presentation
counter, but it catches runtime complexity regressions before they make a game
miss real time. Tokens currently require 45 fps, except Time Pilot's 40 fps
floor, which leaves enough host-load tolerance while still detecting its
original 12 fps rendering regression. These floors leave headroom for shared
development and CI machines while rejecting Time Pilot's original uncached
scanline implementation and Galaga's original interpreted 05XX hot loop.

Generated device code must additionally pass a compiled-versus-interpreted
differential spec. Compare emitted writes, framebuffer effects and every device
member after identical calls. A relative performance assertion belongs with a
proven hot loop; absolute real-time acceptance remains in the game token.

### BROWSER PRESENTATION

`test:e2e` is the Playwright suite in `e2e/`. It plays every accepted machine
through the real app and is what replaces play-testing each one by hand.

The Node contracts above import generated modules directly, so the app is
absent from them: no DOM, no canvas, no AudioWorklet, no keyboard. A broken
audio route or a stalled blit passes `test:games` and still ships. The browser
suite drives `/app/g/<game>/`, feeds the app's own ROM picker from
`.data/roms`, and replays the same token schedule through window key events,
then compares:

- assembled region hashes, so the picker built the accepted ROM set;
- every checkpoint's framebuffer and state hash against the token's golden;
- the sound-register writes the board emitted, against the token's audio
  golden — the live pass only proves *something* is audible, which a single
  dead channel passes (Gyruss's silent i8039 percussion, issue #58). This
  catches a channel going silent; a channel that was never wired agrees with
  its own golden, and only a register-stream diff against real MAME finds it;
- the presented canvas against `e2e/snapshots/<game>-final.png`;
- measured sound on the app's own AudioWorklet graph, which the offline audio
  probe never touches;
- emulated frames per wall-clock second against the token's `minimumFps`.

The goldens are the token's, so there is no second baseline to keep in step. A
browser failure means the app path diverged from the accepted machine.

`?qa=1` parks the shell's wall-clock timestep and hands frame advancement to
`window.mamekit.step()`, so a browser run is as deterministic as a Node one.
Every other part of the page — input, board, audio, blit — is unchanged.

`npm run test:e2e:headed` runs the same suite in a real browser window, one
machine at a time, so a failure can be watched rather than inferred. Narrow it
with `MAMEKIT_E2E_GAMES=<game>`.

To decide *which* machines to exercise in the browser after a runtime or compiler
change, use `npm run blast-radius` rather than guessing. It compares the PR
merge-base (from `MAMEKIT_BASE_SHA`, `MAMEKIT_BASE_REF`, or `origin/main`) plus
working-tree edits, then derives the affected set from
the generated artifacts — each `board.json` names the devices, callbacks,
handlers and CPUs its machine composes — and prints the matching
`MAMEKIT_E2E_GAMES=...` command. See
[ENGINEERING GUIDE](ENGINEERING.md) section 6A.

The suite is local only for the same reason `test:games` is: it needs ROMs. See
[e2e/README](../e2e/README.md) for layout, snapshot recording, the full list of
environment switches, and the opt-in `rom-search` spec, which requires the
public mirror to hand back a bootable set.

### THE CONSOLE

A console has no romset of its own, so it cannot hold a real-ROM contract the
way an arcade machine does: its software arrives on cartridges the visitor
supplies. `e2e/specs/console.spec.ts` is therefore the only end-to-end gate the
machine has, and it asserts what issue #85 asked for:

- the boot menu offers a CONSOLES tab and the machine is on that shelf. The tab
  bar is derived from what the manifest holds (`menuTabs`), so its presence is
  the honest signal that the target is in the build — issue #53 dropped it and
  nothing went red;
- every title in the machine's `cart.games` support list is on the shelf with a
  cartridge scan and an enabled "⌕ Search" button, which is what "playable
  without owning a dump" means;
- with `MAMEKIT_E2E_ROMSEARCH=1`, that button really does fetch a cartridge,
  shelve it and boot it to a drawn frame. The assertion is on pixels, because a
  cartridge that boots to a blank screen is exactly the state the console was
  found in.

The support list, the cartridge scans and the fetchable dumps are one contract:
`node tools/nes-cart-art.ts --check` (or `make cart-art-check` in `.data/`)
reports any title missing either, and derives its work list from the generated
machine so the three cannot drift apart.

## 3. GAME TOKENS

The `src/games` directory is the supported-machine QA inventory. Each machine
has one deliberately small token:

```
src/games/pacman.game.ts
src/games/pacman.game.spec.ts
src/games/pooyan.game.ts
src/games/pooyan.game.spec.ts
src/games/timeplt.game.ts
src/games/timeplt.game.spec.ts
src/games/invaders.game.ts
src/games/invaders.game.spec.ts
src/games/galaxian.game.ts
src/games/galaxian.game.spec.ts
src/games/galaga.game.ts
src/games/galaga.game.spec.ts
src/games/digdug.game.ts
src/games/digdug.game.spec.ts
src/games/mpatrol.game.ts
src/games/mpatrol.game.spec.ts
src/games/rocnrope.game.ts
src/games/rocnrope.game.spec.ts
src/games/junofrst.game.ts
src/games/junofrst.game.spec.ts
src/games/gyruss.game.ts
src/games/gyruss.game.spec.ts
```

The token declares only:

- MAME short name, category, driver and machine configuration;
- ROM environment variable;
- expected screen and generated audio kind;
- full-contract minimum fps;
- frame checkpoints and input schedule;
- compact hashes for the accepted generated behavior.

A game whose generated build is known bad moves to `src/games/disabled/`, a
directory discovery never reads, so it stops being generated, audited and
shipped. Each parked module carries a header note with the play-test finding
that disabled it, and its spec keeps running from there, so the driver must
still compile. Re-enabling one is moving the module and spec back up.

It must never contain CPU instructions, address-map behavior, graphics decode,
palette logic, sprite drawing, sound synthesis, or a board implementation.
Those facts must continue to come from MAME through AST, KG and typed IR
lowering.

Shared mechanics belong in `acceptance-harness.ts`. The harness owns ROM
assembly, generated module loading, input dispatch, frame stepping, generated
audio probing and comparison. Adding a game should add data and focused source
assertions, not copy the harness.

### WHY THE OLD POOYAN FILES DID NOT SCALE

`src/gen/pooyan-acceptance.ts` gave a game-specific executable to the generic
generation package. Every additional game would have encouraged another copy
of ROM loading, keyboard events, frame scheduling and audio sampling. It also
made `src/gen` look responsible for Pooyan runtime behavior.

`src/mame/pooyan-video-compiler.spec.ts` was a useful test in the wrong
ownership namespace. It described a supported game's source contract, not the
generic video compiler in isolation. A growing list of game-named files under
`src/mame` would hide which games are intentionally supported and scatter each
game's acceptance evidence across unrelated packages.

The assertions were not discarded. They now live in `src/games/pooyan.game.spec.ts`
beside the Pooyan token, while generic video lowering remains in
`src/mame/video-compiler.ts`. This preserves colocated tests without confusing
generic compiler ownership with the supported-game inventory.

## 4. RUNNING REAL-ROM CONTRACTS

Generate a clean current distribution first:

```sh
npm run test:current
npm run test:games:matrix
```

The default ROM locations, under the gitignored `.data/` tree, are:

```text
.data/roms/arcade/pacman.zip
.data/roms/arcade/pooyan.zip
.data/roms/arcade/timeplt.zip
.data/roms/arcade/invaders.zip
.data/roms/arcade/galaxian.zip
.data/roms/arcade/galaga.zip
.data/roms/arcade/digdug.zip
.data/roms/arcade/mpatrol.zip
.data/roms/arcade/rocnrope.zip
.data/roms/arcade/junofrst.zip
.data/roms/arcade/gyruss.zip
```

Override them without moving files:

```sh
MAMEKIT_PACMAN_ROM=/path/pacman.zip \
MAMEKIT_POOYAN_ROM=/path/pooyan.zip \
MAMEKIT_TIMEPLT_ROM=/path/timeplt.zip \
MAMEKIT_INVADERS_ROM=/path/invaders.zip \
MAMEKIT_GALAXIAN_ROM=/path/galaxian.zip \
MAMEKIT_GALAGA_ROM=/path/galaga.zip \
MAMEKIT_DIGDUG_ROM=/path/digdug.zip \
MAMEKIT_MPATROL_ROM=/path/mpatrol.zip \
MAMEKIT_ROCNROPE_ROM=/path/rocnrope.zip \
MAMEKIT_JUNOFIRST_ROM=/path/junofrst.zip \
MAMEKIT_GYRUSS_ROM=/path/gyruss.zip \
npm run test:games:matrix
```

ROMs are copyrighted, gitignored, never copied into `dist`, and never placed
in CI. This is why CI can prove source extraction and generation but cannot
claim that a real game booted.

## 5. CHANGING A GOLDEN

Do not update a golden merely to make a failing test pass. First determine
which compiler, graph, IR, generated hardware, input, timing, video, or audio
change produced the difference.

After the new behavior has been compared with MAME and manually verified in
the browser, record candidate values with:

```sh
npm run test:games:record
```

This command rewrites only each token's `golden` object. Review the resulting
diff before keeping it; recording is not evidence that the new behavior is
correct.

To inspect the exact final native frame from a focused contract, set a PPM
output path:

```sh
MAMEKIT_CAPTURE_FRAME=/tmp/digdug.ppm \
MAMEKIT_UPDATE_GOLDENS=1 \
node -e "import { runGameAcceptance } from './src/games/acceptance-harness.ts'; import { digdug } from './src/games/digdug.game.ts'; await runGameAcceptance(digdug)"
```

Review the diff and keep only the affected token changes. Then rerun
`npm run test:games:matrix` without the recording flag. A review should be able to
explain every changed region, frame-state, video, write, or PCM hash.

If executable BoardIR intentionally changes, `npm run test:current` will also
reject the semantic baseline. Update it only after the affected real-ROM and
browser contracts pass, using `npm run record:semantics`, and include the
source-derived reason in the PR. A source-line movement alone never requires a
baseline update.

Region hash changes normally mean a different ROM set or patch and require
special scrutiny. A framebuffer-only change points toward video or timing. A
state hash change before the video changes points toward CPU/device/input
execution. Audio write changes point toward board/device routing; PCM-only
changes point toward generated synthesis or resampling.

## 6. ADDING A SUPPORTED GAME

Use the canonical [adding-a-game workflow](ADDING_A_GAME.md). It starts from a
MAME short name, creates a staged candidate, and keeps generation, acceptance,
and publication readiness separate.

If a new title requires changes to `acceptance-harness.ts`, first decide
whether the requirement is a reusable hardware category or an accidental
game-specific branch. The harness may gain generic DSP or input capabilities;
it must not gain game logic.

## 7. CI CONTRACT

`.github/workflows/ci.yml` runs on pushes and pull requests. It:

1. checks out MAMEKIT;
2. sparse-checks out the pinned MAME source commit used to establish these
   contracts;
3. installs the locked npm dependencies on the repository's Node version;
4. runs every colocated spec;
5. deletes `dist`, regenerates every discovered accepted/candidate machine,
   and audits both generated structure and semantic BoardIR.

GitHub branch protection additionally requires `ROM-backed accepted contracts`,
published by a maintainer with the local legal ROM inventory. Public runners do
not receive ROMs.

The MAME commit is pinned deliberately. Updating it is a source migration and
must be reviewed separately from a MAMEKIT implementation change. Run all
source, generation and real-ROM gates before changing the pin.

## 8. FAILURE TRIAGE

| Failure | Start investigation at |
|---|---|
| Game source spec | driver AST, KG reachability, named lowering rule |
| Type check | changed IR/runtime contract or stale import |
| Clean generation | generator diagnostics and runtime report |
| Generated audit | output ownership, duplicate/stale files, blocked hardware |
| Region hash | ROM revision, clone matching, driver-init patches |
| Early state hash | CPU, memory map, reset, interrupt or device callback |
| State changes after input | binding polarity, port mapping, coin/start timing |
| Video hash only | palette, graphics decode, tile/sprite rendering, crop/rotation |
| Audio write hash | sound map, latch, callback, sound CPU/device routing |
| PCM hash only | generated DSP, chip clock, gain, mute or resampling |
| Browser only | app registry, URL/MIME, canvas, AudioWorklet or scheduler |
| Browser checkpoint hash while `test:games` passes | ROM picker assembly, shell input dispatch, run-loop frame accounting |
| Browser snapshot only | canvas geometry, rotation, blit |
| Browser audio only | AudioWorklet module URL, worklet init message, gain routing |

Always reproduce after a clean generation. A mixed `dist` is not valid test
evidence.
