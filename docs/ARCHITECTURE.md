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
generated code with no handwritten behaviour: it imports the JSON, decodes it
through `decodeBoardIr()`, attaches emitted JavaScript for the handlers whose IR
shape qualifies (`defined.compiledHandlers`, from
`src/gen/emit-handler-codegen.ts`; a couple of hundred lines for Pac-Man,
about 2,700 for the Spectrum 128), and delegates construction to
`createGeneratedBoard()`. Behaviour is emitted as source there rather than into
the JSON. The interpreter stays the semantic reference, and
`src/mame/board-codegen.spec.ts` checks the emitted handlers against it.
Decoding is not a type
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

Four things bound that interval. A board that schedules per-line work — a
periodic event, a scanline-updated screen, a driver's own `emu_timer` (below) —
keeps the per-line cadence. So does a board whose machine configuration calls
`set_perfect_quantum`, which is MAME's way of saying its processors share state
through a handshake nothing coarser survives. A board that declares a scanline
`TIMER` (`configure_scanline`) is bounded by that timer's increment, and every
line the timer fires on is a slice boundary whether or not its callback has
work there, because MAME ends every timeslice on it: MCR's scantimer fires
every line, Gauntlet's every 32. Every other board is bounded by 250
microseconds (`MAX_QUANTUM_SECONDS` in `src/runtime/generated-frame.ts`),
because MAME's own quantum is bounded by all of its device timers and the
timers modelled here tick once per scanline: claiming a whole frame of
atomicity would claim more than the model supports.

A processor that calls `scheduler().synchronize()` ends its slice after the
instruction in progress. The processors after it in the round run only up to
where it stopped, the posted work runs, and the round resumes, so no processor
observes the work before the time it was posted.

Inside that interval the round follows MAME's own rules (`timeslice` in
`schedule.cpp`, #217). Processors run in configuration order, and a device
suspended for the round (`suspend_until_trigger`) runs after the active ones,
as `rebuild_execute_list` moves it. Each runs whole cycles, and one left short
of the target by a fraction of a cycle ends the round there for the ones after
it (`target = max(m_localtime, m_basetime)`). No round is longer than the
machine's `set_maximum_quantum` (`execution.maximumQuantum`), and a
`perfect_quantum` window's rounds last MAME's perfect interleave: the second
shortest cycle time, times `execute_min_cycles()`, of every device that
executes (`execution.executeDevices`, read from each class's own source; the
6805 answers from its own state at run time). Donkey Kong's 400 kHz sound CPU
decides this way where each of its Z80's 16.7 µs rounds starts.

