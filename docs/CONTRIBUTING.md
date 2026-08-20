# CONTRIBUTING

This guide defines how to change MAMEKIT and how to add a machine without
turning the repository into a collection of handwritten emulator ports.

Read [SYSTEM ARCHITECTURE](SYSTEM_ARCHITECTURE.md) before changing compiler
boundaries. Read [TESTING](TESTING.md) before accepting a generated behavior
change or recording a game golden.

## 1. CONTRIBUTION CONTRACT

MAMEKIT is a MAME-source compiler, not a general C++ transpiler and not a
TypeScript rewrite of MAME. Contributions must preserve these invariants:

1. Emulated hardware behavior comes from MAME source, macro DSLs, opcode DSLs,
   the knowledge graph, and typed intermediate representations.
2. `src/runtime` contains only generic IR execution and browser services. It
   must not contain handwritten MAME CPUs, sound chips, video systems, boards,
   or game drivers.
3. Machine-specific facts belong in MAME source-derived graph or IR data, not
   in game-name conditionals.
4. A generated distribution is self-contained. Files under `dist` must not
   import `src`, absolute local paths, or another stale build tree.
5. Unsupported source forms fail visibly through diagnostics and reports.
   They are not silently approximated to make a catalog entry appear playable.
6. ROMs are supplied locally for testing. They are never fetched, committed,
   copied into `dist`, or used in CI.

MAME-specific assumptions are expected. It is reasonable for a compiler to
understand MAME conventions such as `_AUDIO` device types, `mute_w`, address
map builders, `GAME` macros, or an opcode-list DSL. It is not reasonable for a
shared emitter or runtime to ask whether the current game is `invaders`,
`pooyan`, or any other short name.

Hardware-specific compilers are also valid when the hardware is identified by
the extracted machine graph and its MAME source definition. The distinction is
important: a generated AY8910 implementation is reusable source lowering; a
checked-in `pooyan-sound.ts` implementation is a game port.

## 2. DEVELOPMENT ENVIRONMENT

Required:

- Node.js 23.6 or newer;
- dependencies installed with `npm ci`;
- a MAME checkout, normally at `../mame`;
- legally obtained local ROMs for acceptance and browser testing only.

Override MAME discovery with either:

```sh
export MAME_SRC=/path/to/mame
node bin/mamekit.js <target> --mame-src /path/to/mame
```

Start from a valid repository and compiler baseline:

```sh
npm ci
npm run test:unit
npm run test:current
```

`test:current` deletes and regenerates `dist`. Do not preserve local changes
there; it is disposable compiler output.

## 3. CHOOSE THE CORRECT OWNER

Fix the earliest stage that has lost or misrepresented the MAME fact.

| Evidence | Correct owner |
|---|---|
| Declaration, macro, clock, map, ROM, input, or graphics fact is absent | `src/kg/parse.ts` or graph construction |
| C++ class, method, statement, or source span is absent | MAME AST/source discovery |
| Required entity exists but is not reachable | knowledge-graph edge or closure logic |
| Handler syntax cannot be represented | handler IR parser or operation vocabulary |
| CPU instruction or state semantics differ from MAME | CPU compiler, opcode DSL, or code generator |
| Device method cannot execute | generic device compiler or handler lowering |
| Palette, bitmap, tile, sprite, crop, or rotation is wrong | video compiler and generated video plan |
| Audio ports, topology, clocks, components, routing, or gain are wrong | audio compiler and generated audio IR/worklet |
| Correct IR executes incorrectly for multiple machines | generic runtime |
| Only one game appears to need a shared-code branch | graph or IR is missing a source-derived fact |

Do not start by patching the visible browser symptom. Inspect the graph,
machine IR, hardware closure, provenance, and diagnostics first.

## 4. ADDING A MACHINE

The target outcome is a small QA token plus reusable compiler improvements.
Adding the next machine should not add a board implementation, CPU port,
renderer, or sound class under `src`.

### QUICK PATH

For an already listed target, the normal sequence is:

