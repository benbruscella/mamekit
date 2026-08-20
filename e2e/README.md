# BROWSER QA (e2e)

Playwright tests that play every supported machine through the real app.

`npm run test:games` proves a generated board behaves correctly when driven
directly from Node. It never opens the app: no DOM, no canvas, no
AudioWorklet, no keyboard. Everything a visitor touches is therefore unproven
by that gate, which is how a broken audio path can pass it and still ship a
silent game. This suite closes that gap, and it is what replaces play-testing
each machine by hand.

## LAYOUT

```
e2e/
├── playwright.config.ts   projects, the dev server, snapshot locations
├── specs/
│   ├── arcade.spec.ts     every accepted machine, boot -> coin -> play
│   └── rom-search.spec.ts opt-in: is the romset findable on the web
├── support/
│   ├── contracts.ts       the src/games inventory, as data
│   └── game.ts            booting, replaying, audio and screen read-back
└── snapshots/             one presented frame per machine
```

## WHAT IS CHECKED

`arcade.spec.ts` runs two passes per machine.

The **contract pass** loads `/app/g/<game>/?qa=1`, feeds the app's own ROM
picker from `.data/roms`, and replays that machine's accepted input schedule —
coin, start, joystick, buttons — through window key events. `?qa=1` parks the
wall-clock timestep so the test owns frame advancement; every other part of
the page is untouched. It then compares:

- assembled region hashes, so the picker built the accepted ROM set;
- every checkpoint's framebuffer and CPU/device state hash against the golden
  in `src/games/<game>.ts`;
- the presented canvas against `snapshots/<game>-final.png`.

The goldens are the ones the Node contract already owns. There is no second
baseline to keep in step: a browser failure means the app path diverged.

The **live pass** loads the same machine with its normal run loop and plays it
in real time with real key events. It checks that the machine reaches full
speed and that sound actually reaches the speakers, measured on the app's own
AudioWorklet graph. Attract mode measures exactly `0` there, so the threshold
is not a judgement call.

`rom-search.spec.ts` clicks the drop screen's "Try web search" button and
requires the public mirror to hand back a set that passes the CRC manifest and
boots. It downloads real romsets, so it is off unless
`MAMEKIT_E2E_ROMSEARCH=1`.

## RUNNING

ROMs are required and never committed, so this gate is local only — CI cannot
run it. Generate a clean distribution first.

```sh
npm run test:current          # clean dist the suite will drive
npm run test:e2e              # every accepted machine, headless
npm run test:e2e:headed       # watch it play in a real browser window
MAMEKIT_E2E_GAMES=invaders,pacman npm run test:e2e
MAMEKIT_E2E_ROMSEARCH=1 npm run test:e2e
```

The suite starts `mamekit --serve` itself, which recompiles the app from the
current tree, and reuses a server already listening on the port.

| Variable | Effect |
|---|---|
| `MAMEKIT_HEADED=1` | Open a real browser window. Playwright's own `--headed` does the same. |
| `MAMEKIT_E2E_GAMES` | Comma-separated machines to cover, instead of all of them. |
| `MAMEKIT_E2E_ROMSEARCH=1` | Also run the web-search spec, which downloads real romsets. |
| `MAMEKIT_SLOWMO` | Milliseconds between Playwright actions; only useful headed. |
| `MAMEKIT_PORT` | Port for the dev server (default 8280). |
| `PLAYWRIGHT_WORKERS` | Parallel machines. |

### WATCHING IT PLAY

Headed drops to one worker on its own, so machines come up one at a time
rather than four windows at once. Pair it with `MAMEKIT_E2E_GAMES` to sit with
a single machine:

```sh
MAMEKIT_E2E_GAMES=invaders npm run test:e2e:headed
```

The live pass is the watchable one: it runs at the machine's real refresh rate
for about fifteen seconds, inserting a coin, pressing start and playing. The
contract pass drives frames itself and finishes a 600-frame contract in a
couple of seconds, which is the point of it.

## WHICH MACHINES TO RUN

After a runtime or compiler change, `npm run blast-radius` derives the affected
machines from the generated artifacts and prints the `MAMEKIT_E2E_GAMES=...`
command for exactly those, instead of sweeping all of them:

```sh
node tools/blast-radius.ts --device NAMCO_53XX
node tools/blast-radius.ts --multi-slot
node tools/blast-radius.ts                    # infer from the working diff
```

Query the mechanism you changed, not the file you edited. A generic
`src/runtime` module reaches every machine and the tool says so.

## SNAPSHOTS

`snapshots/<game>-final.png` is the canvas backing store — the rotated frame
the shell actually blitted, at native resolution — not a rendered element
screenshot, which drifts by a pixel between headed and headless windows.

Record with `npm run test:e2e:record`, and only after the checkpoint hashes
pass: the image is pinned by a golden that was already reviewed, so recording
it is not a decision. A snapshot that changes while the hashes still match
means the presentation path changed, not the machine.

## ADDING A MACHINE

Nothing. The set comes from `src/games`, so a new token joins browser QA when
it is added and leaves the moment it moves to `src/games/disabled/`. Only the
`snapshots/<game>-final.png` baseline needs recording.
