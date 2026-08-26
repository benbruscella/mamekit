# SYSTEM ARCHITECTURE

This document is the canonical technical description of MAMEKIT. It explains
what the system compiles, why each intermediate representation exists, where
behavior is allowed to live, and how the generated browser application runs.

## 1. PURPOSE AND BOUNDARY

MAMEKIT compiles selected MAME source into small, inspectable browser exhibits.
The objective is not to support arbitrary C++, reproduce all of MAME, or hide
MAME behind WebAssembly. The objective is to preserve and expose the machine
knowledge encoded in MAME while producing executable browser artifacts.

The compiler is allowed to assume MAME conventions:

- `GAME`, `CONS`, ROM, input, graphics and device macros;
- MAME driver/state classes and machine configuration patterns;
- address-map builder syntax;
- MAME CPU opcode DSL files such as `z80.lst`;
- MAME device lifecycle and callback idioms;
- known source-tree organization.

These assumptions are a feature. They keep the compiler focused, inspectable,
and maintainable.

## 2. CORE TERMS

### SOURCE AST

A source-preserving, MAME-specific representation of classes, methods, macros,
statements and source spans. It is not a complete ISO C++ semantic model.

### KNOWLEDGE GRAPH

The dependency and provenance model for a driver. Nodes represent games,
machine configurations, devices, maps, handlers, callbacks, ROMs, inputs,
graphics layouts and source files. Typed edges record how those entities are
connected.

### INTERMEDIATE REPRESENTATION (IR)

A typed, serializable execution plan lowered from source. `BoardIR` in
`src/ir/` is the canonical one — the single contract every consumer derives
from — alongside focused IRs for the hardware it composes:

- board composition IR (`src/ir/board.ts`);
- handler program IR;
- CPU/opcode IR;
- device IR;
- video/palette/rendering IR;
- audio plan IR.

### HARDWARE CLOSURE

The reachable set of CPU, device, audio and DSL definitions required by the
selected generated targets.

### BROWSER HOST

The checked-in, hardware-neutral runtime responsible for browser APIs, buses,
generic IR execution, scheduling, input, ROM ingestion, canvas, audio transport
and application presentation.

## 3. END-TO-END DATA FLOW

```
MAME checkout
    |
    | discover target declaration and related source units
    v
MAME AST + macro/opcode DSL parsers
    |
    | retain MAME source spans and source text
    v
full driver knowledge graph
    |
    | graph reachability from game:<target>
    v
target machine subgraph
    |
    | lower facts and behavior through focused compilers
    v
typed machine + hardware IR
    |
    | emit JSON data and small TypeScript behavior modules
    v
temporary unified TypeScript build
    |
    | compile and copy only canonical outputs
    v
self-contained dist/
```

Each stage has one responsibility. Parser fixes recover source structure. Graph
fixes recover relationships. IR compiler fixes recover executable semantics.
Runtime fixes add generic operations. Game-specific patches in the browser host
are not an accepted stage.

## 4. SOURCE DISCOVERY AND PARSING

The CLI finds the MAME source declaration for a target and caches driver
discovery in `dist/.driver-cache.json`. MAME is normally a sibling checkout at
`../mame`; callers can override it with `--mame-src` or `MAME_SRC`.

`src/mame/ast.ts` builds a small source-preserving AST for the MAME C++ dialect.
It records classes, inheritance, methods, member macros, statements, macro
calls and source spans. It follows source patterns required by selected MAME
drivers without pretending to be Clang.

`src/kg/parse.ts` handles declarative MAME DSLs, including:

- game/system declarations;
- ROM sets, regions and loads;
- machine configurations and device creation;
- address maps and map composition;
- input ports, DIP switches and included port sets;
- graphics layouts and decode tables;
- clocks and evaluable constant expressions.

`src/mame/opcode-dsl.ts` parses MAME CPU operation-list DSLs separately from
C++. The Z80 compiler expands macros while retaining definition and call-site
provenance.