```sh
node bin/mamekit.js graph <target>       # inspect extraction first
npm run clean
node bin/mamekit.js <target> --skip-app  # generate only this machine
node bin/mamekit.js --build-runtime --build-app --targets <target>
npm run audit:generated
npm run audit:game-package -- <target>  # after adding local presentation assets
npm run serve                            # verify ROM, input, video and audio
```

Do not add the adjacent game token while the target is still being brought up.
First fix graph, IR and generated-hardware gaps in isolation. The token is the
registration: discovery adds it to `gen:all` only when both
`src/games/<target>.ts` and its colocated spec exist.

The reverse holds for a target that regresses: move the module and its spec
into `src/games/disabled/` with a header note saying what play-testing found,
and it stops being generated, audited and shipped while its spec keeps
compiling the driver under `test:unit`. Issue #53 parked the first batch there.

### STEP 1: IDENTIFY THE TARGET

Use the MAME short name. There is no central target array or package-script
list to edit.

Extract its graph:

```sh
node bin/mamekit.js graph <target>
```

Inspect the CLI digest and generated graph. Confirm:

- game/system declaration, parent and category;
- machine configuration call chain;
- CPU and device tags, types and clocks;
- program and I/O maps, masks, shares and handlers;
- ROM regions, loads, offsets, sizes and hashes;
- input polarity, defaults and DIP switches;
- graphics layouts, decode entries and palette dependencies;
- callbacks, interrupts, screen timing and source locations;
- audio routes and source-defined sound hardware.

Useful output is under:

```text
dist/games/arcade/<target>/
dist/games/consoles/<target>/
```

`graph.json` is the target-reachable graph. `graph.full.json` contains the
full parsed driver context. If either is visibly incomplete, fix extraction
before attempting browser debugging.

### STEP 2: GENERATE THE TARGET IN ISOLATION

Always begin from an empty distribution:

```sh
npm run clean
node bin/mamekit.js <target> --skip-app
node bin/mamekit.js --build-runtime --build-app --targets <target>
npm run audit:generated
```

Inspect at least:

```text
generated/board.json
generated/provenance.json
runtime-report.md
runtime-report.json
dist/runtime/generated/hardware-report.md
dist/runtime/generated/hardware-manifest.json
```

The generated board module should be a small composition wrapper around JSON
machine IR and generic runtime construction. Large constants or game logic in
that module indicate that behavior is being emitted at the wrong layer.

### STEP 3: CLOSE GENERATION GAPS

Treat each failure as evidence about a missing compiler capability:

1. A generator error usually identifies a parser, reachability, or unsupported
   source-shape gap.
2. A missing handler identifies the exact method or MAME expression that needs
   generic lowering.
3. A blocked hardware type identifies a CPU, device, video, or audio definition
   absent from the generated hardware closure.
4. Incorrect runtime behavior with correct IR identifies a generic executor
   defect.

Implement the narrowest reusable lowering rule that faithfully represents the
MAME source. Preserve the source file and span in the resulting IR. Add a
colocated compiler spec for every new AST shape, expression, operation, or
hardware semantic.

Profile before adding an optimization. If a source-derived device method is
slow because a large loop is walking handler IR, extend generic device codegen
rather than replacing the device with handwritten TypeScript. Keep unsupported
methods on the interpreter path and add a compiled-versus-interpreted
differential spec covering writes, framebuffer effects and complete device
state.

Never solve a gap by:

- adding `src/runtime/z80.ts`, `ay8910.ts`, or another handwritten chip;
- adding a game-named board, video, or audio runtime module;
- copying C++ behavior into a game token;
- checking `game === '<target>'` in shared code;
- checking a game-family device type when a generic MAME method or extracted
  capability expresses the same fact;
- marking unresolved hardware executable only to unblock the app;
- embedding serialized machine JSON in generated JavaScript;
- using Emscripten or WebAssembly as an alternate execution path.

### STEP 4: ADD THE QA TOKEN AND SOURCE SPEC

Add adjacent files:

```text
src/games/<target>.ts
src/games/<target>.spec.ts
```

Use an existing token only as a schema example. The token may declare:

- MAME short name, category, driver and machine configuration;
- ROM environment variable;
- expected native screen dimensions and generated audio kind;
- frame count, input schedule and minimum throughput;
- reviewed region, state, video and audio hashes.

It must not implement emulation behavior. The adjacent spec should assert the
MAME source facts and generated lowering essential to this machine. Generic
compiler behavior remains tested beside its compiler.

The token/spec pair is auto-discovered and joins `gen:all` and the real-ROM
acceptance run. Extend `acceptance-harness.ts` only for a reusable machine
capability, never for game logic.

### STEP 5: VERIFY WITH REAL ROMS

Place the local archive at the token's default path or use its environment
variable. For example:

```sh
MAMEKIT_<TARGET>_ROM=/path/to/<target>.zip npm run test:games
```

Validate all of the following before recording a baseline:

1. every required ROM validates and assembles into the expected region;
2. reset and boot progress rather than settling into an error loop;
3. coin and start inputs work with the extracted polarity;
4. gameplay input reaches the machine;
5. orientation, visible area, crop and placement match MAME;
6. tiles, sprites, priorities, clipping, masks and colors remain correct during
   active gameplay, not only on the title screen;
7. audio routing works and pitch, timing, mute and gain are credible;
8. frame rate remains above the token threshold;
9. browser console and page error logs remain empty.

Run the generated app and inspect the actual canonical output:

```sh
npm run serve
```

Use screenshots and canvas-pixel checks at desktop and mobile sizes. Exercise
the game long enough to reach moving sprites, score areas, clipping boundaries,
interrupt-driven transitions, and audible effects.

Passing hashes do not prove correctness. A deterministic test can faithfully
preserve a deterministic bug. Compare questionable behavior with MAME or a
trusted reference before accepting it.

### THE 40-GAME BRING-UP CHECKLIST

The first large arcade batch exposed a set of recurring traps. Treat this as a
mandatory checklist, not optional debugging advice. Most apparently unrelated
"does not boot", "no sound", corrupt-sprite, and false-blocker reports came
from one of these patterns.

#### 1. Prove a cold boot before testing inputs

Run the machine from reset with **no input at all** until MAME reaches its
attract/title state. Capture intermediate frames and compare their emulated
times with the same MAME revision. Then run a separate coin/start/gameplay
scenario.

Do not let an acceptance action hide a boot failure. Several boards ignore
coin/start during RAM, ROM, audio-board, or bookkeeping self-test; pressing a
key at a generic frame can be discarded, accidentally skip a state, or make a
broken attract path look healthy. Put input actions after the observed ready
state, not after an assumed number of seconds.

MAME has no universal `booted` signal. Drivers know about reset lines,
interrupts, watchdogs, device handshakes, and video updates, but "ready for a
player" is game software state. Do not add timers, fake boot-complete flags, or
UI spinners that guess. The stable user feedback is the board's real output;
the stable test is an observed title/attract checkpoint followed by accepted
coin and start inputs.

For a reference timeline, a headless MAME AVI is often more useful than a
single screenshot:

```sh
SDL_VIDEODRIVER=dummy mame <target> \
  -rompath .data/roms/arcade \
  -video soft -sound none -nothrottle \
  -seconds_to_run 60 -aviwrite /tmp/mame-<target>.avi -skip_gameinfo
```

#### 2. Never test new source against stale or mixed `dist`

`npm run build` type-checks; it does not update the JavaScript that the ROM
acceptance harness and browser load from `dist`. Rebuild runtime/app output
after changing runtime, generated hardware, or handler execution.

A target-only hardware build over a 65-game catalog is deliberately refused:
its registry, closure, reports, and catalog describe different worlds. A
runtime report from such a mixed tree can both invent blockers and conceal real
ones. Targeted builds are useful only in an isolated/empty distribution. Before
recording status or goldens, always do:

```sh
npm run gen:all
npm run audit:generated
```

If a test passed before a rebuild and fails after it, trust the rebuilt result.
The Venture composite-callback regression was initially missed for exactly
this reason.

#### 3. Treat status as derived output, never a label to maintain by hand

