# ENGINEERING GUIDE

This document is the operational reference for changing MAMEKIT. Read
[SYSTEM ARCHITECTURE](ARCHITECTURE.md) first when changing compiler or runtime
boundaries.

## 1. ENVIRONMENT

### REQUIRED

- Node.js 23.6 or newer;
- npm dependencies installed with `npm ci`;
- this repository at any path;
- a MAME checkout, normally at sibling path `../mame`;
- local ROMs only for acceptance and manual browser validation;
- optionally a MAME **binary** of the same release as that checkout, named by
  `MAME_BIN`, for `npm run audit:facts` and reference captures.

The binary must be the same release as the source checkout. A dump from another
release describes a different MAME, so every difference it reports is noise;
`src/gen/listxml.ts` compares the binary's `-version` against the checkout's
`BARE_BUILD_VERSION` and refuses rather than guessing. Read the source version
from `../mame/makefile` — `build/generated/version.cpp` is a build artifact and
goes stale. A package-manager `mame` on `PATH` is usually a different release
than your checkout, which is exactly the case the refusal exists for.

### LOCAL ASSET TREE

ROMs and artwork are copyrighted, so they live outside version control in one
hidden, gitignored tree:

```text
.data/roms/arcade/<set>.zip           arcade sets: each board's own, its parent's, its devices'
.data/roms/consoles/<system>/         cartridges by software-list short name, BIOS in bios/
.data/roms/computers/<family>/<list>/ software per software list, BIOS in <family>/bios/
.data/roms/_new/                      the ROM library's inbox (make roms-import)
.data/roms/_quarantine/               what no supported machine uses, with the reason logged
.data/artwork/                        bezels, flyers, cabinet and marquee scans
.data/release-notes/raw/              MAMEDEV's published whatsnew/messnew notes
.data/release-notes/index.json        digested driver credits generation reads
.data/Makefile                        npm wrappers + the DreamObjects sync
.data/.env                            DH_ACCESS_KEY_ID / DH_SECRET_KEY
```

**Re-fetch the release notes after every MAME update:**

```sh
node tools/fetch-release-notes.ts        # new releases only; existing files are kept
make -C .data sync-release-notes         # mirror them to the bucket
```

Driver credits come from those notes plus each driver's `copyright-holders`
header (`src/gen/driver-attribution.ts`). A release whose notes were never
fetched contributes no credits at all, so a machine updated in the newest MAME
release will silently under-credit until this is run. Nothing here is committed:
the notes are MAMEDEV's own prose, cached like roms and artwork.

**Fetch artwork into `.data/artwork/`.** Neither fetcher overwrites a file that
is already there:

```sh
node tools/download-artwork.ts [game ...]   # bezels and layouts (archive.org), flyers, cabinets, marquees
node tools/c64-covers.ts [--apply]          # C64 shelf covers from TOSEC's Cover.zip; reports unless --apply
```

`download-artwork` with no argument fetches whatever every game contract is
still missing. `c64-covers` matches every title on the generated C64 shelves
to a front scan by name and writes a 240 px `<name>.webp` under
`artwork/carts/<list>/`. Run `npm run audit:game-package -- <target>` to see
what a machine still lacks.

`src/paths.ts` is the only place that names `.data`; tooling resolves paths
through `romsDir()`, `artworkDir()` and `releaseNotesDir()` rather than
hardcoding any of them. ROMs are
never served or deployed — `src/cli.ts` mounts artwork explicitly and nothing
mounts roms. Run `make -C .data help` for the sync targets.

### ROM LIBRARY

`tools/rom-library.ts` keeps `.data/roms` in the shape the app and the harness
read, for every supported system at once. "Supported" is derived: the systems
and their software lists come from the game contracts and each target's
generated `config.json`, the lists themselves from MAME's `hash/`, so it needs
a generated `dist/` and nothing in it names a machine.

```sh
make -C .data roms-status                 # per system: games/entries per list, BIOS, arcade sets
make -C .data roms-missing LIST=a2600     # the uncovered games (REGION=western LIMIT=40 CSV=1)
make -C .data roms-missing DAT=1          # + a Logiqx want list per list in roms/_new/_reports/
make -C .data roms-import DRY=1           # every verdict for roms/_new/, nothing moved
make -C .data roms-import                 # tidy, then file everything in roms/_new/
```

