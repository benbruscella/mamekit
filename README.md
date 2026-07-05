# mame2js

Knowledge-graph-first "transpiler" from [MAME](https://github.com/mamedev/mame)
driver source to a runnable browser emulator. Point it at a game; it parses
the real MAME driver, builds a typed **source knowledge graph**, and generates
a TypeScript web app that runs the game on a `<canvas>` — **zero runtime
dependencies**: plain DOM, Web Audio, native `DecompressionStream`.

**Status: Galaga boots and plays** — attract mode, coin-up, gameplay, scoring,
60 fps, wavetable sound. The game running is the original 1981 Z80 machine
code from your ROMs, executed by a TypeScript Z80 core; the machine wiring
(memory map, clocks, video timing, DIPs) is generated from parsing MAME's C++
driver source.

## Quick start

```sh
git clone https://github.com/benbruscella/mame2js
cd mame2js && npm install            # typescript only (dev dep)

# needs a MAME source checkout as sibling (../mame) or set --mame-src/$MAME_SRC
node bin/mame2js.js galaga --serve   # or: npx . galaga --serve
```

Open **http://localhost:8280/app/** — drop your `galaga.zip` on the page (or
put it in `roms/` first). Controls: **arrows** move · **Ctrl/Space** fire ·
**5** coin · **1/2** start.

The knowledge-graph viewer is at **http://localhost:8280/viewer.html** —
a self-contained force-directed browser of the extracted source graph
(search, family filters, node inspector). Also works by just opening
`out/galaga/viewer.html` as a file.

```sh
mame2js galaga            # graph -> generate -> compile web app
mame2js graph galaga      # knowledge graph only (graph.json / .cypher / viewer.html)
mame2js galaga --serve    # ...and serve on :8280
```

Requires **Node ≥ 23.6** (the CLI is TypeScript, run natively — no build step).

## How it works

```
MAME C++ driver source                    (src/mame/namco/galaga.cpp ...)
        │  targeted parsers for the MAME macro DSLs — not a C++ AST:
        │  GAME / ROM_START / address_map / machine_config /
        │  INPUT_PORTS / gfx_layout / GFXDECODE
        ▼
knowledge graph                           out/<game>/graph.json (+ .cypher for Neo4J,
        │                                  + viewer.html — interactive canvas browser)
        │  subgraph reachable from the game node
        ▼
generated app                             out/<game>/app/src/config.ts
        │                                  (ROM manifest, memory-map wiring, screen
        │                                   timing, clocks, DIP defaults, key bindings)
        ▼
shared runtime (src/runtime)              hand-ported, game-agnostic device library:
                                           z80 (266-check spec), bus, ls259, namco06,
                                           namco51 (HLE), wsg + AudioWorklet,
                                           starfield05xx, gfx decode, video, boards/*
```

The split is deliberate: **adding another game should touch almost nothing.**
Everything game-specific is derived from the graph; unknown memory handlers
fail loudly at generation time, naming exactly which device to add to the
library. Next targets (Galaxian, Pac-Man) and a boot menu are tracked in
[issue #1](https://github.com/benbruscella/mame2js/issues/1).

## Documentation

**[docs/](docs/)** is written so a fresh (human or agent) session can pick the
project up cold: [architecture](docs/architecture.md) ·
[knowledge graph](docs/knowledge-graph.md) · [runtime reference](docs/runtime.md) ·
[generator](docs/generator.md) · [adding a game](docs/adding-a-game.md) ·
[testing](docs/testing.md) · [gotchas](docs/gotchas.md) · [TODO](docs/TODO.md).

[sessions/](sessions/) holds the (gzipped) Claude Code transcripts of the
sessions that built this, for the full reasoning history.

## Testing

```sh
npx tsc --noEmit
node src/runtime/z80.spec.ts            # 266 checks incl. exhaustive DAA
node src/runtime/wsg.spec.ts            # frequency-accurate sound core
node src/runtime/video/galaga.spec.ts   # 36 checks: gfx decode, palette, tilemap, LFSR
node src/runtime/boards/galaga.spec.ts  # integration: synthetic ROMs, real IRQ path
```

## ROMs

Not included, not distributable, never committed (`roms/` is gitignored). Use
your own MAME `galaga.zip` — auto-loaded from `roms/` or drag-and-drop onto
the page. ROM files are matched by **CRC32** as well as name, so older
dash-style romsets work. Unzipping happens in the browser via native
`DecompressionStream` — no zip library.

## Knowledge graph in Neo4J (optional)

```sh
cypher-shell -u neo4j -p <pass> < out/galaga/graph.cypher
```

The graph's native store is plain JSON; Neo4J is an export, not a dependency.

## Known gaps

- 54xx explosion noise not yet implemented (the rest of the sound — 3-voice
  WSG wavetable via AudioWorklet — is in).
- Cocktail/flip-screen and player-2 bindings unverified.
- One game so far. See [docs/TODO.md](docs/TODO.md) for the honest full list.