"Supported", "blocked", and catalog grouping must come from one coherent full
hardware closure plus the current runtime certification. A source-resolved
type is not necessarily executable; a nested part may already be satisfied by
an executable host; and a declarative browser concept such as `SCREEN`,
`SPEAKER`, or `PALETTE` is not an emulated-device blocker.

When a game is reported blocked, classify every gap before coding:

| Reported gap | First check | Usual fix |
|---|---|---|
| Type is executable in the full manifest | stale/mixed target closure | clean full regeneration |
| Child is internal to a composite device | `hostTag`, `hostedBy`, nested config reachability | preserve `host:child` ownership |
| Screen/speaker/palette/timer is host-declarative | manifest status | correct capability classification |
| Source device has methods but no executable artifact | compiler diagnostics and unsupported syntax | extend generic device lowering |
| Map handler is missing | graph edge, map inheritance, submap lowering | fix extraction/closure before runtime |
| Report is playable but ROM stalls | cold boot, interrupts, callbacks, scheduler | fix behavior; do not relabel |

Do not bump a difficult game merely because the first report says blocked.
First determine whether the blocker is real, duplicated, hosted, declarative,
or an artifact of a stale build.

#### 4. Preserve nested machine ownership

MAME composite devices commonly call `device_add_mconfig` and create children
whose raw tags are generic (`cpu`, `pia`, `riot`, `pit`, `dac`). Those children
must retain the composite namespace (`soundbd:pia`, `soundbd:audiocpu`). The
same scoping applies to callbacks declared by the nested machine config, not
only to devices and ROM regions.

An unscoped callback can bind successfully to the wrong same-named cabinet
device and produce a plausible but dead machine. Verify all four together:

- emitted child device tag and `hostTag`;
- child CPU ROM region and address map;
- callback `ownerTag`;
- callback target/effect and the live runtime device it reaches.

Subdevice maps such as `map(...).m(m_riot, FUNC(...::ram_map))` must lower the
selected RAM/I/O submap, mirrors, and global mask. Zero-filled RAM or a generic
no-op handler is not a safe approximation.

Finder tags can also arrive through a templated device constructor rather than
the member declaration. A class may declare `optional_device(...DUMMY_TAG)` and
the selected machine config supplies `m_audiocpu`/`m_vlm` as macro arguments.
Do not resolve an empty finder to the first CPU. Preserve the configured
argument or, when lowering an already-typed member, resolve its member identity
(`m_audiocpu` to `audiocpu`). Track & Field silently delivered its sound IRQ to
the main CPU until this distinction was preserved.

#### 5. Callbacks are electrical connections, including during construction

A generated callback is not complete because it appears in `board.json`. Its
source signal must emit, every effect must bind, and assert/clear transitions
must reach the target. Composite devices implemented as source-compiled
handlers still own `devcb` members such as `m_pa_callback`; those delegates
need runtime emitters just like generated `Device` instances.

Construction and reset ordering matter. MAME wires machine configuration
before devices start or reset. Do not capture an unfinished effect/device table
by value in an early closure. Resolve it lazily when the signal fires, and add
a cold-start test that reaches the first real transition. Also replay source
initial latch output when the physical target would have observed it at power
on.

For every line callback, preserve the distinction between:

- asserted level and cleared level;
- `HOLD_LINE`, `ASSERT_LINE`, and a pulse;
- IRQ, NMI, reset, halt/bus request, and interrupt acknowledge;
- active-high and active-low transforms;
- callback data versus `(offset, data, mask)` conventions.

Dropping the clear edge often creates a boot loop; turning a held level into
repeated pulses often creates an interrupt storm.

#### 6. Multi-CPU boards need source scheduler facts

Correct clocks alone do not guarantee a working handshake. Preserve CPU clock
dividers, scanline/periodic events, device timers, and source calls such as
`config.set_maximum_quantum(...)`. Audio CPU, MCU, and main CPU communication
can fail when each processor runs the right total cycles in slices that are too
coarse or in the wrong line/event phase.