The parser should reject or report unsupported source shapes. Silent fallback
is dangerous because it creates plausible but incorrect machines.

## 5. KNOWLEDGE GRAPH

The graph is assembled in `src/kg/build.ts`. Its primary purpose is compiler
reachability and provenance; the HTML viewer and Cypher export are secondary
views of the same model.

### IMPORTANT NODE TYPES

| Node | Responsibility |
|---|---|
| `Game` | target identity, category, machine/input/ROM references |
| `MachineConfig` | machine configuration method and inherited/called configs |
| `Device` | type, tag, clock and source configuration |
| `AddressMap` | memory or I/O address-space definition |
| `AddressRange` | range bounds, storage kind, sharing and handler references |
| `Handler` | source method and lowered executable program |
| `Callback` | interrupt, latch, timer or device callback wiring |
| `RomSet` / `RomRegion` / `Rom` | ROM topology, sizes, offsets and hashes |
| `InputPorts` / `Port` / `PortField` | electrical polarity, bindings and DIP facts |
| `GfxLayout` / `GfxDecode` | graphics bit layout and region relationships |
| `SourceFile` | source ownership and provenance anchor |

Important edge types include `USES_MACHINE`, `HAS_DEVICE`, `HAS_MAP`,
`HAS_RANGE`, `READS`, `WRITES`, `CALLS`, `PATCHES_MAP`, `HAS_REGION`,
`LOADS`, `USES_INPUTS`, `HAS_PORT`, `HAS_FIELD`, `DECODES`, `USES_LAYOUT`,
and `DEFINED_IN`.

`gameSubgraph()` performs reachability from the selected `Game` node. This
subgraph determines what machine facts and behavior can be emitted. The
hardware closure separately follows device types into shared MAME hardware
source.

### GRAPH OUTPUT

Each generated target includes:

- `graph.json`: target-reachable graph;
- `graph.full.json`: full parsed driver graph;
- `graph.cypher`: idempotent Neo4j import;
- `viewer.html` and `viewer.full.html`: standalone graph viewers.

Graph output lives under `dist/games/<category>/<target>/`.

## 6. MACHINE AND HANDLER LOWERING

`src/gen/emit-machine.ts` creates the complete generated machine definition.
The serialized machine contains:

- CPU instances and clocks;
- program and I/O maps;
- generated handlers and callbacks;
- shared-memory and device plans;
- screen timing and frame events;
- compiled video plan;
- sound routing metadata;
- source locations for executable elements.

The board is emitted as `generated/board.json`. The adjacent `board.ts` is
intentionally small: it imports the JSON, decodes it through `decodeBoardIr()`,
and delegates construction to `createGeneratedBoard()`. Decoding is not a type
assertion — a stale or malformed artifact fails there, naming the JSON field
path and the MAME source line, instead of crashing deep inside execution.

Handler source is parsed into typed operations in `src/mame/handler-ir.ts`.
The operation vocabulary covers numeric expressions, state access, branches,
calls, memory/device access and returns needed by selected MAME methods.
Unsupported syntax produces diagnostics attached to generated reports.

The board IR is the contract between source lowering and browser execution.
It must not contain browser APIs or game-specific TypeScript classes.

### TYPED EFFECTS

`callbacks` records what the MAME source declared, with its spans.
`connections` records what the board actually does: each callback resolved to a
typed `BoardEffect` — a CPU pin with an explicit delivery mode, a device method,
a handler, a port read, a video or audio control, or an explicit `unconnected`
for MAME's `.set_nop()`.

`src/ir/lower-connections.ts` is the only place a MAME C++ method name is
interpreted, and it runs during generation. A callback it cannot resolve fails
the build with its source line. Previously the same regexes ran in the browser,
where an unrecognised name performed no operation and reported nothing.

Not every devcb drives a wire. A driver may append a
`scheduler().perfect_quantum(...)` request to a latch callback, asking for a
finer interleave the moment the far side has work; that lowers to a
`perfect-quantum` effect carrying the source duration rather than being
discarded as unconnected.

