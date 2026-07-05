# mame2js

Knowledge-graph-first "transpiler" from MAME driver source to a runnable
browser emulator. Point it at a game; it parses the real MAME driver, builds a
typed source knowledge graph, and generates a TypeScript web app that runs the
game on a `<canvas>` — no runtime libraries, plain DOM + Web Audio.

```
mame2js galaga            # graph -> generate -> compile web app
mame2js graph galaga      # knowledge graph only
mame2js galaga --serve    # ...and serve on http://localhost:8280
```

Requires Node >= 23.6 (runs TypeScript natively). One dev dependency: `tsc`
for the browser build.

## How it works

```
MAME C++ driver source                    (src/mame/namco/galaga.cpp ...)
        │  targeted parsers for the MAME macro DSLs — not a C++ AST:
        │  GAME / ROM_START / address_map / machine_config /
        │  INPUT_PORTS / gfx_layout / GFXDECODE
        ▼
knowledge graph                           out/<game>/graph.json (+ .cypher for Neo4J,
        │                                  + viewer.html — interactive canvas browser)
        │  subgraph reachable from game node
        ▼
generated app                             out/<game>/app/src/config.ts + main.ts
        │                                  (ROM manifest, memory map wiring, screen,
        │                                   clocks, DIP defaults, key bindings)
        ▼
shared runtime (src/runtime)              hand-written device library, game-agnostic:
                                           z80, ls259, namco06, namco51 (HLE), wsg,
                                           starfield05xx, gfx decode, bus, boards/*
```

The split is deliberate: **adding another game should touch almost nothing.**
The generator resolves everything game-specific from the graph; unknown memory
handlers fail loudly at generation time, telling you exactly which device/
handler to add to the library.

## ROMs

Not included, not distributable. Put `galaga.zip` (MAME romset) in `roms/`, or
drag-and-drop the zip onto the page. Unzipping happens in the browser via the
native `DecompressionStream` — no zip library.

## Knowledge graph in Neo4J (optional)

```
cypher-shell -u neo4j -p <pass> < out/galaga/graph.cypher
```

Or just open `out/galaga/viewer.html` — self-contained force-directed viewer
(search, family filters, node inspector).

## Status

- galaga: first target. 3x Z80 @ 3.072 MHz, Namco 06xx/51xx (HLE), WSG
  3-voice wavetable sound (AudioWorklet), tilemap + sprites + 05xx starfield.
- 54xx explosion noise: not yet implemented.
- Controls: arrows move, Ctrl/Space fire, 5 coin, 1/2 start.
