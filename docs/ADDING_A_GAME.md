# Adding a game or machine

Start with only the MAME short name:

```sh
npm run game:init -- <shortname>
```

This finds the driver in the configured MAME checkout, extracts the selected
machine, generates an isolated runnable app, writes a capability-gap dossier,
and creates a `candidate` pair under `src/games/candidates/`. A candidate is
included in clean generation and compiler coverage, but is not accepted or
published.

## Bring the candidate up

1. Read `.cache/dev/<shortname>/games/<category>/<shortname>/CAPABILITY_GAP.md`.
   Implement missing behavior as reusable extraction, typed IR, generated
   execution, or a capability selected by source shape. Never add a game-name
   runtime branch.
2. Rebuild the isolated target with `npm run game:dev -- <shortname>`. Open its
   app and compare cold boot, controls, video, audio, reset, and active play
   with the pinned MAME revision.
3. Edit the scaffolded `.game.ts` machine/media definition and add one or more
   deterministic scenarios. Computers can stage BIOS, cartridge, quickload,
   cassette, floppy, and peripheral support independently; a scenario should
   claim only the media it actually verifies.
4. Keep source-shape assertions in the adjacent `.game.spec.ts`. Put reusable
   parser, compiler, CPU, device, or renderer assertions beside the owning
   implementation.
5. Run `npm run game:check -- <shortname>` frequently. Before promotion, run a
   clean full generation and audit so the candidate is tested in the same
   hardware closure as accepted targets.

For ambitious platforms, treat the dossier as a dependency plan. Related
targets such as Mortal Kombat and NBA Jam should share TMS34010, T-Unit video,
DMA-template, and sound-board capability work while retaining separate source
protection, init, input, and acceptance facts. A peripheral such as a 1541 is
a composed machine with its own CPU, devices, bus, firmware, media, and tests;
it need not block an earlier C64 cartridge/PRG milestone.

## Record and promote

Only record a golden after the target is visibly correct and the scenario
exercises real behavior:

```sh
node src/games/record-goldens.ts <shortname>
npm run game:check -- <shortname>
npm run audit:game-package -- <shortname>
npm run game:promote -- <shortname>
```

Review every golden change. Region changes imply ROM or patch changes; early
state changes imply execution/lifecycle changes; framebuffer changes imply
video/timing changes; audio write changes imply routing or scheduling; PCM-only
changes imply synthesis/resampling. Never update a golden merely to make a
failure disappear. Promotion requires accepted-level contract validation, a
playable runtime report, and a complete package audit before moving the pair
into `src/games/`.

Goldens remain inline for now. They are small, strongly typed, reviewed beside
the scenario that produces them, and the recorder already replaces the object
safely. Move them to JSON only if multi-scenario machines make payload size a
measured maintenance problem; doing so now would add loading/schema indirection
without reducing onboarding work.

## Final gates

```sh
npm run test:unit
npm run test:current
npm run test:games
MAMEKIT_E2E_GAMES=<shortname> npm run test:e2e
```

The full QA rationale, debugging checklist, MAME comparison commands, and
presentation requirements live in [Testing](TESTING.md) and
[Contributing](CONTRIBUTING.md).