### SCHEDULING

MAME runs every processor to `min(basetime + quantum, next timer expiry)` and
executes timers only then, so what a processor does between two scheduled
events is atomic as far as the others are concerned. A board's frame events
are those timers, so the generated frame schedule hands over at their lines
rather than at every scanline.

Three things bound that interval. A board that schedules per-line work — a
periodic event, a scanline-updated screen — keeps the per-line cadence. So
does a board whose machine configuration calls `set_perfect_quantum`, which is
MAME's way of saying its processors share state through a handshake nothing
coarser survives. And every board is bounded by one millisecond, because
MAME's own quantum is bounded by all of its device timers and the timers
modelled here tick once per scanline: claiming a whole frame of atomicity
would claim more than the model supports.

`perfect_quantum` shortens the window for the duration the source asks for. It
does not run another processor from inside the caller's instruction stream,
which would let the far side answer before the caller has finished setting up
for the answer.

### ADDRESS-SPACE TAPS

Some hardware is invisible to an address map. MAME's `install_readwrite_tap`
lets a device watch every access on another device's space without answering
any of them, which is how a protection chip decodes the *sequence* of
addresses a CPU touches. The Atari slapstic is the example: the machine config
hands it a window with `set_range` and a ROM bank with `set_bank`, and neither
call appears in any map. `execution.accessTaps` carries that pair, and the
board installs a bus tap that offers each access to the device's own decoder.

### VALIDATION

`src/ir/validate.ts` cross-references the decoded board before it is written:
unique and resolvable device tags, every CPU present in the device list, frame
events naming real callbacks, banks that are actually configured, ranges inside
their address space, and handlers that were generated. Generation fails rather
than emitting a board that cannot be wired.

## 7. HARDWARE CAPABILITIES

`src/mame/hardware.ts` resolves the selected targets' hardware closure and runs
the capability registry over it.

A hardware family is one package under `src/hardware/<family>/`:

```
src/hardware/ym2203/
├── definition.ts   id, MAME types, ports, browser-facing constants
├── extract.ts      MAME source -> IR + emitted artifacts (compile time only)
└── acceptance.ts   probe against the emitted artifact in dist
```

`definition.ts` is neutral and shared by both sides. `extract.ts` may reach into
`src/mame` and never ships to the browser. `acceptance.ts` runs in Node against
`dist`, so QA validates the artifact that actually ships.

`src/hardware/registry.ts` lists the packages as explicit static imports — the
supported set is a compile-time fact that type-checks, with no dynamic loading.
`registry.spec.ts` reads the directory and fails when a package exists but is
not registered, so the convention does not depend on remembering.

Families whose MAME class is named per driver — a discrete soundboard is
`GALAXIAN_SOUND` in one driver and `INVADERS_AUDIO` in another — declare no
`mameTypes` and recognise the board by shape inside `extract()`. Recognition is
never by game or board name.

A capability that cannot lower a family returns undefined, leaving the type
unresolved in the manifest rather than marking it executable with nothing
behind it.

### CPU

CPU definitions combine MAME class/state information with source-derived
instruction programs. Z80 lowers MAME's expanded `z80.lst` opcode DSL. I8080
lowers the 256 cases in MAME's `execute_one` C++ switch, its helper methods,
state aliases and cycle tables. `src/mame/cpu-compiler.ts` and
`cpu-codegen.ts` produce executable TypeScript plus auditable CPU IR. The
browser runtime supplies generic register, bus and program-execution machinery.

### DEVICE

`src/mame/device-compiler.ts` follows MAME device inheritance and methods,
lowers executable methods to typed programs, and emits device IR. Small device
modules import that JSON and register it with the generic device runtime.

`src/mame/device-codegen.ts` identifies methods with nested hot loops and emits
direct, static JavaScript for those methods plus their source-defined
dependencies. Selection is based on IR shape, not a game or device name. The
generated module attaches compiled methods to the same device definition; any
method omitted by codegen continues through the generic IR interpreter. This
keeps the interpreter as the semantic reference while removing per-operation
tree walking from pixel-scale loops such as the MAME 05XX starfield.