Low fps is not permission to reduce clocks, skip interrupts, raise generated
loop guards, or lower the acceptance threshold. First determine whether the
cost is an interpreter hot loop, a timer firing too frequently, duplicated
work at both scanline phases, or an incorrectly lowered busy-wait. Optimize the
generic generated path and differential-test it against the interpreter.

An error such as `generated handler loop exceeded 65536 iterations` usually
means the compiled control flow, callback, timer, or CPU-visible condition is
wrong. Raising the guard converts a diagnosable bug into a hang.

Keep extending the handler language for recurring source syntax instead of
copying a handler into game code. Named casts such as
`reinterpret_cast<u16 *>(byte_buffer)` must preserve the typed view, and MAME
frequency tokens such as `24_MHz_XTAL` must lower to numeric clock values.
Those two generic parser fixes removed Wardner's sprite and screen-update gaps
and made the Simpsons vblank callback executable.

#### 7. Rendering includes hardware side effects

A screen that looks right can still be unplayable. Video hardware may expose
collision latches, scanline IRQs, sprite buffering, priority flags, or partial
update timing to the CPU. A direct renderer must preserve those side effects,
not only draw equivalent pixels. Venture's treasure/room behavior depends on
the Exidy motion-object/background collision bits and IRQ, for example.

During active play compare:

- native orientation, visible area, crop, and render scale;
- tile/character RAM updates and dirty behavior;
- sprite code banks, enable bits, coordinate bias, clipping and wrap;
- transparent pen versus palette color zero;
- sprite/background and sprite/sprite priority and collision;
- PROM lookup order, palette bit wiring, endianness and RAM palette writes;
- buffered sprite RAM and partial/scanline update boundaries.

Title screens rarely exercise these paths. A golden must include moving
sprites, room/stage transitions, score areas, and at least one meaningful
collision or priority case.

#### 8. Audible output is not proof of correct audio

Keep these as separate milestones:

1. command/handshake reaches the sound CPU or device;
2. source registers receive writes during **gameplay**, not only boot;
3. the worklet renders non-silent PCM;
4. pitch, duration, waveform, envelope, filtering, gain, mute, and speech match
   MAME credibly.

A boot beep can satisfy a whole-run RMS floor while every game effect remains
dead. Require post-ready writes on the actual source paths (for example 8253,
6840, effects control, AY/YM registers, DAC, samples, or speech). Record method
counts and a PCM hash only after the contract has inserted a coin and started
play.

Timer chips have state beyond a divisor. Control-word writes, null-count state,
byte sequencing, gates, output polarity, and reload modes determine whether a
short boot tone stops or becomes an endless buzz. Likewise, a synthetic square
or sawtooth is not a substitute for a missing speech chip, noise path, sample,
or analog filter. Use the MAME audio A/B before approving "close enough".

#### 9. Inputs are protocols, not just key bindings

Confirm port tag, bit mask, polarity, impulse/edge behavior, player number,
cocktail mapping, service inputs, and DIP defaults. Some coin inputs reset a
CPU or feed a monostable instead of appearing as a stable readable bit. Test
coin acceptance visibly (credit count), then start acceptance, then sustained
gameplay controls. A keyboard event dispatched during self-test proves only
that the browser emitted a key.

#### 10. Separate ROM transport failures from emulation failures

Validate the same local ROM with the real-ROM harness before debugging a
browser fetch. A browser can report `ERR_FAILED 200 (OK)` because CORS,
content-encoding, range handling, or an object-store response header rejected
an otherwise successful HTTP response. Conversely, a successful fetch says
nothing about region assembly, device ROM sets, CRCs, transforms, or critical
ROM coverage.

Do not zero-fill a missing dumped chip and record the resulting screen. Include
device ROM sets, parent/shared files, region offsets, reload/continue/copy
transforms, and opcode/data views exactly as the generated manifest declares.

#### 11. Use a verification matrix, not one heroic test

Before declaring a game unblocked, obtain independent evidence for:

| Scenario | Required evidence |
|---|---|
| Cold boot, no input | reaches the same ready/attract state as MAME on a comparable timeline |
| Boot audio | starts and stops at credible times; no endless tone or buzz |
| Coin/start | credit changes and the game leaves attract mode |
| Active play | controls, sprites, colors, priorities and collisions behave |
| Gameplay audio | named post-boot device paths write and PCM is non-silent |
| Reset/reload | the same cold path works without stale browser/device state |
| Performance | fps floor passes with all real hardware behavior enabled |
| Browser | canvas and AudioWorklet run with no page/console error |

The source spec, compiler/device unit tests, no-input boot trace, gameplay ROM
contract, browser test, and MAME comparison catch different classes of error.
None substitutes for the others.

#### 12. Batch by reusable failure pattern

For a large target set, regenerate the full closure, group real blockers by
missing hardware/source shape, implement one shared capability, and regenerate
again. Good batches are "nested composite callback scoping", "hosted MCU",
"buffered sprite device", or "missing generated filter", not an arbitrary list
of game names. Re-run the status audit after each shared fix because one change
may correctly unblock several machines.

Keep the game token declarative and resist emergency game-name branches. A
branch that appears to fix one of forty games usually documents a missing IR
fact that will fail again on the forty-first.

For an audio A/B, give the comparison command an actual MAME executable.
MAMEKIT captures the emitted worklet from a clean power-on, MAME records its
own run with `-wavwrite`, and the tool writes both WAVs plus a spectrogram:

```sh
npm run audio:compare -- <target> \
  --mame /path/to/mame \
  --seconds 30 \
  --out .files/audio/<target>
```

This is optional when the machine has no audio. For a sound-capable new game,
use it before deciding that a write hash or merely audible output is correct.

### STEP 6: ADD THE PRESENTATION PACKAGE

The ROM is only the executable machine payload. A supported arcade game also
has a local, gitignored presentation package under `.data/`:

```text
.data/artwork/<target>.zip                  MAME bezel and default.lay
.data/artwork/covers/<target>.png           promotional flyer
.data/artwork/media/cabinets/<target>.png   cabinet photograph
.data/artwork/media/marquees/<target>.png   marquee scan
.data/artwork/data/history/history.xml      shared Gaming History dataset
.data/artwork/data/history/<target>.txt     optional curated story override
```

### CONSOLE CARTRIDGE PHOTOGRAPHY

A console room draws every catalogued cartridge itself, and uses real
photography wherever the machine's owner has it. Files live under the software
list name and are keyed by **softlist short name** — the same name the verified
dump zip carries, so `mame nes mario1` and `mario1.jpg` agree:

```text
.data/artwork/carts/<list>/<name>.<ext>           the whole cartridge, front on
.data/artwork/carts/<list>/<name>.sticker.<ext>   the label sticker only
```

`<list>` is the software list (`nes`), `<ext>` is `png`, `jpg`, `jpeg` or
`webp`. The two kinds are used differently, so both are worth having:

| file | used as |
|---|---|
| `mario1.jpg` | replaces the drawn shell entirely — a real cart on the shelf |
| `mario1.sticker.jpg` | sits inside the drawn shell's label, keeping the moulded plastic |

When both exist the **sticker** wins: it composites into the drawn shell, so a shelf of mixed art still reads as one set of cartridges. Crop the sticker tight to the
label edges; it is placed into the label rect and will stretch to fill it.

Which files exist is resolved two ways, so development never needs a rebuild:

- `npm run serve` exposes `/cart-art/<list>.json`, read from disk per request —
  drop a file in, reload, it is there;
- generation bakes the same index into `config.json`, which is what a deployed
  static site uses. `npm run gen -- <target>` reports how many cartridges it
  found art for.

The generated snapshot exists because a shelf shows thousands of cartridges:
letting the browser probe for art it does not have would mean thousands of 404s
per visit. The live route wins whenever it answers.

These are photographs of copyrighted labels: like every other artwork path they
are gitignored, and the deploy includes them only with `--artwork`.