Identification is by chip size, CRC32 and SHA1 against the list, never by file
name. Inputs may be loose files or archives of archives (zip natively; 7z and
rar through the system's bsdtar), and the chips one archive holds pool, so a
MAME set of loose chips or a tape whose sides are two files completes as one
entry. A set is filed as the zip `mame <machine> <name>` loads, its chips
under the list's own names, and recorded in the shelf's `_manifest.json`.
A uniform-byte bank is never evidence of anything (a blank C64 cartridge bank
"matched" ColecoVision chips), but once real chips name a set, the blank banks
MAME lists beside them are supplied. Nothing is deleted: tidying moves a
console BIOS set into `<system>/bios/`, renames a computer list folder to its
list, and quarantines whatever no supported list or machine claims,
MAME-unsupported sets included; inputs park in `_new/_imported/` and its
siblings, and every run writes `_new/_reports/`.

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
| `npm run audit:facts` | diff generated machine facts against MAME's own `-listxml` |
| `node tools/mame-oracle.ts <target> [<title>]` | run a machine beside MAME and compare pictures, RAM and bus traffic |
| `node tools/fetch-release-notes.ts` | fetch MAMEDEV release notes for driver credits |
| `npm run audit:game-package -- <target>` | validate local artwork, history and dossier completeness |
| `npm run audio:compare -- <target> --mame /path/to/mame` | compare MAMEKIT and MAME power-on WAVs |
| `npm run test:generation` | clean-generate every required target and audit all output |
| `npm run test:games` | deterministic real-ROM contracts for supported games |
| `npm run test:blast-radius` | run every old and new real-ROM game canary |
| `npm run blast-radius` | which machines a change can reach, and the e2e command for exactly those |
| `npm run test:games:record` | record candidate game baselines for review |
| `npm run serve` | serve `dist` exactly as it is on localhost -- no compile |
| `npm run serve:build` | recompile the app shell from `src`, then serve `dist` |
| `npm run deploy` | clean-generate and publish the static site |

The broad `test:generation` command is destructive to `dist` and expensive. It
generates every target in `REQUIRED_TARGETS`: the accepted set, the candidates,
and the consoles `nes`, `coleco`, `a2600` and `gameboy`, which `targets.ts`
names whether or not a contract accepts them -- a console dropping out of the
build is what issue #53 did, with nothing going red.

A console has no romset to accept against; it is accepted against a cartridge.
Its contract's scenario names one by MAME software-list short name
(`cartridge: 'smb1'`), the set lives at
`.data/roms/consoles/<console>/<cartridge>.zip`, with the console's own set in
`.data/roms/consoles/<console>/bios/` (the ColecoVision BIOS, the Game Boy's DMG
boot ROM; the NES and the 2600 have none), and the harness mounts it through `src/runtime/cart-mount.ts`, the code
the console room boots a visitor's cartridge with. Goldens, the save-state round
trip and the audio probe then apply exactly as for an arcade set. Before #155
no console had a contract, and the NES and the Game Boy each drew one flat
colour for months with every gate green.

A computer is accepted at its own firmware and against software-list titles.
A scenario's `software: { list, name }` names one; its set lives at
`.data/roms/<the machine's dumps folder>/<list>/<name>.zip`
(`.data/roms/computers/c64/c64_cass/crazycom.zip`), every image is matched
against the generated catalogue as a cartridge is, and the harness then does
what the software room's Play does through `src/runtime/title-start.ts`: the
other media slots booted empty, each image in the transport whose formats read
it, the shelf's start command typed through the natural keyboard and PLAY
pressed on a tape. A `{ atFrame, text }` action types MAME's coded form
(`RUN{ENTER}`) the same way. Natural-keyboard presses and PLAY go into the
input log, so the save-state round trip replays them exactly. `c64p` has six
scenarios: BASIC (a SID note and the 10 PRINT maze), a tape (Crazy Comets), an
original disk (Bounty Bob Strikes Back), a quickload (Broken Limits, the one
title in MAME's `c64_quik`, PAL only), a banked cartridge (`c64_cart:kungfum`)
and an Ultimax cartridge (`vic10:jlander`), and `fetch:acceptance-roms` fetches
each title beside the machine's own sets. The harness's silence check reads the
signal after the browser's speaker high-pass, not the worklet's output the
golden's `rms` records: the SID's DC offset alone measures 0.5 with every voice
silent.

A console's own cartridge bus is covered by a colocated spec under
`src/hardware/<console>/`, which is where a bus that installs itself has to be
tested: a Game Boy PCB is not describable by an address map, so
`gameboy.spec.ts` mounts a synthetic cartridge, runs the board's own installer
against a recording address space, and reads back the windows it decoded.

### C64 development

`c64` (NTSC) and `c64p` (PAL) are computer targets with generated cassette
transport, a generated 1541 disk drive, a generated quickload, the expansion
port with every cartridge card a software list names, and SID audio. Both
are accepted (`src/games/c64.game.ts`, `src/games/c64p.game.ts`): BASIC, a
tape, a disk and a cartridge each, checked against MAME 0.289's own NTSC and
PAL machines, and a quickload and an Ultimax cartridge on the PAL one.

`npm run gen:all` and `npm run dev` expose all generated targets in the
catalogue, including the Computers tab. Candidates are labelled experimental;
menu visibility does not grant gameplay acceptance.
For an isolated build, `node bin/mamekit.js dev-game c64p`. A title is checked
against MAME 0.289 with the oracle (section 7):
`node tools/mame-oracle.ts c64p c64_cass:<name> --frames <n>` boots it as the
room's Play does on both sides, types the shelf's command and presses PLAY.

In the app, open the Commodore 64 under **Computers**: the NTSC and PAL
machines are one box and one room, and the room's **REGION** control (Auto,
NTSC, PAL) picks which plays. Auto boots each title on the machine its
software list lets it through to (MAME's `set_filter`), and of two the one the
list's video note names, else PAL; a title only one
machine lists is marked `PAL ONLY` or `NTSC ONLY`. The room is the
software room: one shelf per software list the driver declares (cassettes,
cartridges, two disk lists, quickloads), each read from
`dist/games/computers/c64p/software/<list>.json`. Tapes, disks, quickloads
and cartridges all mount, and the cassette shelf opens first. A title the local dump
audit has filed carries a **⌕ Search** that fetches the set into the browser,
and **◍ Insert your own…** (or a drop anywhere on the page) takes a TAP, a
disk image, a `.prg`, `.p00` or `.t64`, or a software-list ZIP. **Play** boots the machine with the set's images mounted
on the tape transport or in the disk drive, after the machine asks for its
own `c64.zip` and, for a disk title, the drive's `c1541.zip` firmware
(dropped, or found by the web search under `computers/c64/bios/`). A title
boots with only its own transport attached: a tape title leaves `iec8` empty
and a disk title leaves `tape` empty, as MAME's `-iec8 ""` and `-tape ""` do.
The missing transport's strip reads NOT CONNECTED, and **Connect** restarts
the title with it. **Power on** attaches both. Multi-image sets expose an image
selector. **Play** starts the title itself: once the machine has had three
seconds to come up, its shelf's command (`boot`, generated from the
`BOOT_POLICY` in `src/gen/software-shelves.ts`) is typed through MAME's
natural keyboard -- `LOAD` and `RUN` for a tape, with **Play** pressed on the
deck once they are typed, and `LOAD"*",8,1` and `RUN` for a disk -- and the
load runs warped. A quickload needs no command to load: the device holds the
file for its own three seconds (MAME's `CBM_QUICKLOAD_DELAY`), writes it into
memory where its header says, and sets BASIC's pointers past it, and the
start types `RUN` only once that has happened. Power on leaves the keyboard to you: type `LOAD"$",8` and
`LIST` for a directory. The control panel holds one strip per transport --
DATASSETTE, DISK DRIVE (with **Flip** for a set of more than one disk) and
QUICKLOAD, whose **Open…** takes a program at any time -- and the toolbar holds
**Swap joystick ports** (MAME's own JOYSWAP switch, preset for the 25 titles
whose note asks for port 1 and kept per title), **Keyboard** (the C64's whole
keyboard on screen), **Reset**,
**Fast-forward**, **Warp loading** (fast-forward on its own while a tape's
motor runs or the drive spins, remembered per machine) and **Paste** (the
clipboard typed on the computer's keys), all buttons so the computer retains
its letter and function keys. Leaving a title keeps where it was: the next
Play of the same title carries on from there (Reset starts it over), and a
disk the machine wrote to is put back as it was written. Tape speed remains under the emulated
computer's motor control.

To type into a board from Node, as the app does: build a `NaturalKeyboard`
(`src/runtime/natural-keyboard.ts`) over the `KeyboardInput` and the config's
`bindings` and `naturalKeyboard.alternates`, `post()` or `postCoded()` the
text, and call its `tick(1 / refresh)` before `advance()` on every frame.
`e2e/specs/computer.spec.ts` is the browser gate for the room.

To check what a tape title does against MAME itself, drive both the same way:
MAME 0.289 with `-iec8 "" -cass <image>.tap -video none -nothrottle`, an
`-autoboot_script` that posts `LOAD{ENTER}` at frame 150 and calls
`manager.machine.cassettes[...]:play()` at frame 300, and a Lua write tap on
`:u7`'s program space at `$D400`-`$D7FF`; on this side, wrap the board's
`m_sid.write` call binding after `noteCallLinksChanged()`. Cauldron I & II's
first 300 seconds produce the same 182,525 SID writes in the same order, and
the music matches MAME's WAV band for band. A load can also depend on the
phase PLAY lands on, so check more than one: post the command on frames 150
to 157 on both sides (`TYPEAT` in a Lua frame notifier) and press PLAY once
`natkeyboard.is_posting` clears; the C64's KERNAL tape reader is sensitive to
a few cycles of interrupt latency, and a Lua read tap on `$DC06`/`$DC07`/`$DC0D`
gives MAME's Timer B readings to set beside ours.

The 1541 is MAME's own `c1541`, composed into `iec8` from source: its 6502
and DOS ROM, both 6522 VIAs, the 64H156 gate array, the ALPS drive mechanism
and the `d64`/`g64` formats. MAME's 1541 reads a disk a flux reversal at a time
on a 16 MHz gate-array clock; headless, a whole Nebulus load now averages real
time (about 19.5 ms a 20 ms PAL frame), with its hardest stretch just over it.
Even with the motor off, an attached 1541 puts
the machine in permanent lockstep with a second processor, which is why tape
titles boot without it. To diagnose the drive in Node, boot an isolated build, mount an image
through `board.disks()[0].mount(extension, bytes)`, type `LOAD"$",8`, and read
the DOS job queue at 1541 RAM `$00`-`$05` (1 is success, 3 no sync, 9 a header
checksum) alongside the drive's `m_cyl` and the gate array's `cur_live`.

Matched software belongs in `.data/roms/computers/c64/<software-list>/` and
firmware in `.data/roms/computers/c64/bios/`, which is where `make -C .data
roms-import` files it; its reports go to `.data/roms/_new/_reports/`, the
inputs it used to `.data/roms/_new/_imported/` and what nothing claims to
`.data/roms/_quarantine/` (see ROM LIBRARY). The generator reads
the `_manifest.json` in each of those folders to build the shelf's
availability index, keyed by the driver family so the PAL and NTSC machines
share one collection. Neither BIOS nor game data belongs in generated output.

A cartridge title boots with the cartridge already in the expansion port and
both other slots empty, and starts itself; nothing is typed. The port's 54
cards are compiled from MAME's own `c64_expansion_cards`, limited to the ones
`c64_cart` and `vic10` name (`src/hardware/c64/extract.ts`), and a title whose
list names none takes `standard`. To check one against MAME,
`node tools/mame-oracle.ts c64p c64_cart:<set> --input none` runs MAME with
`-iec8 "" -tape ""` and the set mounted, and compares the frames: Pac-Man, Kung-Fu Master, Robocop 2, Narco Police, the C64GS
cartridge and three VIC-10 carts are pixel-identical to MAME 0.289. A bare
`.crt`, `.80`, `.a0` or `.e0` dropped in the room goes in as a file: the port's
own `get_default_card_software` reads a `.crt`'s header for its card through
MAME's `lib/formats/cbm_crt.cpp`, compiled in because the port calls it.

The quickload is MAME's `quickload_image_device`, generated from
`snapquik.cpp`; the driver's `quickload_c64` callback and the
`general_cbm_loadsnap` it calls are board handlers. They read the file
through `device_image_interface`'s calls (`length`, `fread`, `fseek`,
`is_filetype`), which the device runtime answers over the mounted bytes, as it
answers `machine()` and `timer_alloc`. To check one against MAME, run
`-quik <file>` with an `-autoboot_script` that posts `RUN{ENTER}` on frame
152: the program is in memory on frame 151 on both sides, and Broken Limits'
intro screen is pixel-identical at frame 1687.

SID oscillator, envelope, noise, mixing and filter behavior is compiled from
MAME's `sid.cpp`, `sidvoice.cpp`, and `sidenvel.cpp`. The host renders that
generated device against emulated time and sends PCM to the audio worklet.
`node tools/check-sid-native.ts` compiles the same MAME C++ sources and compares
36 register configurations across 147,456 samples. It needs a C++17 compiler;
`MAME_SRC` and `CXX` override the source directory and compiler. The colocated
SID spec also checks the recorded native samples and envelope release.

### ZX Spectrum development

The 48K (`spectrum`) and the 128K (`spec128`, with the +2 on the same tile)
are generated from `spectrum.cpp` and `spec128.cpp`. Their firmware belongs in
`.data/roms/computers/spectrum/bios/` (`spectrum.zip`, `spec128.zip`,
`specpls2.zip`) and their software in
`.data/roms/computers/spectrum/<software-list>/`: both machines share one
collection, because `spectrum_cass` is declared by `spectrum.cpp`'s
`spectrum_common`, which the 128K's config calls. A merged software-list zip
(MAME's own layout: the parent's images at the root, each clone's under
`<clone>/`) is identified as the parent.

**Tapes.** `spectrum_cass` mounts on the machine's own `CASSETTE`, which
reads MAME's `tzx_cassette_formats` (TZX, TAP and `.blk`, compiled from
`lib/formats/tzx_cas.cpp`, and WAV). **Play** starts a tape the way the
firmware takes it: on the 48K `j""` and ENTER (LOAD "" in K mode), on the
128K and +2 ENTER on the menu's Tape Loader, then PLAY. The cassette sits on
no slot and hands no loader its file, so the start is keyed by the board's
ULA type instead (`BOARD_BOOT_POLICY` in `src/gen/software-shelves.ts`). The
Spectrum's cassette has no motor line: it plays from PLAY until MAME stops it
at the end of the tape, so warp while loading runs for exactly that long.
`castool convert spectrum <tape> <out.wav>` (from the MAME 0.289 release)
gives MAME's own waveform to compare a tape against; Manic Miner and
AstroBlaster decode sample for sample.

**Cartridges.** `spectrum_cart` is the ZX Interface 2's list, declared in that
card's own `device_add_mconfig` beside the `GENERIC_CARTSLOT` that reads it,
so its shelf carries `card: "intf2"` and a cartridge title boots with
`BoardConfig.slotCards` putting the Interface 2 in `exp` in place of the 48K's
Kempston joystick (MAME's `-exp intf2 -cart <set>`). The Interface 2's two
Sinclair joysticks are bound while it holds the slot. To check against MAME:
`spectrum -exp intf2 -cart jetpac` with the software-list folder on
`-rompath` and `-hashpath` pointing at MAME's `hash/`.

**Snapshots.** The `SNAPSHOT` device takes `.sna`, `.z80` and the rest of
`spec_snqk.cpp`'s formats from the room's SNAPSHOT strip, and the driver's
loader restores the Z80 through MAME's `set_state_int`, which the generated
core answers from its own `state_add` table and `state_import`. MAME runs
`-snapshot <file>`; a homemade 48K `.sna` is pixel-identical at frame 100.

**Checking frames against MAME.** `tools/mame-oracle.ts` (section 7) does this
with the alignment below built in. MAME's frame notifier fires at the end of a
frame and the harness hook before one, so an input MAME posts on frame N is
this side's frame N + 1; MAME's snapshot of frame N is this side's frame N.
With that, the 48K's boot, BASIC typed by keyword (PRINT, then BEEP after the
CAPS SHIFT + SYMBOL SHIFT chord for E mode), the 128K menu, Jet Pac's title,
menu and game start, and a snapshot are pixel-identical to MAME 0.289. Jet
Pac's play then diverges within ten frames of the start: its aliens are drawn
from the Z80's R register, and the two sides do not yet run the same number of
instructions per frame.

Neither command holds a target list of its own. `gen:all` is
`node bin/mamekit.js --all`, and the set is derived from the acceptance
contracts in `src/games/contracts.ts`: a game with a contract is by definition
one that must generate and pass. `src/gen/targets.spec.ts` asserts that target
discovery, the generated catalog and the contracts name the same set.

A target is removed from that set by moving its contract module and spec into
`src/games/disabled/`, which discovery does not read. The pair stays in the
tree with a header note recording what play-testing found, its spec keeps
running under `test:unit` so the driver still has to compile, and re-enabling a
fixed game is moving the two files back up. Issue #53 parked the first batch
there. No target is parked now: #145 re-enabled or dropped every one, so the
folder is absent from the tree, but `src/games/discovery.ts` keeps the
`disabled` lifecycle for the next.

Target generation is already parallel. `gen:all` uses a bounded worker pool
(memory-aware, capped at 8 — see `src/gen/generator-workers.ts`). Override it
with `npm run gen:all -- --jobs 12` or `MAMEKIT_JOBS=12`; do not launch an
unbounded process per target because every worker parses and lowers a sizeable
MAME source closure before the shared runtime/app build runs once. The
hardware closure's isolated CPU artifact workers run through the same bounded
pool policy.

`gen:all` memoizes derived artifacts in the gitignored `.cache/` tree: driver
git history, per-target output, the hardware closure (CPU cores included) and
the compiled app. The build's only inputs are the MAME checkout and this
repository's source, so every entry records the exact MAME HEAD revision and
a content hash of mamekit's own src/bin/tools it was derived from. A quick
pre-step (one `git rev-parse` + `git status` + hashing `src/`, well under a
second) verifies every entry against the current identity and prunes drift
before anything is reused; stale or missing pieces re-derive and refresh
their entries in the same run. A dirty MAME working tree disables caching
entirely. A warm build is byte-identical to a cold one — the cache changes
when derivation runs, never what it produces.

Nothing under `.cache/` is ever committed — delete the directory freely to
force re-derivation, or pass `--no-cache` (`npm run gen:all -- --no-cache`)
for a one-off fully uncached build. `test:generation` always runs uncached:
it exists to prove generation works from scratch, and the cache must never
satisfy any part of it.

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

The app build also recreates `dist/app`, `dist/runtime/core`, `dist/artwork`
and its temporary `dist/.build` staging tree. It does not delete canonical
per-game or generated hardware data because those are emitted by earlier
phases.

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
dist/games/computers/<target>/
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
| `runtime.ts` | browser | optional: wires the generated IR into the running board (15 packages have one) |

Register it in `src/hardware/registry.ts` (compile time) and, for audio, in
`src/hardware/acceptance-registry.ts`. An audio family whose registers need
explicit wiring also adds its `runtime.ts` installer to
`src/hardware/sound-runtime-registry.ts`, keyed by the sound kind the
generator emits; that registry ships to the browser and imports only each
package's `runtime.ts`. `registry.spec.ts` fails if a package
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
| A device decodes bus traffic no map mentions | `execution.accessTaps` from its `set_range` |
| A two-CPU handshake half-works | the frame quantum, before the device (both directions) |
| A board runs a fixed workload slow or fast | cycle charges the opcode body makes itself, not the decode table |
| A CPU core reads a source name it never declares | the CPU definition's constants; codegen fails rather than emitting 0 |
| A board is audible but one chip is silent | `sound.auxiliaryDevices`; the kind names one chip only |
| A sound chip's pin is polled by a CPU | its engine belongs on the main thread, not the worklet |
| A main-thread chip runs at double or half speed | `tickCpu` fires per processor; drive it from one, and not one that can be held in reset |
| A machine's SCREEN carries no geometry | the video device that claimed it with `set_screen`, whose `device_config_complete` sets the raw params |
| A compiled board is slow with a flat profile | `%HasFastProperties` on what its hot path reads; a dictionary-mode table wants a resolved links table, not a faster hardware model. An object literal with a getter is born in dictionary mode, and so is a table built one key at a time |
| A small emitted method still costs a call per use | its bytecode size (`node --print-bytecode --print-bytecode-filter=<method>`) against V8's 460-byte inlining limit; a cold path spelled inline belongs in a runtime helper |
| A device method the profile shows interpreted | its codegen decline (`supportsMethod` with `onUnsupported`), or a slot card/child never marked a root |
| A device reads display memory no CPU map mentions | its own `device_memory_interface` space, not a board share |
| A scanline one-shot fires once per frame | `vpos()` and the device-timer beam disagreeing at a line boundary |
| A statement lowers with no diagnostic but wrong | a silently mis-parsed form; add the spec before the fix |
| A device writes and nothing changes | a container method emitted as `?.()` on an array that has no such method (`insert`, `erase`), or an iterator added to as a number; read the drive's own error channel (a 1541's `25, WRITE ERROR`) |
| A raster effect lands a few cycles early | an executing device's register access ran before the device reached the access's cycle (perfect quantum: catch up to k-1) |
| Compiled device code and the interpreter disagree | the emitter's operator, not the device: `>>` on a negative value (`runtime.shiftRight`), a bus read repeated inside a macro expansion |
| A device's integer array holds out-of-range values | its element width; a fixed C++ array is backed by the matching typed array |
| A comparison against a C++ character always fails | a character literal compiled as a string: `'N'` is the integer 78, and MAME's iNES check `magic[0] == 'N'` compared it with NaN |
| A `get_feature(...)` or other string test is never true | a string in a condition is a non-null `const char *`, not `Number("vertical")`; every software-list feature was skipped |
| A struct field reads the wrong shape | a struct nested in another is registered under its qualified name: `nes_defs.h` declares a different `square_t` in `apu_t` and in `mmc5_sound_t` |
| A lookup over a file-scope table answers nothing | the table was not lifted: file-scope struct arrays are lifted only for the device whose own methods read them (`pcb_list[]` behind `m_pcb_id`) |
| A host call's out-parameter stays zero | the host object must declare it (`REFERENCE_PARAMETERS`, src/ir/execute.ts): `core_file::length(u64 &)` writes through its argument |
| A functional cast answers 0 | a framework type alias (`sound_stream::sample_t(x)`) spelled as a cast is a cast, not a call to nothing |
| A method between `#if NAME` and `#endif` will not parse | `NAME` must be a literal `#define`d in the same file, parenthesised or not (`#define ENABLE_REGISTER_TEST (0)`) |
| A cross-device call is slow though compiled | it is reached by name; use the device's `preparedCall`, and check that an accessor (`get_draw_phase`) is a codegen root |
| A console runs a frame behind MAME's | a device's first `time_until_pos` measured from the power-on credit instead of the beam (see ARCHITECTURE, the first line boundary) |
| A string compared by prefix always matches | `strncmp` is answered beside `strcmp`; unanswered it was 0, equal, so every MMC1 cartridge read as an MMC1B |
| A battery cartridge cannot boot | `battery_load` on the image surface fills from MAME's default (`fill` or `def_buffer`) when no battery is kept |
| A device array member has no storage | its bounds are evaluated with the class's own constants (`m_vol_table[NUM_CHANNELS][16]`) |
| A member the constructor sets reads as zero | the constructor body is interpreted at generation (indexed and chained assignments, calls to the device's own methods); a body that does not lower changes nothing |
| A pointer member into a file-scope table is null | the table is lifted (`static const T::name x = {...}`, no `struct` needed) and the pointer holds a copy of what its initializer selects |
| A floating-point table reads as integers | `make_unique<float[]>` (and `sound_stream::sample_t`) allocates `ALLOCF`, a `Float64Array`, not bytes |
| A call through `m_x.get()` writes nowhere | a `std::unique_ptr`/`shared_ptr` member's `get()` is the member itself |
| A constant reads as zero | a qualified declared type (`static constexpr sound_stream::sample_t MAX_OUTPUT = 1.0;`) |
| A call on a struct value does nothing | the struct's inline methods (`tone_t::set_period`) are compiled per type (`structMethods`) and carried on its values |
| A scalar member behaves as an array | a fixed array's length was taken from another class in the same file (`int m_latch, m_reset;` beside a neighbour's `m_latch[2]`); only a member declared with a bound takes one |
| A reset-counting cartridge starts on the wrong game | the card was reset twice at power-on; MAME resets it once, from the driver's `machine_reset` |
| A software-list set will not mount though every chip matches | its rebuilt iNES header could not say its size: past 4,095 banks NES 2.0 uses the exponent form (the 64 MB dpcmcart set) |
| A device's stream plays at the wrong pitch | `sound_stream::set_sample_rate` after `stream_alloc` retunes it (the AY's internal divider) |
| Emitted and interpreted code disagree on a call nothing answers | an unresolved reference is falsy to the interpreter and an object to emitted code; answer the call (a composed image device's `is_loaded()` is false) rather than relying on either |
| A driver's IRQ arrives a line early or late | where its timer was armed against the beam: driver emu_timers fire after the line settles and schedule the board by the line |
| A device reads its region as empty | a finder's `*this, "name"` is the device's subtag (`avg:prom`) first |
| A machine diverges after a save-state load | state the walker cannot see: a closure variable (lift it into `hostModel()`), a class without `stateKeys()`, a derived cache not rebuilt in `stateRestored()` |
| A save state is refused with "missing from the save" | a slot the machine allocates as it runs (`generatedResources`, a driver-state member): an open record is restored key set and all, so check the container is not one that declares fixed keys |
| Two browsers in a room drift apart | something reached a port outside `input.advance()`, or the two machines did not start from the same place; the room names the frame it happened on |
| A room runs faster than the board's refresh | the input delay's frames in hand were counted as a backlog to catch up on; only unspent timestep time may run a frame |
| An input reaches the machine a frame late | it was posted after `input.advance()` ran; every source must post before that boundary (see the run loop in `shell.ts`) |
| A lever's diagonals block one axis on a 4-way machine | the generated binding's `ways`; MAME gates the lever in `digital_joystick::frame_update`, not the game |
| A tap does nothing while the page is stalling | both edges landed in one batch and cancelled; `input.advance()` holds a press for a frame |
| A hardware family needs a new central branch | it needs a capability package instead |
| Audit reports a mixed build | regenerate fully; `--targets` builds are partial by design |
| App cannot locate config/module | output layout, manifest `dataPath`, or relative URL |
| Old deleted code appears to work | stale `dist`; clean and reproduce |

The default solution is a reusable MAME-source lowering improvement. Never add
`src/runtime/z80.ts`, `src/runtime/ay8910.ts`, a game-named renderer, or a
family board adapter.

## 6A. WHICH MACHINES A CHANGE REACHES

`npm run blast-radius` answers "what else could this have moved" from the
generated artifacts rather than by sweeping. Each `board.json` names the
devices, callbacks, handlers and CPUs its machine actually composes, so the
affected set is derivable:

```sh
node tools/blast-radius.ts --device NAMCO_53XX     # machines with that device
node tools/blast-radius.ts --signal k_port_callback
node tools/blast-radius.ts --handler pacman_sound_w
node tools/blast-radius.ts --cpu z80 --sound wsg
node tools/blast-radius.ts --multi-slot            # >1 callback on one devcb slot
node tools/blast-radius.ts --read-transform        # transformed device-method reads
node tools/blast-radius.ts                         # infer from the working diff
```

It prints the machines, why each matched, and the `MAMEKIT_E2E_GAMES=...`
command that exercises exactly them.

Query the *mechanism you changed*, not the file you edited. A generic
`src/runtime` module reaches every machine and the tool says so rather than
inventing a narrow answer; the useful question is then which machines compose
the specific device, signal or handler the change touches. When the 2026-08-20
devcb read fix landed, `--read-transform` and `--multi-slot` named seven
candidates out of forty-seven, and running only those found the single machine
whose behaviour actually moved.

This narrows what to test. It never decides whether a difference is acceptable
— that still needs the goldens, and a comparison against real MAME when the
behaviour itself is in question.

## 7. TEST STRATEGY

The complete QA architecture, supported-game token pattern, CI boundary,
golden policy and failure triage are defined in [TESTING](TESTING.md).

### GENERATED AUDIT

```sh
npm run audit:generated
```

The audit scans every target currently present under the three game categories
(`arcade`, `consoles`, `computers`). It
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

### FACT AUDIT AGAINST MAME

```sh
MAME_BIN=/path/to/matching/mame npm run audit:facts
```

The generated audit checks that output is well formed; this one checks that it
is *true*, by asking MAME. For every generated machine it compares our
source-derived facts against that MAME's `-listxml` answer:

- full name, year, manufacturer and driver file;
- screen width, height, rotation, htotal, vtotal, vbstart, vbend and refresh;
- CPU clocks, per tag;
- ROM loads per region: name, CRC, offset and total length.

No acceptance golden looks at any of these, so before this audit existed a
misparse in one of them shipped silently and stayed wrong.

Comparing like with like takes care, and the comparison is deliberate about it:
MAME states one `size` per chip covering `ROM_LOAD` plus every `ROM_CONTINUE`
and `ROM_IGNORE` after it, its device clocks are u32 and print truncated, its
`chip type="cpu"` includes every device with an execute interface rather than the
board's CPU list, and BIOS alternatives appear as selectable ROMs a board never
loads all of. A difference that survives all of that is a real disagreement.

Genuine differences in what each side models are printed as divergences (`~`)
and do not fail the audit — see `scaledScreen` in `src/gen/fact-audit.ts` for the
one case, MAME's integer horizontal scaling of the Galaxian family.

Without a matching MAME binary the audit skips with a message and passes, which
is what CI does; `--require` turns that skip into a failure.

### BEHAVIOUR AGAINST MAME: THE ORACLE

```sh
MAME_BIN=/path/to/matching/mame node tools/mame-oracle.ts pacman --frames 300,600,900 --ram
MAME_BIN=... node tools/mame-oracle.ts nes cvania3u --frames 120,300,1500
MAME_BIN=... node tools/mame-oracle.ts c64p c64_cart:pacman --input none
MAME_BIN=... node tools/mame-oracle.ts nes --survey
```

Goldens say a machine still does what it did; the oracle says whether that is
what MAME does. It runs one machine, or one of its titles, on both sides with
the same input: ours through the acceptance harness exactly as a contract boots
it (a title without a contract borrows its machine's), MAME through one Lua
script, `tools/oracle/oracle.lua`, which every comparison shares. It then
reports the result as a number: differing pixels per frame, differing RAM bytes
and the first frame they differ on, the first bus access that differs. Most of
the silent faults #167 fixed — a character literal compiled as a string, every
software-list feature skipped, `m_pcb_id` never a number, NES RAM powering on
zeroed — were found this way, not by a golden.

**What it compares.**

- *Pictures* at `--frames` (default 600). Each side writes a side-by-side PNG
  (MAME | ours | ours dimmed with every differing pixel red) under
  `.cache/oracle/<target>/<title>/`.
- *RAM* with `--ram`, every frame from 1, for every RAM range the generated
  board maps, or the ranges named (`--ram maincpu:0-7ff`). The report gives
  the first frame that differs and its addresses (`mame/ours`). It also gives,
  at each compared frame, MAME's RAM against the nearest of our frames, which
  is the figure the earlier RAM-only oracle reported (Green Beret: 16, 25 and 19
  bytes at frames 600, 900 and 1200). Our RAM is read when a frame has run
  all its lines and MAME's at the start of VBLANK, so on a machine whose
  VBLANK is not its last line the two are that many lines apart (22 on the
  NES) and a byte the game rewrites in between always differs. It is the measuring stick for a
  scheduler change: a board that moves further from MAME has regressed,
  whatever its hashes say.
- *Bus traffic* with `--io maincpu:2000-7fff:rw --io-frames 3-9`. Both sides
  log every read and write in the range, and the report gives the first one
  that differs. That is how Bio Miracle was narrowed to a game-state byte
  rather than a register.

**Input.** A machine runs with no input by default (attract mode is
deterministic on both sides), and so does a computer title, which starts the
way its shelf does (typed command, PLAY). A console title gets the Start
schedule by default: Start held for six frames every 300, from frame 300.
`--input none|start` overrides either default. `--input contract --scenario <id>`
replays a contract's own actions. Key, chord, light-gun aim, typed text and
reset actions are all given to MAME. A software title's start command is typed
through MAME's natural keyboard on the frame `title-start.ts` types it, and
PLAY is pressed once typing ends.

**Frames.** Both sides count frames as they run them. An input given at frame N
is read during frame N + 1: the harness's `atFrame`, and a MAME frame
notifier's frame. Our frame N is set against MAME's N + offset, and the offset
is searched (`--search 2`, or a fixed `--offset`). One offset is kept for the
whole run, never the best per frame, because choosing per frame would hide a
machine running at the wrong speed. Offsets that fit equally well are listed
(`as good at -1 +0`), since a still screen fits several. MAME's pictures come
from `video:snapshot_pixels()`, the image a `-snapshot` PNG holds, rotated as
the driver presents it. Ours is turned to match. `screen:pixels()` in a frame
notifier returns the frame before.

**MAME the same way every time.** The tool refuses a binary of another release
(`src/gen/listxml.ts`). Every run gets a fresh `-nvram_directory` and
`-cfg_directory`, because MAME writes NVRAM back on exit and a reused
directory boots warm. The title is given as `<list>:<name>`, so no media switch
is needed, and our boot's slot cards and empty slots are passed on:
`-ctrl2 zapper`, `-iec8 ""`. The Lua script keeps its taps and files in
globals, uses `add_machine_stop_notifier`, and does not log its own RAM reads
as bus traffic.

**Out of the way.** MAME runs `-window -nomaximize -video none -sound none`,
because without `-window` it takes over a Mac's screen even with no video.
Both sides run at `nice 10`. `--background` moves them onto the efficiency
cores (`taskpolicy -b`), which is slower but never felt. `--watch` gives MAME
a real window. A survey runs one title at a time unless given `--jobs`.

**Survey.** `--survey` runs one title per cartridge board that has a local
dump, to frame 1500 with the Start schedule, and grades each: it errors, times
out, stays blank, stays still, or reaches a picture that is exact or differs
from MAME's. Failures are listed by cause, and errors by message, so a fault
shared by forty boards reads as one line. The report is saved after every title
and the next survey resumes, skipping titles already graded on the same commit
(`--fresh` re-runs them). Our side runs in a child process, and a title that
fails is run once more and recorded as `retried`, because one or two titles in
a sweep fail once and pass the next run.

**The report** is `.cache/oracle/<target>.json`: per run, every compared frame
with the MAME frame it was set against and its differing pixels, the offset
used, the first RAM divergence, the I/O result, the exact MAME command, the
date and the mamekit commit (marked `dirty` with local changes). The #167
comparisons are one command:

```sh
MAME_BIN=... node tools/mame-oracle.ts nes \
  --titles gimmick,gemfire,erika,smw,esperdr2,abadox,cvania3u,biomirac --frames 1500
```

**Shown with the exhibit.** Generation turns each report into the machine's
`oracle.json` (`src/gen/oracle-result.ts`), keeping only runs from the source
checkout's MAME release. This happens outside the per-target cache, beside the
runtime reports, and the tool refreshes the file after every run. The machine's
page says what it found ("pixel-exact against MAME 0.289 at frames 300, 600,
900 (no input)", "6 of 8 titles pixel-exact at frame 1500"), and the archive's
*Checked against MAME* facet lists machines by it. A machine nobody has checked
says nothing. Running MAME stays local: CI keeps the goldens.

**What CI checks without MAME or ROMs.** `npm run test:unit` type-checks the
tool with the rest of the tree (`tsconfig.json` includes all of `tools/`), so a
harness hook it uses cannot be renamed under it.
`tools/oracle/*.spec.ts` cover:

- the input timeline against the harness's own frame rules;
- MAME's command line: slot options before the title, the medium named,
  cold-boot directories, and the out-of-the-way flags;
- the pixel, RAM and I/O comparisons, and the PNG writer;
- survey grading and grouping.

With no Lua in CI, `mame-side.spec.ts` holds `oracle.lua` and the plan writer
to one vocabulary: every plan field read is written, every timeline event kind
is applied, and the pitfalls above stay fixed in the code.

### ALL-TARGET GENERATION

```sh
npm run test:generation
```

This is the highest-confidence compiler contract. It deletes `dist`, generates
every required target, builds one hardware closure and app,
runs the generated audit, and verifies that the generated catalog has no
blocked target.

Run it after changes to shared parsing, graph reachability, IR schemas,
hardware closure resolution, build topology, or app registration.

### BROWSER VERIFICATION

For UI/runtime changes, test the final generated distribution with Playwright
or a real browser. Required checks:

1. menu loads all three categories from `games.json`;
2. target route imports its canonical generated board;
3. JSON module imports receive `application/json` MIME;
4. local ROM file picker accepts and validates the correct set;
5. framebuffer is nonblank and correctly oriented;
6. status PC values progress and frame rate is stable;
7. coin, start and gameplay inputs are observed, from the keyboard, from a
   connected gamepad (`e2e/specs/gamepad.spec.ts` drives a synthetic one) and,
   for a machine with a dial or trackball, from mouse travel over the screen
   (`e2e/specs/pointer.spec.ts`);
8. generated audio worklet loads after a user gesture;
9. a save state made on the deck (or Shift+F7) loads back (F7), survives a
   reload, and is refused when it came from another machine
   (`e2e/specs/savestate.spec.ts`);
10. an accepted ROM set is kept in the browser and a reload boots without the
    drop screen; a high score written into the machine's hiscore.dat table
    survives that reload; Forget ROM brings the drop screen back
    (`e2e/specs/memory.spec.ts`);
11. two browsers join a room from the invite link, restart together, stay
   frame for frame identical, run at the board's own refresh, and take every
   coin and start button from both sides; the reply code connects from a
   paste anywhere on the page as well as from the box
   (`e2e/specs/netplay.spec.ts`);
12. page and console error logs remain empty;
13. desktop/mobile layout has no overlap.

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
- `docs/ARCHITECTURE.md`;
- `docs/ENGINEERING.md`;
- `docs/TESTING.md`;
- `docs/CONTRIBUTING.md`, which holds the candidate workflow for adding a machine.

Documentation filenames use `UPPERCASE_WITH_UNDERSCORES.md`, and every file
in the set, the root `README.md` and `CLAUDE.md` included, follows it.

Do not add another README or a narrow document that duplicates an existing
section. Extend one of the four documents under `docs/`. Generated per-machine
archival text is named `DOSSIER.md`.

## 11. DEPLOYMENT

Production is a static GitHub Pages site at `mamehistory.com`.

```sh
npm run deploy
```

The site carries no ROMs, and artwork is split. The 779 MB of archival scans
and bezel packs stays in the artwork bucket, published by `make sync-artwork`
in `.data/`, and the browser falls back to it (`src/runtime/artwork-source.ts`);
a copy inside `dist` was most of GitHub Pages' 1 GB budget spent on files that
never change. What the app displays ships with the site, because Pages serves
it far faster than the bucket: on every app build `shipWebArtwork`
(`src/gen/app-build.ts`) wipes `dist/artwork` and rewrites it with the
web-sized `.webp` covers, cartridge art, marquees, cabinets and console and
computer media, and each bezel's `.webp` with its `.json` geometry sidecar.

The deployment script:

1. runs clean `gen:all`;
2. checks `dist/artwork` without editing it: any file but a `.webp` or `.json`,
   or a bezel `.webp` without its sidecar, fails the deploy;
3. writes `.nojekyll` and the configured `CNAME`;
4. creates an ephemeral Git repository inside `dist`;
5. force-pushes one static snapshot to `gh-pages`;
6. waits up to five minutes for the Pages build to report `built`, requesting a
   fresh build once if it is stuck, and fails if it errors or never finishes;
7. probes the live `games.json` and warns if its game count differs from the
   one in `dist`;
8. removes the ephemeral repository on exit.

ROMs are never deployed. Deployment requires the local MAME checkout and any
opt-in local artwork/history assets, so it is manual by design.

All runtime paths must remain relative, with one exception: the shipped
artwork is loaded root-relative (`/artwork/...`, `webArtworkUrl` in
`src/runtime/artwork-source.ts`), because `dist`'s root is the site root on
Pages and under `--serve` alike. Pretty routes are real
`app/g/<target>/index.html` files with `<base href="../../">`. Production audio
requires HTTPS because AudioWorklet requires a secure context.

`dist/index.html` is the front door, written by `src/gen/home.ts` after the
artwork ships: machine counts, the year span and the flyer strip are read from
the generated tree, and its controller legend comes from the generator's key
table and the runtime's standard gamepad mapping, so the page cannot drift
from what the app binds. It links only relatively (`app/`, `app/browse/`,
`artwork/covers/`).

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