Compiled device methods are build artifacts, not handwritten runtime ports and
not runtime `eval`. Colocated specs execute emitted source against the
interpreter and compare writes and complete device state. Unsupported
expressions are excluded during generation rather than guessed or tested
speculatively during browser registration.

### VIDEO

`src/mame/video-compiler.ts` resolves screen-update methods, palette behavior,
graphics decode, tilemap and sprite operations into rendering plans. It also
recognizes MAME's direct packed-bitmap loops and lowers their source arithmetic
to a compact bitmap plan. This avoids interpreting one handler operation per
pixel while retaining the source method and memory-layout provenance. The
generic video runtime executes either plan against ROM regions and shared
memory. Tile categories, groups and `set_transmask` layer masks remain explicit
IR. Drivers that call `screen.update_partial` select partial raster composition,
so mid-frame video RAM changes are rendered at the source-declared boundary
rather than from a torn end-of-frame snapshot.

A sprite engine shared across a hardware family is configured rather than
written: `atari_motion_objects_device` is one implementation whose behavior on
a given board comes entirely from the `atari_motion_objects_config` aggregate
the driver declares — which gfx set, how the four words of a sprite-RAM entry
are laid out, and which bits carry the link, code, colour, position, size and
flips. `src/mame/atarimo-compiler.ts` reads the struct declaration for its
field order and the driver's initializer for its values, derives each
word/shift/mask exactly as `sprite_parameter::set` does, and emits a
`video.motionObjects` plan the generic video runtime executes.

A declarative plan is always preferred, because data is inspectable. Where a
driver's palette callback computes its network in source rather than declaring
one — Mr. Do! builds its own sixteen resistor weights from parallel resistances,
a pull-down and a diode drop — the callback is instead lowered to handler IR and
executed once at machine start against the palette_device operations MAME's own
callback calls. The same fallback exists for a driver init that rewrites ROM
with no declarative shape (`src/mame/driver-init-compiler.ts`): Ms. Pac-Man
builds a whole second program bank out of address-scrambled, bit-permuted copies
of the Pac-Man ROMs, so the shape is the code. Both are last resorts, reached
only when nothing declarative was recovered from the same source.

### AUDIO

Audio families are capability packages over `src/mame/audio-compiler.ts`, which
lowers supported MAME audio implementations and emits AudioWorklet source plus
audio IR. Worklets live under
`dist/runtime/generated/audio` and import shared operations from
`dist/runtime/core` when required.

The current audio profiles include Namco WSG, AY8910 with generated RC routing,
and MAME `DISCRETE` soundboards, including SN76477 and counter/LFSR topologies.
Discrete plans emit port wiring, method roles, control nodes, LFSR parameters,
component values, mixer resistances and route gains from MAME. Every such board
uses the runtime capability `sound.kind = "discrete"`; `sound.worklet` selects
the generated MAME-device artifact in `dist`. Runtime and QA code must never
branch on a game or board-family name.

Norton op-amp stages are lowered to stable browser component models; MAMEKIT
does not yet implement MAME's complete analog discrete solver. The generated
IR records that boundary instead of hiding it in a checked-in game sound class.

A family's post-mix master gain is declared by its capability package and
written into the generated config, so the shell applies whatever the family
states rather than holding a table keyed by sound kind.

A board is rarely one chip. The chip that decides `sound.kind` owns the
worklet; every other chip routed to the same speaker is lowered as an entry in
`sound.auxiliaryDevices`, carrying its tag, clock and the gain its own
`add_route` gave it, and is hosted inside that worklet. Gauntlet is the widest
case: a YM2151 for music, a POKEY for effects and a TMS5220C for speech, all
three answering one two-input speaker.