The round keeps time as MAME does (#220). Round bases, targets and each
processor's local time are whole attoseconds (`src/runtime/attotime.ts`). A
frame is past what a double holds exactly and a BigInt allocates, so a time is
two doubles, updated in place. The screen's `m_frame_period` is lowered into
the IR (`execution.screen.frameAttoseconds`): `HZ_TO_ATTOSECONDS(pixclock) *
htotal * vtotal` for `set_raw`, the truncated rate for `set_refresh_hz`. Lines
fall at `frame base + index * m_scantime`, a frame's base is a whole number of
`m_frame_period`s, and cycles come from `divu_64x32(delta >> m_divshift,
m_divisor)`. These truncate differently, and that decides which instruction an
interrupt lands before. Donkey Kong's VBLANK falls about 1e-6 of a cycle before
Z80 cycle 354816 in frame 8, so MAME's Z80 takes its NMI first. Its instruction
trace now matches MAME's for all 60 traced frames. Whole cycles can leave a
processor attoseconds short of a line, so reading the beam adds MAME's half
pixel (`delta += m_pixeltime / 2`).

Device timers still keep floating-point seconds, so a round bounded by one
allows 16 attoseconds either way (`TIMER_SLOP`): a timer armed for a whole number
of cycles has to land on that cycle.

Hosted MCUs and DSPs (the Namco 5x MB88s, the 68705, the TMS320C10) are round
processors like any other execute device, run in configuration order beside
their host (#222). One held in reset eats its slice, as MAME's
`SUSPEND_REASON_RESET` does. Run while held, Xevious's 51xx stood in its idle
loop when MAME's had just left reset. Only a `perfect_quantum` board still
delivers them between its host's instructions, where each slice is a cycle
already.

A round also ends at the soonest device timer, as `timeslice()` takes
`min(base + quantum, next timer)`. Device time is held short of that timer while
the round runs, and the devices are brought to the round's end when it closes,
so no timer fires before every processor stands at it. Whatever the clock's
driving processor ran past the timer is dropped rather than released, because a
slow MCU's whole-cycle pull can end the round short of the timer. Released
whole, it gave Galaga's 51xx the 06xx's chip select two instructions early.

A timer armed inside the round that becomes the soonest ends the running slice
and bounds the round, as `emu_timer::adjust` aborts the timeslice.

Work posted with `synchronize()` runs at its posting time, as MAME's zero-delay
timer does: the 06xx re-arms its NMI timer for the next clock edge after
`machine().time()`.

A CPU's cycle lasts MAME's truncated `HZ_TO_ATTOSECONDS(clock)`
(`m_attoseconds_per_cycle`). Every conversion between cycles and time uses that
period: the processor's local time, the device clock's per-instruction deltas,
`cycles_to_attotime`, and `attotime_to_cycles`, which divides by it.

Xevious's 3.072 MHz Z80 writes the 06xx exactly on its 48 kHz clock's edges,
and MAME's time stands a hair short of each. Counted exactly, the 06xx's NMI
timer started an edge late, the 50xx missed a command, and the game reset in a
loop. With only the local time truncated, the Game Boy PPU's
`attotime_to_cycles(now - m_last_updated)` came a cycle short, and Tetris left
MAME at frame 341.

With all of this, Galaga's, Dig Dug's and Xevious's 06xx traffic matches MAME's
byte for byte.

A round device measures the timers it arms from the round's base, where
MAME's `machine().time()` stands through the timeslice. Ours otherwise stands
where the processor driving the device clock has reached, and that processor
ran first. A timer armed this way can be overdue already, so the next round
starts by firing every due timer (`execute_timers`), and a periodic one catches
up the periods it missed.

Pole Position's 52xx enables its MB88 serial timer, one tick per MCU cycle,
partway through its slice, and reads SB nine instructions later. Measured from
the device clock, no bit had shifted in, and the 52xx took the wrong boot path;
its speech came out of step with the game.

That bound is squeezed from both sides. Too coarse and a fast processor runs
thousands of cycles while the one it is handshaking with waits, which is how
Gyruss lost half of its sound writes and Juno First a third — both boards
where an 8 MHz i8039 feeds a DAC under a slower CPU's direction. Too fine and
a driver's own `perfect_quantum` request stops meaning anything, since a boost
cannot shorten an interval that is already the shortest one available. It is
an empirical bound; the derived version is to lower the device timers MAME
clamps its own timeslice against, which would make the cap redundant wherever
a board schedules real work.

`perfect_quantum` shortens the window for the duration the source asks for. It
does not run another processor from inside the caller's instruction stream,
which would let the far side answer before the caller has finished setting up
for the answer.

A bus master takes the bus from a processor through the processor's own pin.
`Z80_INPUT_LINE_BUSREQ` lowers to a `busreq` line naming that constant, and
the core's own `execute_set_input` takes it. The Z80's service block grants
the bus at its next instruction boundary through `busack_cb`, which the
machine wires to the master (the Z80 DMA's `bai_w`, the 8257's `hlda_w`).
Then it hands back its slice (`m_icount = 0; return;`). Both the emitted and
the interpreted core park there instead of fetching. A parked core looks
again at MAME's next timeslice: the soonest device-timer expiry, or the end
of the slice, which the machine's quantum bounds (`CpuBus.parked`). While Mario's Z80
DMA transfers, its periodic timer is one DMA clock away, so the Z80 resumes
within a clock of the bus coming back, as in MAME. Donkey Kong's 8257 runs on
no timer, and its machine's 60 kHz quantum has the Z80 look every 16.7 µs.
The 8257 is a bus master in the round like any execute device, so its sprite
DMA reads and writes land on MAME's cycles and the Z80 takes the bus back in
the round MAME's does (#214, #217).

A driver's own `emu_timer`s -- allocated with a real callback in
`machine_start` and armed there, where no frame event or scanline timer already
reaches the callback -- are lowered as generic timers and schedule the board by
the line. MAME ends a timeslice at every one of their expiries, and they are
armed against raster positions: Missile Command re-arms its IRQ 32 lines on from
inside the callback, and a round spanning several lines measured each re-arm
from a beam the device clock had already run past. A timer fires after the line
boundary has settled the device clock, for the same reason.

A processor's clock may change as it runs (`set_unscaled_clock`, which Missile
Command uses to halve its CPU for the lines video fetches steal). The frame
runner takes the new rate from that line on, and the board keeps a time epoch
per processor so the cycles run before the change keep the rate they ran at.

### ADDRESS-SPACE TAPS

Some hardware is invisible to an address map. MAME's `install_readwrite_tap`
lets a device watch every access on another device's space without answering
any of them, which is how a protection chip decodes the *sequence* of
addresses a CPU touches. The Atari slapstic is the example: the machine config
hands it a window with `set_range` and a ROM bank with `set_bank`, and neither
call appears in any map. `execution.accessTaps` carries that pair, and the
board installs a bus tap that offers each access to the device's own decoder.

### BANK DEVICES

`address_map_bank_device` is an address space with no processor of its own:
the driver reaches it with `read8`/`write8` and moves its window with
`set_bank`. Its `set_map` names a driver map, which is lowered with exactly the
range rules a CPU's program map uses and carried as `execution.bankDevices`;
the board builds a bus from it and answers the driver's calls on the device's
finder. Missile Command's whole CPU map is a trampoline into one.

A `memory_bank` configured in `machine_start` is lowered the same way whatever
backs it: a ROM region, driver-owned storage, or a RAM device's own bytes
(`configure_entries(0, 8, m_ram->pointer(), 0x4000)`, the 128K's eight pages,
counted from the RAM device's configured size and unrolled from the loop that
configures the bank array). A handler that indexes a bank directly reaches it
through `base()` and `entry()`. A driver member bound with
`space(AS_PROGRAM).specific(m_program)` (or `.cache`) is carried as
`execution.spaceAccessors` and reads and writes through that processor's bus,
so the 128K's opcode fetch runs the same handlers its data reads do.

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
├── runtime.ts      browser-side wiring of the generated artifact (optional)
└── acceptance.ts   probe against the emitted artifact in dist
```

`definition.ts` is neutral and shared by both sides. `extract.ts` may reach into
`src/mame` and never ships to the browser. `acceptance.ts` runs in Node against
`dist`, so QA validates the artifact that actually ships. A package that needs
browser-side wiring (15 of the 31 today, the sound families among them) adds a
`runtime.ts`; the sound families' installers are selected by sound kind in
`src/hardware/sound-runtime-registry.ts`, which imports only `runtime.ts`
files. `buildApp()` copies `src/hardware` into `dist/runtime/hardware` minus
`extract.ts`, `acceptance.ts`, `registry.ts`, `acceptance-registry.ts` and
specs, so everything else
in a package -- `definition.ts`, `runtime.ts` and their helpers -- crosses the
boundary.

`src/hardware/registry.ts` lists the packages as explicit static imports — the
supported set is a compile-time fact that type-checks, with no dynamic loading.
`registry.spec.ts` reads the directory and fails when a package exists but is
not registered, so the convention does not depend on remembering.

Families whose MAME class is named per driver — a discrete soundboard is
`GALAXIAN_SOUND` in one driver and `INVADERS_AUDIO` in another — declare no
`mameTypes` and recognise the board by shape inside `extract()`. Recognition is
never by game or board name.
The shared runtime does not branch on a machine's game or family either:
`src/runtime/architecture.spec.ts` fails on any such conditional, so a special
case has to become extracted IR or a capability selected by a MAME device type
or handler shape.

A capability that cannot lower a family returns undefined, leaving the type
unresolved in the manifest rather than marking it executable with nothing
behind it.

### CPU

CPU definitions combine MAME class/state information with source-derived
instruction programs. Z80 lowers MAME's expanded `z80.lst` opcode DSL. I8080
lowers the 256 cases in MAME's `execute_one` C++ switch, its helper methods,
state aliases and cycle tables. A core's own devcb lines answer `isunset()`
from the lines the machine connected (the bus's `boundSignals`), so a 6502
skips its SYNC output twice an instruction when nothing listens, exactly as
MAME's `if (!m_sync_w.isunset())` does. `src/mame/cpu-compiler.ts` and
`cpu-codegen.ts` produce executable TypeScript plus auditable CPU IR. The
browser runtime supplies generic register, bus and program-execution machinery.

A 6502 subclass that changes only its memory interface -- Data East's
encrypted DECO CPU-7 and C10707 -- is the stock operation list with its bus
primitives routed through the subclass's own `mi_*` overrides, lowered from its
source. The fetch is lowered from MAME's `prefetch_start`/`prefetch_end`, so the
SYNC line (`sync_cb`, `get_sync()`) rises around the opcode read and an
interrupt is taken only after that read, as MAME takes it.

The 6502 family's reset is an instruction, not a call. MAME's `device_reset`
only sets `m_inst_state = STATE_RESET`, and the operation list's `reset`
sequence -- three stack reads and the vector at `$FFFC` -- runs as the core's
next instruction, seven cycles on the clock with its reads on the bus. The
compiler records that as `resetInstruction` when `device_reset` says so, and
the first step after a reset runs it. Run inside `reset()` instead, the
sequence cost nothing: every 6502 started seven cycles early, and a bus trace
was two reads short of MAME's (#184).

A call converts each argument to its parameter's declared integer type, as a
C++ call does, in the emitted and the interpreted core alike. The 6502's
`set_l(uint16_t base, uint8_t val)` is handed `m_SP + 1`, and unconverted it
moved the stack from `$1FF` to `$300` instead of `$100`, and put every
page-crossing dummy read on the wrong page (#184).

A Z80 is a `z80_daisy_chain_interface`, and its chain is compiled with it:
`daisy_chain_present`, `daisy_update_irq_state`, `daisy_get_irq_device` and
`daisy_call_reti_device` from `machine/z80daisy.cpp`, so the core takes an
IM 2 vector from `intf->z80daisy_irq_ack()` of the device that is
interrupting and tells the chain about RETI, as MAME's does (#181). The
machine's `set_daisy_config(mcr_daisy_chain)` names the devices through a
`z80_daisy_config` table, which may sit in another file of the driver
(`mcr_m.cpp`); the graph resolves it to tags, the IR carries them as the
CPU's `daisyChain`, and the board does what `daisy_init` does with them:
links each device's `m_daisy_next` and puts the first in the CPU's `m_chain`.
Those two are wiring (`link` on a CPU member), never part of a save state.

A core's `state_add` table is part of its IR (`stateEntries`): each state
index, the register or member it names, and whether `.callimport()` follows a
write with the core's own `state_import`. That is MAME's
`set_state_int`/`state_int`, through which a snapshot loader restores a whole
Z80 -- a new PC restarts the core's instruction pipeline there, as MAME's
import does.

### DEVICE

`src/mame/device-compiler.ts` follows MAME device inheritance and methods,
lowers executable methods to typed programs, and emits device IR. Small device
modules import that JSON and register it with the generic device runtime.

`src/mame/device-codegen.ts` identifies methods with nested hot loops and emits
direct, static JavaScript for those methods plus their source-defined
dependencies. Selection is based on IR shape, not a game or device name. The
generated module attaches compiled methods to the same device definition; any
method omitted by codegen continues through the generic IR interpreter.
Emitted code reaches host and cross-device calls through a per-runtime links
table (`runtime.links`, declared by the module as `compiledMethodLinks` or
`compiledHandlerLinks`): the bindings' calls dictionary carries close to two
thousand names and V8 keeps it in dictionary mode, so a constant-key read of
it is a hash probe, and a memory path that makes a dozen per bus access spends
a third of its frame on them. The runtime resolves the module's names once
into a small fast-mode table and rebuilds it whenever a binding changes. This
keeps the interpreter as the semantic reference while removing per-operation
tree walking from pixel-scale loops such as the MAME 05XX starfield.

Besides loop shape, a method is emitted when it is a hardware entry point by
MAME's own spelling: a bus handler takes `offs_t offset` first, a write-line
takes `int state`, a read-line takes nothing and is named `*_r`. These have no
loop for the shape rules to see and run on every access or edge -- the 1541's
gate array raises BYTE READY on its VIA's `write_ca1` six thousand times a
frame. A helper class the device allocates (`new daisy_entry(...)`) has every
method emitted with it. Two constructs have a direct form when their types are
known: `a = b` between members of the same struct type copies field by field
through a per-type copier instead of the runtime's keyed copy, and an iterator
accessor on a `std::vector` (`buf.begin()`) asks the container instead of
probing a dereferenced first element. A local whose address is all a method
uses -- the CBM tape format's `fill_wave` hands `&p` to the writer that
advances it -- is passed as the lvalue-backed pointer the interpreter builds;
a local the method reads again after the call stays interpreted.

Size counts as much as shape, because V8 inlines a function only while its
bytecode stays under a few hundred bytes, and a C64 memory access is a chain of
small handlers (`read`, `read_memory`, `read_pla`, the PLA) run forty thousand
times a frame. The emitter keeps fast paths inline and cold ones out: a board
call through a member that no binding answers is one `runtime.memberCall`
rather than an inline ladder spelling every argument twice; a device's absent
member answers the constant 0, which is all its runtime would return; a tree of
constants folds to its value even when a leaf is a device's `const` member (the
VIC-II compares its `m_variant` against every chip it could be); and a
device's fixed C array, which an indexed write never rebinds, is read once per
method instead of at every store.

A floppy drive is a device like any other (`src/hardware/floppy/`,
`src/mame/floppy-compiler.ts`): `floppy_image_device` and its mechanism class
from `imagedev/floppy.cpp`, the `floppy_image` track store from
`lib/formats/flopimg.cpp`, and every format the connector registers through
`set_formats` (`fr.add(...)`) compiled from `lib/formats`. Mounting follows
`floppy_image_device::call_load`: each format identifies the bytes, a matching
extension adds `FIFID_EXT`, the best scorer loads a `floppy_image` of the
drive's geometry, and the drive's own load path (`mount_image`, lowered from
`call_load`'s success branch) takes it from there. Only the bytes are the
host's.

A device's constructor is not run on the board, but what it sets is part of
the device. Its initializer list is read as constants; a pointer it aims at a
file-scope table (the AY-3-8910's `m_par(... ? &ay8910_param :
&ym2149_param)`) holds a copy of that table, the choice made with the
constructor's own arguments. Its body is interpreted once at generation, base
class first, against those values and with the device's own methods
callable, and what it changes becomes the members' initial values: the AY's
three resistor loads and the envelope step and mask `set_type()` picks. A
struct the device holds by value may carry methods of its own (`tone_t::
set_period`); they are compiled per struct type (`structMethods`) and each
value of that type carries them, not enumerable, so a copy or a save state
sees only the fields. The Sunsoft 5B, an AY-3-8910 on an NES cartridge, made
no sound until all of these held (#171). An initializer names the member its
own class sees: the Irem G-101 declares a `const u8 m_prg_mask` of its own,
hiding the cartridge interface's, and sets it to `0x1f` through its delegating
constructor. Keyed by bare name, the value went to the interface's member and
the G-101's stayed 0, so every `$A000` bank write mapped bank 0 and Image
Fight never left its boot code (#184). The input ports a device declares
itself (`device_input_ports`) are recorded with it as their power-on values
(`inputDefaults`): a cartridge's DIP switches and jumpers exist only once
that cartridge is chosen, so the machine's own ports never name them, and a
`required_ioport` the machine does not declare reads the device's default.
Read as an unknown port they were all ones, which expired Nintendo Campus
Challenge 1991's competition timer at power-on, held every one of Karaoke
Studio's microphone buttons, and set Sachen's jumper to the wrong game.

The constructor chain is followed as C++ follows it (#203). Overloads are
chosen by type as well as count: only a brace list binds a struct parameter.
An argument with no number travels down the chain as its text, so a brace
list becomes a struct member through that struct's own inline constructor,
static class tables included. The 6805's `m_params` is built that way, its
opcode table and address width with it. An `address_map_constructor` handed
down to an `address_space_config` gives the device a mapped space of its
own: the 68705's ports, timer, RAM and EPROM, and the Namco MB88s' and the
NES PPU's maps. A function template is instanced wherever the machine names
it, not only in the device's own source: in the boards' machine config
(`m_pit->set_clk<0>(SH8253_CLOCK)`, kept by the graph as `set_clk_0`), through
the device's finder in a handler (`m_audionmi->in_w<0>(1)`), or qualified by
one of its classes in a map (`FUNC(input_merger_device::in_set<0>)`). An
XTAL parameter is its frequency. The unscoped enums at file scope in
`src/emu` are constants for a device whose code names them (drawgfx.h's
`DRAWMODE_*`), except where the runtime numbers a name its own way
(`INPUT_LINE_NMI`). A device whose source only makes sense after the C
preprocessor says so by including a file that is not a header: Midway's
T-Unit video includes its `.ipp` blitters, and the 6805 core includes
`6805ops.hxx`. When such a device does not lower as written, it is compiled
again with its hierarchy's files preprocessed. Each file follows its own
directory, and any header elsewhere whose function-like macros it calls.
A device that lowers as written is never preprocessed.

A device whose `device_start` reads what the board binds after composition
starts after it, as MAME starts it after configuration. LATCH8 sets
`m_has_write` from `isunset()` on each write callback, and Lady Bug's video
device creates its background tilemap there; started first, the latch never
forwarded a write and the tilemap was not yet the video plan's.

A device may be a wrapper over a library MAME bundles. Every Yamaha FM chip
is one over ymfm in `3rdparty/ymfm`, which source discovery follows like
`src/devices`. The Konami VRC7's DS1001 holds a `ymfm::ds1001` (an
`opll_base`), which holds an `fm_engine_base<opll_registers>`, which builds
nine `fm_channel`s and eighteen `fm_operator`s with `std::make_unique`
(#188). Each of those is a plain C++ class, compiled as a held object (the
6805's timer is another): its own hierarchy, members and methods, built by
its source constructor when its owner is. A constructor chains to its bases
through their initializers (`ds1001(...) : opll_base(intf, data ?: defaults)`)
and builds a held object from its own arguments (`m_fm(intf)`). A class
template is compiled once per instance, its parameter replaced by the
argument everywhere, constants included (`RegisterType::OUTPUTS` is
`opll_registers`'s). A type spelled through `using` aliases resolves across
classes: the device's `ChipClass::output_data` is `ymfm_output<2>`, a struct
template instance with its own fields and methods. A class's own constants
shadow what the files around it declare: OPLL's register file is `0x40` bytes
where an OPL3 header in the same sources says `0x100`. A static method of
another class (`RegisterType::channel_offset(chnum)`) is lowered where it is
called. A method that takes an argument by non-const reference marks it on the
call (`references`), so a caller passes storage it writes back to:
`m_regs.write(regnum, data, keyon_channel, keyon_opmask)` hands back the
channel a register write keyed on. Emitted code calls a held object's methods
directly. The DS1001's output is sample for sample what native ymfm gives for
the same writes, and its emitted code renders it four times faster than real
time.

A device built out of an array of devices builds one per element. The Z80
CTC declares `required_device_array<z80ctc_channel_device, 4> m_channel` with
the finder `(*this, "ch%u", 0U)`, and its `device_add_mconfig` adds them in a
loop and numbers them: `m_channel[ch]->m_index = ch`. The compiler gives the
child its tags (`children[].tags`, `ch0` to `ch3`) and runs
`device_add_mconfig` once against a stand-in for each element, keeping what it
stores into a child's members (`children[].configured`); the member then holds
the four channels, and the owner reads and writes their state through it
(`m_channel[ch]->m_int_state`). A channel finds its CTC with
`m_device(*this, DEVICE_SELF_OWNER)`, MAME's `^`, and asks it for the clock:
`m_device->clocks_to_attotime(16)`. A child added with no clock has clock 0,
as in MAME; only `DERIVED_CLOCK` takes its owner's. A reset follows
`device_t::reset`: the device, then its children, then
`device_reset_after_children`, then `interface_post_reset`. A namespace-scope
`const` is a constant like a `static` one: `const uint8_t Z80_DAISY_INT =
0x01;` in `z80daisy.h`, which unread made every daisy device's interrupt
request 0.

A method that only names a member, by reference, is that member wherever it
is called. The Z80 DMA declares `u16 &REG(unsigned m, unsigned s) { return
m_regs[REGNUM(m, s)]; }`, names every register through it (`#define WR0
REG(0, 0)`), and assigns through it. Such an accessor is inlined like a
function-like macro (`referenceAccessorMacros`), and a `#define` naming one
expands with everything built from it. Unexpanded, each register was a bare
name, and every register read 0 with no diagnostic. Two pointers into one
array differ by a count in every path, which the DMA's `GET_REGNUM(_r)`,
`(&(_r) - &(WR0))`, relies on to number its follow bytes.

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

A device can read the picture back. MAME's NES Zapper asks the screen for
`update_now()` and then `pixel(x, y)` to see whether its sensor is pointed at
light. The device-facing screen answers both: `update_now()` composes the
picture up to the beam whatever the board's update mode
(`GeneratedVideoRenderer.updateNow`), and `pixel()` reads that picture back
as an `rgb_t`, so above the beam the gun sees this frame and below it the
last one, as in MAME's screen bitmap. A board that composes once a frame
still draws every line at its end, so what is presented does not change.

A sprite engine shared across a hardware family is configured rather than
written: `atari_motion_objects_device` is one implementation whose behavior on
a given board comes entirely from the `atari_motion_objects_config` aggregate
the driver declares — which gfx set, how the four words of a sprite-RAM entry
are laid out, and which bits carry the link, code, colour, position, size and
flips. `src/mame/atarimo-compiler.ts` reads the struct declaration for its
field order and the driver's initializer for its values, derives each
word/shift/mask exactly as `sprite_parameter::set` does, and emits a
`video.motionObjects` plan the generic video runtime executes.

A vector generator is a generated device when MAME's source for it lowers:
Battlezone's AVG runs its own state-machine timer, reads the display list
through its `required_address_space`, and hands every beam endpoint to
`vector_device::add_point`. The vector display itself is presentation -- MAME
passes the same list to its render container -- so the host keeps the list and
the video plan (`vector: { type: 'device' }`) only names the generator whose
list it is. Asteroids' DVG still runs through the older host executor.

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

Such a program runs against a fixed environment, so it must read nothing that
environment does not supply: an unbound name evaluates to zero, which looks
exactly like hardware that reads zero. A file-scope table the callback indexes
(the Game Boy's `palette_gb[]`) is folded into it as `TABLE(...)`, and a
callback that still reads an unbound name does not lower (`unboundIdentifiers`
in `src/ir/walk.ts`, shared with the driver-init lowering).

### AUDIO

Audio families are capability packages over `src/mame/audio-compiler.ts`, which
lowers supported MAME audio implementations and emits AudioWorklet source plus
audio IR. Worklets live under
`dist/runtime/generated/audio` and import shared operations from
`dist/runtime/core` when required.

Generated configs select one of fourteen `sound.kind` values: `ay8910` (with
generated RC routing), `sn76489`, `ym2203`, `ym2151`, `wsg` (Namco WSG), `dac`, `sid`, `tia`, `nes`, `gameboy`, `berzerk`, `exidy`,
`stream`, and `discrete` for MAME `DISCRETE` soundboards, including SN76477 and
counter/LFSR topologies. Discrete plans emit port wiring, method roles, control nodes, LFSR parameters,
component values, mixer resistances and route gains from MAME. Every such board
uses the runtime capability `sound.kind = "discrete"`; `sound.worklet` selects
the generated MAME-device artifact in `dist`. Runtime and QA code must never
branch on a game or board-family name.

A board whose only sound is MAME's own stream devices -- the Spectrum's
`SPEAKER_SOUND` beeper and its `CASSETTE`, routed to the speakers, or a POKEY
-- is `sound.kind = "stream"`: each device's `sound_stream_update` renders on
the main thread as the processor runs (the speaker forces an update on every
level change, as in MAME, and a POKEY on every change of its output), and the
routed mix is played by the shared stream worklet. A board with a chip as well
(the 128K's AY-3-8912, Gauntlet's YM2151) keeps the chip's worklet and adds
the streams to its mix (`streamDevices`). A device's `set_output_gain` scales
its stream there, as Gauntlet's mixer does to its POKEY.

A `SAMPLES` device is a stream device too, compiled whole from `samples.cpp`,
because a driver reads it back (`playing` decides whether Zaxxon restarts a
sample). Zaxxon and Space Panic are `sound.kind = "stream"`; Congo Bongo,
Carnival, Q*bert and TMNT mix it beside their chip through `streamDevices`.
It allocates one stream a channel and moves each to the rate of the recording
it starts (`set_sample_rate`), so the mixer renders such a device channel by
channel at those rates, keeps each channel's absolute source index, and reads
the speaker's samples through MAME's `audio_resampler_lofi`, with the tables
in `hardware/speaker/lofi-interpolation.ts` that the worklets share. A device
with one stream at the speaker's rate, or above it, keeps the plain path.

The recordings are the player's own. `load_samples` runs from MAME's source
against a host `emu_file` over `BoardConfig.samplePath` (`runtime/sample-path.ts`),
which the shell fills from the sets this browser keeps, and the acceptance
harness from `.data/samples/<set>.zip`, the same sets the MAME oracle passes as
`-samplepath`. `flac_decoder` wraps libFLAC, which is no MAME source, so that
format is answered there, for the mono 16-bit files `read_flac_sample` takes. A
missing set leaves its samples empty and the machine runs, silent on those
channels, as MAME does; the game's page and its details say which set is
missing. Because `playing` then answers differently, the sets count towards the
machine's identity, so a save or a netplay room tells the two apart.

A cartridge can carry a sound chip of its own: the MMC5's pulse and PCM
channels, the VRC6, the Namco 163. The card builds it in its own
`device_add_mconfig` (`VRC6(config, m_vrc6snd, XTAL(21'477'272)/12)
.add_route(ALL_OUTPUTS, "addon", 1.0)`), and the device compiler records that
child with its own clock and its routes (`children[].clock`, `.routes`), so a
chip that is not clocked like its card keeps MAME's clock and MAME's gain.
The slot reports the stream-rendering devices of the card it holds, tagged
as MAME tags them (`nes_slot:exrom:sound`), through `streamDescendants()`.
The NES sound runtime hands them to the same stream mixer the Spectrum
uses, at each route's gain relative to the APU's own route, and posts the
mix to the NES worklet as `stream.pcm`, which plays it beside the APU. A chip
that allocated its stream at its own clock (the MMC5 and VRC6 at 1.79 MHz,
stepping once a sample) is rendered at that rate and averaged down to the
speaker's 48 kHz; a stream at `machine().sample_rate()` is rendered as is.
A chip whose MAME source does not lower is left out of the card rather than
approximated: the card is still built, that chip is silent, and the
definition says so (`omittedChildren`, with a warning at generation). A
chip with firmware of its own (the VRC7's DS1001, its instrument patches in
`ds1001.zip`) puts that ROM in the machine's `roms` tagged with the cards
that need it (`cards: ["vrc7"]`), at the tag MAME gives it
(`nes_slot:vrc7:vrc7snd:internal`). `mountCart` keeps it only for a
cartridge on one of those boards, so a VRC7 cartridge asks for `ds1001.zip`
the way the ColecoVision asks for its BIOS, and no other cartridge does.

Norton op-amp stages are lowered to stable browser component models; MAMEKIT
does not yet implement MAME's complete analog discrete solver. The generated
IR records that boundary instead of hiding it in a checked-in game sound class.

An AY8910 routed into a `DISCRETE` network gets `sound.discreteMixer`. A
network of streams, adders and resistor mixers keeps its linear sections. One
that carries an op-amp filter or mixer, a CR filter or a multiply lowers to
`discreteMixer.graph`: every node in MAME's step order with the equations of
its MAME node class, in real volts, so op-amp rails clip where the circuit
does. Any node or variant outside that set leaves the network unlowered rather
than approximated. A per-channel `AY8910_DISCRETE_OUTPUT` chip also carries
its `set_resistors_load` values as `sound.resistorLoads`, which shape each
pin's volume curve as `build_single_table` does.

A family's post-mix master gain is declared by its capability package and
written into the generated config, so the shell applies whatever the family
states rather than holding a table keyed by sound kind.

The YM2151's mix has none: its routes are MAME's, so it matches MAME's level as
it stands. A route to one channel of a stereo target counts half, because the
browser plays one channel, the average of MAME's two.

A board is rarely one chip. The chip that decides `sound.kind` owns the
worklet; every other chip routed to the same speaker is lowered as an entry in
`sound.auxiliaryDevices`, carrying its tag, clock and the gain its own
`add_route` gave it, and is hosted inside that worklet, or, when it renders
its own stream, is mixed beside it (`streamDevices`). Gauntlet is the widest
case: a YM2151 for music, a POKEY for effects and a TMS5220C for speech, all
three answering one two-input speaker.

Where a chip's engine runs is decided by what reads it back, not by what it
sounds like. A chip the CPU only writes to can live in the worklet. A chip
the CPU reads back cannot, because its state would have to exist twice.

POKEY is read back: `RANDOM` is its polynomial counter where the chip stands,
and the pots, `IRQST` and `SKSTAT` are its registers. So it is compiled whole
from `pokey.cpp`, an ordinary generated device. It is a
`device_execute_interface`, and the board runs it as MAME's scheduler does:
in the round beside the CPUs, in configuration order. Inside a CPU's slice it stands where
the round last left it, so a read finds `RANDOM` there, and the read's own
`synchronize()` ends the slice so the next one finds it caught up. While it
runs, the time is its own, so the stream update its `step_one_clock` forces
lands where the output changed. A 6502 synchronizes between bus cycles
(`position` in the frame runner), and the round ends there.

The TMS5220 is the case that forces the distinction too. Its `/READY` pin feeds a port
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

The paths that run on every access are kept direct. A bus calls an emitted
`(offset)` read or `(offset, data)` write with its arguments, a signal hands a
wired handler its arguments in declaration order, and a device mapped into an
address space is reached through its prepared call, its declaration read once
at install; none builds a record per access, and each re-resolves its handler
runtime only when a binding changes. That runtime is a fast-mode object: built
as a literal with a getter it was a V8 dictionary, and every `runtime.members`
read in every emitted board handler was a hash probe. A processor finder serves
the processor services it never re-resolves (`total_cycles`, the VIC-II's
question at each of its cycles) from a plain object in front of the Proxy that
answers every other name, and a device referent caches its call target until a
binding changes.

A clocked peripheral without firmware (the C64's VIC-II and CIAs) runs after
every instruction for the cycles it is owed. The fractional remainder lives in
a plain array during play and is written into the save-state record
(`hostedCarry`) only when a save is taken, then read back from it on a load.

The frame runner interleaves processors in rounds that end at the schedule's
boundaries (see SCHEDULING), so a round may span several scanlines, and charges
each one's overrun to a carry, so a frame's cycle count stays exact. Device timers
run on a second clock, advanced by instruction-time deltas so an edge can land
between instructions, and **settled against the beam at every line boundary**:
the shortfall a slice did not deliver is paid there and the remainder carries
signed. That invariant is load bearing, not tidiness — device timers are armed
against raster positions (`screen().time_until_pos`), and a callback that
re-arms itself for "the next line" one line late gets MAME's answer, a whole
frame's delay, permanently. `time_until_pos` is answered in the timer clock's
own fractional line position for the same reason. A target within half a pixel of
the beam counts as passed and lands a frame on, as MAME's
`targetdelta <= curdelta + m_pixeltime / 2`. Without that rule, Metal Slug's
auto-animation timer, firing a hair short of VSSTART, re-armed for no time
until it hit the runtime's firing limit.

A round spanning lines runs on its last line, so at the boundaries before it
the beam has moved on while no processor has run. Paying those lines would run
the device clock a round ahead of the processors, and a timer armed against the
beam would then read two different beams: the running processor's inside a
slice, the device clock's at a boundary. On a board where a generated device
arms a timer against the beam (the NES 2C02, the TMS9928A, Konami's 005849),
the settle therefore puts the device clock where the primary processor
actually stands: behind the beam by the lines its round has not run, ahead of
it by whatever its last slice overran, which an NES OAM DMA makes four lines
(#155: the 2C02 lost a frame on every round and never reached VBLANK). A board
whose rounds end at timers (see SCHEDULING) follows the processors too: span
pre-pay put Dig Dug's device clock ahead, and its MCU read the 53xx a nibble
early. Under a perfect quantum, the beam stays the reference.

MAME's screen starts at the beginning of VBLANK: `time_until_pos` measures
from `m_vblank_start_time`, which is zero at power-on, so the beam stands at
`vbstart` at time zero and the first VBLANK comes a whole frame later. Its
frames run from one VBLANK to the next, and so do ours (`origin: 'vbstart'`):
a frame runs lines `vbstart` to the last, then 0 to `vbstart - 1`, and is
presented at its end, when the beam is back at `vbstart`. A frame's
boundary is therefore MAME's frame boundary: the frame is presented, its RAM
can be read and the next frame's input takes effect at the instant MAME's
`frame_update` does all three (#184). How far through a frame the machine is
-- the stamp on every sound write, a trackball's travel handed out within the
frame -- is measured from the line the frame started on; measured from line 0
it ran backwards across the wrap, and Gyruss's and Mat Mania's sound CPUs
played their writes out of order. Nothing fires on the origin line in the
first frame: MAME arms its first VBLANK and its scanline timers a frame out
from a position the beam already stands on.

A line's events (its `screen_vblank` edges, a scanline TIMER's callback, a
`set_vblank_int`) fire where the beam reaches the line, before the processors
run it: MAME's timer for line L expires at L's start. They used to fire after
the line had run, which put every board's VBLANK one scanline late. Under the
`vbstart` origin that is a whole line into each frame: Donkey Kong took its
VBLANK NMI 192 cycles after MAME, one instruction further on, and its attract
mode parted from MAME's at frame 5. Fixed, its first three NMIs land on MAME's
cycle, Mr. Do!'s and Popeye's RAM match MAME's at every frame, and Congo Bongo
is pixel-exact at every compared frame (#214).

Frames running from line 0 put the NES's first VBLANK 2491 cycles ahead of
MAME's (241 lines in, not 263). Twenty-two lines is no whole number of passes
of any loop, so Terao no Dosukoi Oozumou's `inc $47` spin loop was interrupted
at a different point and seeded the game from a different count. A first
version kept frames running from line 0 behind a lead-in from `vbstart`; that
presented at the right instant but applied input 22 lines after it, which a
game reading its pad in the VBLANK NMI then saw a frame late (a 4-in-1
multicart's TMNT demo drifted two frames). With frames running VBLANK to
VBLANK, 22 more NES cartridge boards are pixel-exact at frame 1500 (294 of
344), Green Beret's RAM matches MAME's to the byte at 300 and 600, and Pac-Man
compares at frame offset 0 (#184). A reset starts at the origin again. A
screen whose VBLANK starts at its last line + 1 or beyond (the Spectrum's 311
of 0-310, Missile Command's 256) wraps to line 0, where its frames already
start and end.

Presenting the frame is an instant in device time as well. MAME takes its
snapshot in `vblank_begin`, a timer armed a frame earlier, so it runs before
any device timer due at that same instant; a renderer that asks one of them
`remaining()` is told zero. Until the frame is presented, the board holds
device time just short of the start of line `vbstart` and delivers the rest
after it (`awaitingPresent`), and the presentation reads every timer from that
instant (`withGeneratedPresentTime`), however far short of it the devices'
clock stands. Only the schedule's own deliveries are held: a processor whose
last instruction runs past the instant and reads or writes a device finds it
where the processor stands, held time first. Held there too, the 2600's RIOT
timer read stale and the game drifted from MAME's RAM after 190 frames. Held
time is device time on its way: the line settle counts it as delivered, or
each line held the same shortfall again, and a device reading the beam inside
a slice reads it that far behind the processor. The 2C02's `render` draws the line in progress only while its
scanline timer has time left; at MAME's snapshot it has none, so MAME's picture
keeps line 239 from the frame before. Ours drew the current one, which was the
only difference left on Castlevania III (Europe), Akuma Densetsu, two
multicarts and Super Mario Bros. run without input (#184).

Before the first line boundary the device clock is credited with one line, so
that boundary owes the devices nothing. That credit is bookkeeping, not the
beam: the screen a generated device reads (`time_until_pos`, `vpos`) measures
from the origin. The NES 2C02 arms its first scanline tick in `device_start`
with `time_until_pos(1)`; measured from the credited line it was the line the
beam already stood on, so the tick came a whole frame late and every NES title
ran a frame behind MAME's (#171). A driver's own beam reads during
construction keep the credited line: nine arcade boards read it there, and
each first timer would move a line (#155).

Inside a device timer's callback, `machine().time()` is that timer's expiry,
recorded when it was armed, as MAME's scheduler sets it before the call.
Recomputing it from the processor's cycles less the overshoot lands a few
attoseconds off, and source that compares the two exactly -- the 64H156's
`cur_live.tm > machine().time()` at every syncpoint -- takes the other branch.
A delay too small to move a double of the clock's size still advances the
expiry by one unit, as attotime would, so a callback re-arming "a hair later"
finds time moved. A timer due within 10^-10 s of where the clock stands is
due: MAME fires a timer whose expiry a slice ends exactly on before the next
instruction, and left a rounding hair short, Green Beret's line-80 NMI came an
instruction late at frame 388 (#184). A device holds an attotime as its seconds: every accessor
MAME spells on one is answered for a number, and two readings compare by
value.

Under `set_perfect_quantum` with more than one processor the frame runner runs
in permanent lockstep: whichever processor is furthest behind executes one
instruction. Each such slice has a one-cycle target, so the overrun the core's
closing `timing()` cannot report is delivered to the device clock once the
slice is booked; without it the clock moved a cycle per instruction.

Device time is delivered between instructions, so on its own a device timer
that falls due partway through an instruction fires after it. MAME's 6502
family stops between an instruction's cycles (the core keeps `m_inst_substate`),
which puts such a timer before the instruction's later accesses; the CPU
compiler records that as `suspendsMidInstruction`, read from the core's own
header. For a timer-clock processor with that fact, a device asking
`machine().time()` from inside an instruction first has the device clock caught
up to the cycle the processor stands at, including whatever its previous slice
overran, which the line settle would otherwise only pay when the line closes.
Without it the C64's datassette sometimes stopped itself on Play: its read timer
fired late with an earlier time than the motor write it followed, and MAME's
cassette refuses a negative position. A core without the fact keeps the old
order. Our Z80 is one, though MAME 0.289's is not: `z80make.py` can leave an
instruction after any of its cycle charges, so MAME's Z80 stops at a frame
boundary inside an instruction where ours finishes it first. Mario's RAM
differs from MAME's at frame 19 by one byte, a write 3 cycles past the
boundary that both make at the same instant and file under different frames
(#214).

On such a processor a register access goes further. MAME's scheduler stops the
core at a timer's expiry, so an access on cycle k finds every timer due before
cycle k + 1 already fired; the board catches device time up to the access
before a generated device's `read` or `write` runs, whether the bus reaches it
directly or a driver handler calls it. MAME's generator expands `prefetch()`
around the opcode read with the suspension point between the two, so the
interrupt poll after a fetch on cycle k sees timers due before k + 2: device
time is delivered two cycles into each instruction before it starts. Without
both, the 2C02's VBLANK flag set during a `BIT $2002` was read a loop pass
late, and its NMI, four cycles after the flag, came an instruction late
whenever it fell due inside a fetch (#184). Both catch-ups stop short of
their end for a timer: one due exactly where the access (or the poll) falls
fires after it, as MAME's does, which matters for counters ticking on whole
cycles such as a VRC4's IRQ prescaler.

Three rules keep those deliveries honest. A timer that fires inside one reads
the beam where the delivery stands, not at the instruction's start, or a
scanline tick re-arms that many cycles late. A timer armed inside another
timer's callback runs from that callback's expiry, so it is credited the
delivery's backlog as it is armed and takes nothing more from that delivery
(`IrTimer.adjust`; the board brackets each delivery): counted from the
delivery's end, the 2C02's NMI fired the VBLANK tick's overshoot late. And once
the line settle has paid a slice's overrun, nothing of it is still carried for
a catch-up to pay: paid twice, an OAM DMA's overrun ran the 2C02 264 cycles
ahead of the CPU.

A device that executes on its own under `set_perfect_quantum` is caught up one
cycle short of that. There every slice is one processor cycle with the
processor first, and MAME's 6502 counts a cycle after its access, so an access
on cycle k finds a device such as the VIC-II or a CIA through cycle k-1; the
device runs cycle k after it. The board catches such a device up to that point
before its `read` or `write` runs, and the two-cycle lookahead does not apply
in lockstep, where each slice is one cycle already. Delivered after the instruction instead, the
VIC-II showed a colour write up to an instruction early, and every C64 raster
bar landed a few cycles ahead of MAME's.

Within one delivery the hosted and autonomous processors are clocked up to a
timer's expiry before its callback runs (`setGeneratedTimerPreFire`), and
through the rest of the delivery after the last: MAME fires a timer once every
device has run to it. Firing every timer due in an instruction first and then
clocking the CIAs through the whole instruction set the datassette's FLAG bit
on a CIA still standing at the instruction's first cycle, so its interrupt
pipeline could assert up to an instruction early. The KERNAL's tape reader
measures each pulse from inside that interrupt, and those few cycles were
enough to misframe Crazy Comets' program block on one PLAY phase in eight
(`?LOAD ERROR`) where MAME loads it at every phase (#161).

One timing difference from MAME's C64 remains, recorded rather than fixed. The
frame is presented at the instant MAME takes its snapshot (see the origin
above), when MAME's VIC-II, which keeps its own raster from time zero, is at
the end of its frame. Ours is not quite there: the 6510 keeps the exact XTAL
quotient (985,248.44 Hz) where MAME's `device_t::clock()` is the u32 every
generated device already gets, so the VIC-II drifts 0.009 cycles a frame
behind the processor. Past about 40 s one row near the top of the picture
(row 11 at frames 2400 and 3000 of the BASIC screen) comes from the other
frame. Matching it changes every target's cycle count, so it waits for a
change of its own. Before the origin moved (#184) the frame was presented at
raster 284, with the bottom 16 rows a frame old.

A driver's `machine_start` is not run on the board, but what it writes into a
root RAM device is: the generator interprets the function with only that
device's `pointer()` and `size()` live (`ramPowerOn`) and records the result as
`memoryAllocations.<member>.runs`. MAME's C64 lays its RAM out in alternating
64-byte runs of `$00` and `$FF`, and Cauldron copies its first SID frame from
memory it never wrote.

A shared RAM block the driver fills in `machine_start` is treated the same
way. `sharePowerOn` (`src/mame/ram-compiler.ts`) runs the function with only
that member live, as the share's bytes, and the result becomes one of the
board's `initialShares`, written into the share before the first frame. The
NES fills its 2 KB with alternating `$00` and `$FF` "for software that depends
on its contents at boot up", and zeroed RAM read differently from MAME's
wherever a game had never written.

A slot card that carries a processor of its own -- the C64's 1541 in `iec8` --
is composed into the board under the slot's tag (`iec8:c1541`, its devices
below it), and its handlers run against a card scope whose member aliases name
the card's own devices. Those devices tick on the card processor's executed
cycles, not the board's timer clock: the 1541's gate array must never run
ahead of the drive CPU that reads it, which is what MAME's global time order
guarantees. `machine().phase()` answers INIT while the board is built, RESET
while it resets and RUNNING otherwise; the 1541's VIA port handler ignores what
it is driven to during reset, exactly as in MAME. The data members the card's
classes declare are recorded with it (`cardMembers`), including those of an
interface base declared with the bus rather than the card: the IEC bus's
`add_device` writes `m_bus` and `m_slot` into every drive, so no handler of
the drive's own assigns them, and without the declaration the 1541's serial
port handlers could not be compiled.

A slot can also be booted empty, as MAME's `-iec8 ""` boots it: the host
option `BoardConfig.emptySlots` names the slots, and `withEmptySlots` takes out
everything under each one's tag -- the card's devices, its processor, the devcb
wiring between them and the connections it drives -- while the slot device
stays and selects no card (`slot: ''`). The card's firmware regions sit under
the same tag, so the shell stops asking for them. With the 1541 gone the C64 is
one processor again and leaves permanent lockstep, which is what a tape title
gains from booting without it.

A slot with hundreds of cards does not ship them in one module. The NES
cartridge slot's 390 compiled boards are one module each under
`runtime/generated/devices/<slot>/`, and the slot's definition lists them
(`slot.cards`, option to module; `slot.loadCard`, module to its import).
Before a machine is built, `loadBoardSlotCards` (`src/runtime/generated-board.ts`)
imports only the card it will hold: the host's slot card, else the one the
slot's own `get_default_card_software` picks for the image (`slotCardForImage`
runs that method on a probe device without building the machine), else the
slot's default. An option whose card did not compile loads nothing
(`slot.unsupported` says why), and the slot is built empty, as MAME builds an
unknown one. Every card inherits the slot's interface class
(`device_nes_cart_interface`), and compiled separately each repeated it: 92 KB
of every 108 KB card. The slot carries those methods once (`slot.cardInterface`)
and a card refers to each one it compiled identically by its index there
(`src/ir/card-interface.ts`); a card's own override stays in the card. A bus
range the driver installs only for some cards carries them (`range.cards`):
the NES's `machine_start` maps `read_h` over `$8000-$ffff` only for the 34
boards that answer reads there, the MMC5 and the Datach among them, so the
range exists only while one of them is in the slot.

Calls that arrive by name -- a slot handing a bus access to its card, a card
asking its PPU for the draw phase -- go through the target's prepared call
(`preparedCall`, one per method, kept), never an overload search per access,
and a finder onto a device that is no processor keeps each answer on itself,
so its Proxy trap runs once per name. The MMC5 makes ninety thousand such
calls a frame, and Castlevania III ran at 40 ms a frame until both held (#171).

### BROWSER SERVICES

- `bus.ts`: builds memory and I/O buses from generated ranges;
- `shell.ts`: ROM validation, machine startup and frame presentation. The
  page is the machine and then its control panel: the screen goes at the top
  and one panel under it, sized to the width of the glass above it so the two
  read as one cabinet. Two rows -- a nameplate carrying a vent at each end, an
  instrument inboard of each and the machine's name in the middle, and a well
  of buttons under it. The name used to sit above the screen *and* be
  rewritten into the status line below it once a second, and prose about
  which zips to drop went through a gauge meant for `61 fps · pc=098f`:
  startup prose now goes on the screen being asked to accept the files.
  What a button *opens* rather than *does* -- the key legend, the shelf of
  saves -- opens as a popover above that button; only the two-player lobby is
  a modal, because it is a flow you are in rather than a drawer you pull out.
  Neither takes anything from the page, which the saves shelf used to do by
  joining the column and shrinking the machine every time it opened;
- `input.ts`: port state, MAME polarity, SOCD and DIP defaults, with the
  keyboard as one edge source. Every source posts what its control did and
  `advance()` settles the ports once per frame, so a machine only ever sees
  input at a frame boundary -- which is what lets a session say which frame an
  event belongs to and replay a peer's press into exactly that frame; a relative control's frame of travel is handed
  out against the board's `frameFraction()` (MAME's `frame_interpolate`), so
  a trackball counter read mid-frame sees a share of the frame, not a lump.
  That boundary is also where a lever is resolved, because a real one moves
  inside a gate: the generated binding carries MAME's own `PORT_nWAY`, and
  `digital_joystick::frame_update` decides once a frame which of the four
  switches reach the port. A `PORT_4WAY` machine was built knowing its square
  gate cannot hold a diagonal -- Donkey Kong's ladders, Pac-Man's maze -- so
  MAME resolves a diagonal by favouring the direction that just changed, and
  an unresolvable one falls to the horizontal axis. Nothing here reads a game
  name: the gate, the lever a switch belongs to and which switch it is are all
  derived from the generated `type` and `ways`. Opposite directions are the
  one deliberate departure. MAME zeroes both, because on a cabinet the pair
  can only mean a broken switch; a keyboard rolls one arrow onto the other
  routinely, so the newest press wins and releasing it hands the lever back.
  Either way the port never sees both, which is all the machine assumes. A
  press and a release that both land between two frames are held for one frame
  rather than cancelling, so a tap during a stall still reaches the machine;
- `gamepad.ts`: the other edge source -- the W3C Standard Gamepad layout
  mapped onto MAME input types, so which fields a pad drives comes from the
  generated bindings' `type`, never from a device or a game. The API has no
  events, only a snapshot the browser refreshes once a display frame, so the
  pad is read once per animation tick rather than once per emulated frame: a
  catch-up used to read the same snapshot several times over and never once in
  between. A pad the browser could not map may put its lever on a POV hat,
  which centres outside an axis's own range -- the only thing separating it
  from an analog stick resting at zero, and therefore how one is recognised.
  A Sony pad (DualShock 4, DualSense) is the same standard layout, so it
  drives the same fields; only the legend changes, naming the caps the way
  Sony prints them (□ △ ✕ ○, L1/R1, Share/Options), found by the USB vendor
  id the browser folds into the pad's id;
- `pointer.ts`: the third source -- mouse travel over the screen (a spinner
  or arcade trackball is a USB mouse) turns the generated relative pairs
  (dials, trackballs) by MAME's own `PORT_SENSITIVITY`, one pixel per
  sensitivity/100 units with the fraction carried across frames, and moves an
  absolute paddle (`IPT_PADDLE`, the NES Vaus) by the same travel between the
  two ends its key halves drive it to (`addPaddles`);
- `natural-keyboard.ts`: the fourth -- MAME's natural keyboard, text in and
  key presses out. Which key and which shift key make a character comes from
  each key's generated `PORT_CHAR`s, a character no key makes is typed as
  MAME's own `charinfo` alternate (kept per machine to what its keys reach),
  and the pace is MAME's, in emulated time: a step every 50 ms (200 ms on a
  carriage return), the shift key a step before the key. It is how a paste
  reaches a computer and how a title the software room booted starts itself;
  ticked only on frames that run, so a room's two machines see the same
  presses;
- `lightgun.ts`: the light gun -- MAME's `IPT_LIGHTGUN_X`/`Y` hold where the
  gun points across the visible screen, so the pointer's position over the
  screen is the aim and its primary button the trigger (the NES Zapper).
  Which fields are axes and which button is the trigger comes from the
  generated bindings' `lightgun` facts and the controller they belong to.
  A controller only some titles fit is a slot card, and its bindings carry
  the card they belong to (`card: "ctrl2:zapper"`). `bindingsForCards`
  (`input.ts`) keeps them live only while that card is fitted, so the NES's
  pad and its Zapper never answer the same port at once. Which card a title
  fits comes from its software list's `peripheral` feature, matched against
  MAME's control-port option names (`peripheralCards`): Duck Hunt fits the
  Zapper and Arkanoid the Vaus, as `-ctrl2 zapper` and `-ctrl2 vaus` would. A
  card's own `PORT_CHANGED_MEMBER` is delivered to the card through its slot
  (the Zapper's trigger arms a timer, and the card reads the timer);
- `audio.ts`: Web Audio startup and generated worklet transport;
- `machine-state.ts`: save states -- a structural walk that captures every
  container the execution model holds (an emitted core's own fields, a
  device's members, shares, timers, the frame schedule's carries) and writes
  it back IN PLACE, so every alias and hot-path link survives a load. A
  runtime class names its state through `stateKeys()`; a board-composed model
  that once lived in a closure registers its record through the board's
  `hostModel()`; a closure a CPU slot may hold (its interrupt vector source)
  is a `namedStateFunction`. Nothing here knows a chip: what is saved is
  whatever the generated definitions declared. A record whose key set is
  itself data -- driver state, a device's members, the board's lazily
  allocated resources -- is restored key set and all, so a slot the machine
  had not made when the save was taken goes back to not existing; where the
  key set is fixed, a key the save lacks is a gap in the walker and is
  reported instead;
- `savestore.ts`: the visitor's own save states (IndexedDB `mamekit-saves`),
  keyed by machine, ROM-set hashes and board facts so a save never loads into
  a different machine;
- `session.ts`: who is playing, which frame the machine is on, and every input
  event that got it there. Playing alone is a session of one with no input
  delay, so the run loop has one path and a room only adds a second player, a
  few frames of delay and a peer to wait for. It also decides which control
  reaches which player: a joystick and its buttons belong to whoever is
  playing that player, so a joiner's own controls drive player two and the
  other player's are dropped rather than fought over; coin and start are
  buttons on the cabinet instead, so the host works both and a joiner's own
  pair reach their own slot. Each frame is published exactly once, because
  the run loop asks whether it may run far more often than there are frames
  and a second publish would discard everything pressed in between;
- `netlink.ts`: the WebRTC data channel between two browsers, and the offer
  and answer codes that set it up. The signalling that ships needs no server:
  the host's offer travels in the invite link and the joiner's answer comes
  back as a code to paste, so the site stays static. A room service would
  replace only those two hops;
- `netplay.ts`: the two-player lifecycle -- the lobby, and putting both
  machines back to the state they booted in so a room starts from one agreed
  place. The machine is held while the lobby is open, because setting a game
  up takes a minute of copying a link into a conversation and the cabinet
  does not care -- but never while a room is live: two machines in a room run
  in lockstep, so a browser that stops running frames stops publishing them
  and the other player stands still waiting for input that is not coming. The lobby is a state machine over the handshake rather than a form:
  with no server to pass an offer and an answer through, the two players are
  the transport, and that is three hops nothing can remove -- so each one is a
  single action (share, or copy; a paste anywhere on the page; connect) and
  the dialog always names the hop it is on. It opens over the screen instead
  of joining the page column, so a lobby no longer resizes the machine behind
  it, and leaving a game is its own labelled button rather than a second
  meaning for the control that opened the lobby. Neither browser sends the other a ROM or a machine state: only which
  control moved, on which frame. A room never runs faster than the board's
  own refresh: the frames an input delay keeps in hand are not a backlog, so
  time for a frame the room would not let run is handed back to the timestep
  rather than spent on an extra one;
- `machine-memory.ts`: what MAME keeps when the machine is switched off --
  every share or region an `NVRAM` device declares, and the target's
  hiscore.dat rows (compiled into its config by `mame/hiscore-dat.ts`) run
  exactly as MAME's hiscore plugin runs them: wait for the game to initialise
  its table, put the kept bytes in through the CPU's own bus, write them out
  when they change. The board answers `persistentMemory()` from its decoded
  device list and `memory(row)` from its CPU buses and shares, so no part of
  this knows a chip or a game;
- `memorystore.ts` and `romstore.ts`: where that memory (IndexedDB
  `mamekit-memory`) and the visitor's own arcade sets (`mamekit-roms`) are
  kept, keyed by machine alone so both outlive a rebuild;
- `controls.ts`: the one look the shell's own controls wear -- the pill
  buttons on the control panel, their drawn glyphs, the panels a deck opens,
  and the tones that keep a control which throws something away from looking
  like the one beside it. Shared rather than copied: the two-player pills were
  green among gold ones because the lobby had its own copy of the painter. The
  glyphs are drawn on one 24-unit grid in the button's own colour rather than
  typed as emoji, which are a different picture on every platform and several
  of which are unreadable at this size;
- `menu.ts`: catalog and dossier presentation;
- `console.ts`: console cartridge workflow;
- `software.ts`: computer software workflow, one shelf per software list;
- `zip.ts`, `artwork.ts`, `cartstore.ts`: file and browser persistence services.

A checked-in file implementing a specific MAME CPU, sound chip, device, board,
or renderer is an architectural regression.

### HOST FEATURES: MAMEKIT-SPECIFIC VERSUS MAME-DERIVED

Not everything the application does is a MAME fact. The boundary is drawn
around *what the machine does* versus *what the exhibit does with the
machine*:

| MAME-derived (generated, never handwritten) | MAMEKIT host feature (handwritten, hardware-neutral) |
|---|---|
| CPU opcode semantics and cycle charges | run loop, timestep, fast-forward |
| device registers, timers, callbacks | input sources: keyboard, gamepad, pointer, light gun, natural keyboard, and any remote player |
| address maps, shares, taps, port polarity | ROM ingestion, validation and the picker |
| video plans, palettes, tilemaps, sprites | canvas presentation, artwork, box-art snapshots |
| sound chip DSP and routing | Web Audio transport and worklet hosting |
| screen timing and the frame schedule | menu, dossier, console and software rooms |
| DIP defaults, coin and start bindings | persistence: cart and ROM stores, save states, session logs |
| NVRAM and battery semantics | keeping that memory between sessions, in the visitor's browser |
| which bytes hold the score table (hiscore.dat) | when to load and write them, and where they are kept |
| what a machine's state *is* | capturing and restoring that state |
| configuration switches (PORT_CONFNAME) and their settings | a Machine settings toggle, kept per title |
| the keys a driver declares and what each types | the on-screen keyboard that presses them |
| what a machine's state *is*, a disk in its drive included | a title's resume point |

A host feature is legitimately MAMEKIT's own design and owes MAME nothing:
it does not need a MAME counterpart, a source span, or a lowering rule. What
it does owe is hardware neutrality. It must reach every board through the
generic execution model -- a generated definition's declared members, the
regions and shares the board composed, the port bytes the input model owns,
the frame runner's schedule -- and never through a per-machine list, a
per-family adapter or a check on a game's name. A save-state walker that
enumerates `definition.members` is a host feature; one that knows which
registers a Z80 has is a hardware implementation and belongs nowhere in
`src/runtime`.

The computer room's host features follow that test. **Machine settings**
are the driver's own configuration switches: every PORT_CONFNAME with two
settings becomes a toggle (the C64's "Swap joystick ports", which its driver
reads to swap the two control ports), and a title whose usage note asks for a
setting presets it (`switches` on its catalogue entry, from the generator's
`usageSwitches`). The **on-screen keyboard** (`src/runtime/onscreen-keyboard.ts`)
is the driver's keys, each cap the PORT_CHAR it types or MAME's name for it,
placed on a generic QWERTY grid by the characters it types, with the keys a PC
has no key for on a row of their own. **Resume** is one automatic save state
per title, written whenever the page is hidden and loaded the next time the
same title boots on the same machine. MAMEKIT never writes a disk back:
MAME commits a dirty image to its file on unload, and that commit stays with
the image host, so what the machine writes lasts while the disk is in the
drive. A disk is writable, as a software-list disk is in MAME, unless its list
part says `write_protected` (which call_load reads, with the entry's shared
features inherited as MAME's parser copies them): Bounty Bob Strikes Back will
not load from a disk that is not.

The test for a proposed host feature is therefore not "did this come from
MAME source" (design test question 1 does not apply) but "would this work
unchanged for the next generated machine".

### WHAT IS STILL HAND-WRITTEN

The left-hand column above is the rule, not yet the whole state of the code.
Some MAME-derived behaviour is still written by hand, in `src/runtime`,
`src/hardware` and inside some compilers: several sound engines, a set of
game-named screen renderers, a few board devices (Neo Geo I/O,
the Taito SJ watchdog and interface start values), compile-time method
replacements and CPU support layers. Generating an item and deleting its
hand-written version is tracked in
[#178](https://github.com/benbruscella/mamekit/issues/178); the 68705 MCU, the
Z80 PIO, the Z80 CTC, POKEY and the Z80 DMA went that way, and all five now
compile from MAME's own source.

The source of truth for what is left is `src/runtime/architecture.spec.ts`,
which pins each piece by name in an exact, shrink-only list:

| List | What it pins |
|---|---|
| `DEVICE_TYPE_BRANCHES` | Shared-runtime branches on a MAME device type, per file |
| `DIRECT_SCREEN_SHAPES` | Renderers written for one driver |
| `REPLACED_METHODS` | `replaceMethod` calls in `src/hardware/device/extract.ts`, as compiler and method |
| `SPECIALIZED_COMPILERS` | Device types `extract.ts` compiles with their own source-editing function |
| `HAND_WRITTEN_ENGINES` | Classes in `src/hardware` and in compiler-emitted worklets: cores, chips, mixers, frame renderers and processors |

A new entry fails the spec, and so does an entry that no longer matches until
it is deleted from its list. Host boundaries, such as the `SCREEN` and
`VECTOR` hosts and the shared stream worklet that plays what a generated chip
rendered, are declared apart in `HOST_BOUNDARIES` with the reason each is not
hardware. The epic is done when all five lists are empty and only
`HOST_BOUNDARIES` is left. The
[#176 audit](https://github.com/benbruscella/mamekit/issues/176#issuecomment-6343282103)
has the original file and line references; CPU support layers and MAME facts
copied by hand have no list yet, and nothing may be added to them either.

## 9. BROWSER BOOT SEQUENCE

1. `/app/main.js` imports the generated registry.
2. The registry registers shared generated CPU/device definitions and each
   target's canonical generated board.
3. The route `/app/g/<target>/` resolves the target's generated `dataPath`.
4. The app fetches `games/<category>/<target>/config.json`.
5. Arcade targets boot from the set this browser already keeps for the
   machine (`romstore.ts`, graded against the manifest exactly as a drop is),
   or request a user-supplied ROM zip and validate every required chip
   against graph-derived names and CRCs, keeping the accepted zips for next
   time. The machine's NVRAM and hiscore.dat bytes go back in before the
   first frame (`machine-memory.ts`).
6. Console targets open their cartridge room instead: the generated softlist
   catalog identifies a dropped or fetched dump by chip CRC, and `mountCart`
   (`src/runtime/cart-mount.ts`) mounts it. A console whose config names a
   `cart.slotDevice` -- the NES, `{tag: "nes_slot", type: "NES_CART_SLOT"}` --
   hands that slot device the image: a catalogued cart as its software-list
   part, which MAME's `call_load_pcb` reads its board features from, anything
   else as the raw file for `call_load_ines`; a Zapper or Vaus is fitted
   through `slotCards` from the list entry's `peripheral` feature, as
   `-ctrl2 zapper` would. The Atari 2600, ColecoVision and Game Boy load the
   image into their `cart.romRegion` and select the cartridge board through
   `slot`. (Injecting PRG/CHR regions with the mapper, mirroring and battery
   remains only for an iNES console without a slot device; none uses it now.)
   Which cartridge board a dump runs on comes from the software list's own
   features (or, for an uncatalogued NES file, its iNES header as MAME's own
   loader reads it), never from sniffing the bytes, and the room draws that console's own cartridge shell --
   the profile is chosen from MAME's cartridge interface name (`nes_cart`,
   `a2600_cart`, `gameboy_cart`), so the drawing follows the slot rather than a
   hand-kept console list.
   A cartridge bus that installs itself rather than being described by an
   address map is run, not restated: the host hands the mounted board a
   recording address space and keeps the windows MAME's own installer asks for.
   Which method mounts a board, and whether it is handed that space or reaches
   for it, is read from the bus's own interface -- the Atari 2600 takes the
   space as an argument, the Game Boy's `load()` calls `cart_space()`.
   Computer targets open their software room instead. A machine's regional
   versions -- MAME's clones of one parent (`meta.json`'s `cloneof`), the PAL
   C64 of the NTSC one -- are one box on the menu and one room
   (`menuEntries`, `src/runtime/machine-versions.ts`). The room merges every
   version's shelves; a title's versions are the ones whose filtered catalogue
   holds it, and a title only one lists says so (`PAL ONLY`). Play boots the
   only version that lists it, else the region chosen in the room's REGION
   control, else on Auto the version whose `set_filter` names the list's own
   `<info name="video">` note, else an accepted version before a candidate.
   Each version boots with its own config, and the firmware the browser keeps
   for one boots the others (`firmwareFrom`). A computer's software
   arrives on several media -- the C64 driver declares cartridge, cassette,
   two floppy and a quickload list -- so the generator writes one catalogue per
   SOFTWARE_LIST declaration under `software/<list>.json`, filtered with the
   declaration's own `set_filter` by MAME's `is_compatible` rule, and the room
   shows one shelf per list. The medium each list holds comes from its part
   interface (`cbm_cass`, `floppy_5_25`, `c64_cart`); whether the generated
   board can mount it comes from the devices the board composes, so a list
   whose transport is not generated yet is browsable but display only. A shelf
   takes every format its transport reads, its list's own first, because a
   dropped image need not be one the list catalogues: MAME's C64 quickload
   list holds one `.t64`, and a quickload reads any `.prg`. A tape's formats
   are its cassette's `lib/formats` code, compiled: `cbm_tap.cpp` fills 16-bit
   PCM as a legacy wave filler, and `wavfile.cpp` walks a `.wav`'s RIFF chunks
   and reads its samples into the host's cassette image, which keeps them as
   `cassimg.cpp` does and hands the cassette the sample nearest the time it
   asks for. A cartridge is not
   a file a drive reads: the C64 expansion port's own `call_load` reads a
   title's dataareas (`roml`, `romh`; `lorom`/`uprom` for a VIC-10 Ultimax
   cart) by name into the card the title's `slot` feature names, else the
   one its `get_default_card_software` does (`standard`). So the room hands
   the board the title's software part (`BoardConfig.images`), the device
   runtime picks the card from it, and the port's `call_load` runs between
   its `device_start` and the first reset, as MAME's image manager orders
   them; `device_image_interface`'s software-list calls
   (`load_software_region`, `get_feature`) answer from the part. A
   fetched or dropped set is kept in the visitor's browser as the zip it
   arrived in, identified by image CRC against every shelf, and playing it
   hands the shell the set's images to mount on the board's own transport at
   power-on; the machine's firmware is asked for the way any romset is. Each
   shelf also names the slots its transport sits in (`slots`, the outermost
   slot device above each transport the generator finds), so a title boots
   with every other medium's slot empty and **Power on** with none. The empty
   transport keeps its strip on the panel with a **Connect** button; that
   restarts the title with the slot filled, and the firmware the browser
   already keeps counts towards the new drop instead of being discarded.
   A title then starts itself: each shelf carries a `boot` -- what to type
   once the machine has come up, and whether to press PLAY when it is typed --
   from a host policy keyed by the MAME device the transport's slot is
   (`BOOT_POLICY` in `src/gen/software-shelves.ts`; the C64's datassette port
   types `LOAD` and `RUN` while the KERNAL waits for PLAY, its IEC slot
   `LOAD"*",8,1` at the slot's own address). A transport on no slot is keyed
   by what it loads with instead: MAME's quickload (`snapquik.cpp`) hands its
   file to the driver's load callback, and the C64's callback passes it on to
   `general_cbm_loadsnap`, the Commodore loader, which sets BASIC's
   end-of-program pointers -- so the policy types `RUN`, and the start waits
   until the device's own delay (three seconds on the C64) has put the file
   in memory. A transport fixed to the board that hands its signal straight
   to the firmware -- the Spectrum's cassette, which no slot carries and no
   loader reads -- is keyed by the board device that says which firmware
   answers, the ULA's contention model (`BOARD_BOOT_POLICY`: the 48K types
   `j""`, LOAD "" in K mode; the 128K presses ENTER on its menu's Tape
   Loader). A list may also be a slot card's rather than the machine's: the
   ZX Interface 2 declares `spectrum_cart` in its own `device_add_mconfig`,
   beside the `GENERIC_CARTSLOT` that reads it, so that shelf names the card
   (`card`) and a title from it boots with the card in the slot
   (`BoardConfig.slotCards`, MAME's `-exp intf2`); a slot's other titles keep
   its default card. MAME itself starts nothing; its `-autoboot_command` is
   the user's to give. Which slots a title leaves
   empty, which transport takes which image and the start sequence itself
   live in `src/runtime/title-start.ts`, which the acceptance harness drives
   too, so a contract's software scenario starts its title exactly as Play
   does. While a transport moves -- a
   tape the machine's motor pulls, a disk spinning -- the shell fast-forwards
   on its own (warp while loading) and returns to real time when it stops.
   Fast-forward runs frames back to back as tasks of their own rather than
   only inside the display's tick, which fits a whole number of frames.
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
6. emits the archive's browse routes (`emitArchiveRoutes`, under `dist/app`);
7. ships web-sized `.webp` artwork, with the bezels' `.json` sidecars, into
   `dist/artwork` (`shipWebArtwork`);
8. writes the home page, `dist/index.html` (`emitHomePage`);
9. removes `dist/.build`.

The final layout is:

```
dist/
├── index.html                 home page
├── app/                       app HTML, archive routes, compiled entry/registry
├── artwork/                   web-sized artwork and bezels
├── build-manifest.json        target set, capability closure, versions
├── runtime/
│   ├── core/                  compiled generic runtime
│   ├── ir/                    compiled neutral board IR
│   ├── hardware/              compiled runtime-facing hardware package files
│   └── generated/             shared MAME-derived hardware
├── games/
│   ├── arcade/<game>/
│   ├── consoles/<system>/
│   └── computers/<system>/
└── games.json
```

Generated game directories contain configuration, graphs, metadata, reports,
`DOSSIER.md`, and a `generated/` directory with `board.ts`, `board.js`,
`board.json` and `provenance.json`. A console adds `softlist.json`, its
cartridge catalogue, and `carts.json`, the shelf index of local cartridge dumps
(verified or experimental) when the ROM library has them; a computer adds
`software/<list>.json` per software list and `software/<list>.available.json`
where the local dump audit filed verified sets for it. A machine that has been
compared with MAME carries `oracle.json` (`src/gen/oracle-result.ts`), the
summary of its latest comparison; one never compared has none.

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

### FACTS CHECKED AGAINST MAME ITSELF

Provenance says where a fact came from; it does not say the fact was read
correctly. `audit:facts` closes that gap by asking MAME: `src/gen/listxml.ts`
runs `-listxml` on a MAME binary of the same release as the source checkout
(refusing outright if the versions differ), and `src/gen/fact-audit.ts` diffs its
answers against every generated machine's names, dates, driver file, screen
timing, CPU clocks and ROM loads. None of those facts appear in an acceptance
golden, so this is the only thing standing between a metadata misparse and a
machine that ships describing itself incorrectly.

Real differences in what each side models are reported as divergences rather
than failures, so that they stay visible instead of being tolerated silently.

Behaviour is checked the same way, locally. `tools/mame-oracle.ts` runs a
generated machine and that same MAME binary side by side, with the same title
and the same input, and compares pictures, RAM and bus traffic frame by frame
(ENGINEERING section 7). Its latest result for each machine is local evidence
under `.cache/oracle/`. Generation summarises it into the exhibit's
`oracle.json` (`src/gen/oracle-result.ts`) outside the per-target cache, so the
machine's page and the archive state what was found, for which MAME release,
on which build. The summary is generated data like any other fact: never
written by hand, and absent for a machine nobody has checked.

### ATTRIBUTION IS SOURCED, NOT INFERRED

Credit for a driver is taken from MAME's own `copyright-holders` header and from
MAMEDEV's published release notes (`src/gen/release-notes.ts`,
`src/gen/driver-attribution.ts`), keyed primarily by machine name because MAME's
file layout has been reorganised repeatedly and a machine's name has not.

Commit history is not a source of attribution. `src/gen/driver-history.ts`
reports commit counts as activity on a file, with the method and MAME revision
attached, and nothing generated may present it as authorship. The reasons are
recorded in that file and in README "ATTRIBUTION"; the short version is that a
`git log` tally answers a different question from "who wrote this?", and answers
it confidently enough to be believed.

## 13. CATEGORY MODEL

MAME arcade game declarations emit under `games/arcade`. Console/system
declarations emit under `games/consoles`. Computer declarations emit under
`games/computers`. Category is source-derived and part of the generated
manifest/config contract.

Category helpers live in `src/gen/output-layout.ts`. New code should use those
helpers or generated `dataPath`; it should not construct legacy `dist/<game>`
paths.

## 14. CONTENT AND SECURITY BOUNDARY

MAME source is a generation-time dependency and is not shipped. MAMEKIT does
not publish ROMs. ROM bytes are accepted from the browser user and validated in
memory. An accepted arcade set, like a console cart, may be kept only in the
visitor's own browser (IndexedDB), by their own choice, so the next visit boots
straight in; a control on the page forgets it. The machine's NVRAM and
high-score bytes are kept the same way. Nothing the visitor supplies or the
machine writes ever reaches the server.

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
7. If this is a host feature (see section 8), does it reach the machine only
   through the generic execution model, so the next generated board gets it
   for free?

If the answer to any question is no, the change is probably at the wrong layer.
Question 1 is asked of machine behavior; a host feature answers question 7
instead.