Good first-stop catalogs are
[progetto-SNAPS](https://www.progettosnaps.net/) for MAME-named cabinets,
flyers, marquees, control panels, PCB photographs, snapshots and artwork packs,
and [Gaming History](https://www.arcade-history.com/) for stories. Record the
source of every asset. Catalog images can aggregate earlier collections, and a
surviving conversion cabinet is not evidence that a factory-standard cabinet
existed. progetto-SNAPS describes its cabinet images as free to use under fair
use; preserve its attribution and any named original contributor.

Generation prefers the optional curated `<target>.txt` when it exists,
otherwise extracts the target's story from Gaming History. It writes
`history.txt` and creates
`DOSSIER.md` from MAME source, git history, ROM/input/hardware facts and the
presentation paths. Artwork is intentionally not committed or included in CI;
deployment includes it only with `--artwork`. Validate the complete local
package after generation:

```sh
npm run audit:game-package -- <target>
```

The audit verifies real PNG data, the bezel layout and its referenced images,
the generated dossier, and a successfully extracted history entry.

### STEP 7: RECORD AND REVIEW THE CONTRACT

Only after manual verification:

```sh
npm run test:games:record
```

Review the candidate changes, then run the normal test:

```sh
npm run test:games
```

The recorder updates the token's `golden` object directly. Review its git diff
and discard unrelated baseline changes before running the normal test.

Do not update hashes merely to make a failing test pass. Explain whether each
change came from ROM assembly, CPU/device state, video, audio writes, generated
PCM, input timing, or an intentional source migration.

### STEP 8: VERIFY THE CURRENT WORKING SET

After clean generation, audits, real-ROM acceptance, presentation validation,
and browser validation all pass, regenerate every discovered machine from an
empty `dist` and verify that existing contracts remain unchanged.

```sh
npm test
```

Run `npm run test:generation` after broad changes to parsing, graph
reachability, IR schemas, hardware closure, output layout, or app registration.
It covers the wider required-target inventory and is intentionally more
expensive than the current-game CI gate.

### DEFINITION OF DONE

A machine is ready for the current working set when clean generation and both
audits pass, its runtime report has no hidden blocker, its real-ROM contract
and minimum fps pass, coin/start/gameplay/video/audio have been checked against
MAME and in the browser, its local artwork/history package is complete,
existing game goldens remain unchanged, and every new compiler rule has a
colocated reusable test. At that point the checked-in game-specific surface
should still be only `src/games/<target>.ts` and its adjacent spec.

## 5. TEST AND REVIEW REQUIREMENTS

Before submitting a change, run the smallest relevant checks while iterating,
then the complete applicable set:

```sh
npm run build
npm run test:unit
npm run test:current
npm run test:blast-radius       # every game; requires local ROMs
git diff --check
```

Generated-output changes should also be inspected with:

```sh
find dist -maxdepth 5 -type f | sort
du -sh dist/app dist/runtime dist/games
rg -n "app/modules|/src/|JSON\.parse\(\"\{" dist
```

A pull request that adds or changes a machine should state:

- MAME target and source revision used;
- parser, graph, IR, codegen, or runtime capabilities added;
- why each capability is reusable rather than game-specific;
- generated audit result;
- real-ROM contract result and measured fps;
- browser checks performed, including coin/start/video/audio;
- intentional golden changes and their cause;
- known approximations or unsupported MAME behavior.

CI checks source/compiler specs and clean generation against a pinned MAME
revision. CI has no ROMs, so a green workflow does not replace local real-ROM
or browser evidence.

## 6. SOURCE AND OUTPUT HYGIENE

- Use `apply_patch` or ordinary edits for source; never hand-edit `dist` as a
  fix because regeneration will replace it.
- Keep tests beside the source or game token they constrain.
- Keep JSON as data and generated TypeScript/JavaScript as behavior.
- Preserve provenance whenever lowering MAME behavior.
- Keep the worktree's unrelated changes intact.
- Do not commit ROMs, generated temporary build trees, local media, or machine
  paths.
- Update documentation when a new compiler boundary, IR contract, command, or
  accepted approximation changes how the next engineer should work.

The measure of a successful machine contribution is not the number of files
added. It is how much more MAME source the compiler can faithfully understand
while keeping the checked-in runtime hardware-neutral.