Where a chip's engine runs is decided by what reads it back, not by what it
sounds like. A chip the CPU only writes to belongs in the worklet, and POKEY
is emitted that way — `src/mame/pokey-compiler.ts` reads its register map,
prescaler divisors, polynomial taps and output gain out of `pokey.cpp` and
emits an engine that runs MAME's `step_one_clock` once per chip clock.

A chip whose pins are wired back into a port the CPU polls cannot be, and the
TMS5220 is the case that forces the distinction. Its `/READY` pin feeds a port
bit the sound CPU tests before every byte it writes; ready depends on the FIFO
level, the FIFO level depends on how fast the frame parser consumes bits, and
the parser is the synthesiser. Splitting that across a worklet boundary means
keeping the chip's state twice, so the whole engine is emitted as a main-thread
device instead: a generated device IR whose methods are backed by compiled
JavaScript, loaded by the board exactly like any other generated device. Only
the PCM it produces crosses to the audio sink, forwarded a sample at a time
and resampled by the worklet against the chip's live clock — live because
Gauntlet's speech-squeak line retunes the chip while it is talking.

### DSL ARTIFACTS

Source-derived DSL AST/IR remains available as JSON for auditability. Data-only
artifacts do not get pointless JavaScript wrappers.

## 8. GENERIC RUNTIME

`src/runtime` is checked-in code, but it is not an emulated hardware library.
It has two responsibilities.

### GENERIC EXECUTION

- `../ir/execute.ts`: the neutral handler-IR interpreter, shared with the
  knowledge-graph builder so both agree what a lowered program means;
- `generated-effects.ts`: executes typed board effects;
- `generated-machine.ts`: registers decoded boards and wires device signals;
- `generated-board.ts`: composes generated CPUs, buses, devices and rendering;
- `generated-cpu.ts`: executes generated CPU definitions;
- `generated-device.ts`: instantiates generated device definitions;
- `generated-handler.ts`: evaluates handler programs;
- `generated-video.ts`: executes video plans;
- `generated-frame.ts`: schedules generated scanline/frame events.

The frame runner interleaves processors once per scanline and charges each
one's overrun to a carry, so a frame's cycle count stays exact. Device timers
run on a second clock, advanced by instruction-time deltas so an edge can land
between instructions, and **settled against the beam at every line boundary**:
the shortfall a slice did not deliver is paid there and the remainder carries
signed. That invariant is load bearing, not tidiness — device timers are armed
against raster positions (`screen().time_until_pos`), and a callback that
re-arms itself for "the next line" one line late gets MAME's answer, a whole
frame's delay, permanently. `time_until_pos` is answered in the timer clock's
own fractional line position for the same reason.

### BROWSER SERVICES

- `bus.ts`: builds memory and I/O buses from generated ranges;
- `shell.ts`: ROM validation, machine startup and frame presentation;
- `input.ts`: keyboard state, MAME polarity and DIP defaults;
- `audio.ts`: Web Audio startup and generated worklet transport;
- `menu.ts`: catalog and dossier presentation;
- `console.ts`: console cartridge workflow;
- `zip.ts`, `artwork.ts`, `cartstore.ts`: file and browser persistence services.

A checked-in file implementing a specific MAME CPU, sound chip, device, board,
or renderer is an architectural regression.

## 9. BROWSER BOOT SEQUENCE

1. `/app/main.js` imports the generated registry.
2. The registry registers shared generated CPU/device definitions and each
   target's canonical generated board.
3. The route `/app/g/<target>/` resolves the target's generated `dataPath`.
4. The app fetches `games/<category>/<target>/config.json`.
5. Arcade targets request a user-supplied ROM zip and validate every required
   chip against graph-derived names and CRCs.
6. Console targets open their cartridge room instead: the generated softlist
   catalog identifies a dropped or fetched dump by chip CRC, and the shell is
   handed the identified PRG/CHR regions with the cart's mapper, mirroring and
   battery injected into a clone of the board config.
7. The shell creates the generated board, starts frame scheduling, presents the
   framebuffer, and activates generated audio worklets after a user gesture.

Static route pages use `<base href="../../">`; runtime URLs are relative to
`/app/`. Game metadata carries `dataPath`, so app code never guesses whether a
target is arcade or console.

## 10. BUILD AND OUTPUT LAYOUT

Complete generation starts with `rm -rf dist`. Per-target generation writes
canonical source/data under `dist/games`. Hardware generation writes canonical
source/data under `dist/runtime/generated`.

`buildApp()` then:

1. removes prior app, runtime core and temporary build trees;
2. stages runtime source, generated hardware and generated boards under
   `dist/.build/src` with their final relative topology;
3. creates generated app entry and registry source;
4. compiles the staged tree with TypeScript;
5. copies compiled `app`, `runtime` and `games` groups into canonical locations;
6. removes `dist/.build`.

The final layout is:

```
dist/
├── app/                       only app HTML and compiled entry/registry
├── build-manifest.json        target set, capability closure, versions
├── runtime/
│   ├── core/                  compiled generic runtime
│   ├── ir/                    compiled neutral board IR
│   └── generated/             shared MAME-derived hardware
├── games/
│   ├── arcade/<game>/
│   └── consoles/<system>/
└── games.json
```

Generated game directories contain configuration, graphs, metadata, reports,
`DOSSIER.md`, and a `generated/` directory with `board.ts`, `board.js`,
`board.json` and `provenance.json`.

## 11. DATA AND BEHAVIOR RULE

Large structured values are emitted as JSON. TypeScript and JavaScript import
that data and provide behavior. The generator must not serialize JSON into a
`JSON.parse("...")` source string.

This rule reduces duplicated output, keeps diffs inspectable, lets archival
tools consume IR without executing JavaScript, and separates compiler data from
browser behavior.

## 12. PROVENANCE AND AUDITABILITY

Source spans flow from MAME AST nodes through graph properties and typed IR.
Generated callbacks, handlers, CPU operations and devices retain their MAME
source locations wherever the compiler can establish them.

Generated runtime reports distinguish:

- source-resolved hardware;
- executable generated hardware;
- declarative browser-host services;
- unresolved or unsupported generation gaps.

`audit:generated` decodes and validates every generated board, then verifies
canonical files, frame events, screen plans, hardware artifacts, registry
imports, absence of handwritten MAME runtime files, absence of duplicated app
modules, absence of embedded serialized IR, and self-contained browser imports.

It also refuses a mixed build. `dist/build-manifest.json` records the exact
target set, the capability closure, the BoardIR and graph schema versions, the
compiler version and the MAME revision. A `--targets` build regenerates the
closure for a subset while other targets' data survives, so a catalog and a
closure that disagree mean boards registered against a closure never built for
them.

## 13. CATEGORY MODEL

MAME arcade game declarations emit under `games/arcade`. Console/system
declarations emit under `games/consoles`. Category is source-derived and part of
the generated manifest/config contract.

Category helpers live in `src/gen/output-layout.ts`. New code should use those
helpers or generated `dataPath`; it should not construct legacy `dist/<game>`
paths.

## 14. CONTENT AND SECURITY BOUNDARY

MAME source is a generation-time dependency and is not shipped. MAMEKIT does
not publish ROMs. Arcade ROM bytes are accepted from the browser user, validated
in memory, and discarded with the page. Console carts may be persisted only in
the visitor's browser through the explicit console workflow.

AudioWorklet requires a secure context outside localhost. Production therefore
uses HTTPS. All static URLs remain relative so the distribution can run at a
custom domain root or a GitHub Pages subpath.

## 15. DESIGN TEST

Before accepting a change, ask:

1. Did this fact come from MAME source or the graph?
2. Is this behavior represented in typed generated IR?
3. Is checked-in runtime code hardware-neutral?
4. Is the generated artifact canonical, inspectable and source-linked?
5. Will the same lowering improvement apply to the next MAME driver with the
   same source shape?
6. Does a new hardware family arrive as one capability package, or does it need
   edits in several unrelated central files?

If the answer to any question is no, the change is probably at the wrong layer.
