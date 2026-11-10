---
name: attribution-from-release-notes
description: "Driver credit comes from MAMEDEV release notes + copyright-holders header, never git log; the two name collisions that mis-credit 100+ entries"
metadata:
  type: project
---

Vas Crabb's objection (2026-09-11) was right and is now a hard rule in CLAUDE.md:
`git log --follow` cannot answer "who wrote this driver?" — it misses code moved
between files, weights a typo fix like a rewrite, credits the committer for work
landed on someone's behalf, and cannot reconcile name spellings. **Pac-Man is the
proof**: top committers were Aaron Giles / Ivan Vangelista / Miodrag Milanovic
(tree-wide refactors); the header credits Nicola Salmoria.

Credit now comes from two records (`src/gen/driver-attribution.ts`):
1. the driver's `copyright-holders` header — the only source reaching back before
   the release-notes era, and the strongest claim available;
2. MAMEDEV's published release notes, fetched by `tools/fetch-release-notes.ts`
   into `.data/release-notes/` (never committed: their prose, not ours).
   `make -C .data sync-release-notes` mirrors it. **Re-fetch after every MAME
   update** or the newest release under-credits silently.

Notes are discovered from https://www.mamedev.org/oldrel.html (702 files listed).
Only `whatsnew_0NNN`/`messnew_0NNN` >= 0.100 are used: older ones name
`src/drivers/pacman.c`, and mapping two decades of reorganisation onto today's
paths is exactly the guesswork we refuse. Keys are **machine names first** (stable
for decades), path stems second (`src/drivers/pacman.c` == `pacman/pacman.cpp`).

Two collisions each mis-credited 100+ entries before being caught by eyeballing
real output — always spot-check a dozen targets against the header:

- **Software lists share machine titles.** MAME has home ports named "Pac-Man";
  matching by name alone put TOSEC / Total DOS Collection / ClawGrip dump credits
  on pacman.cpp. Software-list sections are parsed as kind `software` and never
  attributed to a driver.
- **`<list>.xml` shares a stem with `<driver>.cpp`.** `nes.xml` -> stem `nes` gave
  the NES driver 108 credits for one prolific software-list contributor; likewise
  neogeo/a2600. Only `.c/.cpp/.h` paths outside device roots (cpu/ sound/ video/
  bus/ ...) can be a driver — `sound/gb.cpp` vs `nintendo/gb.cpp` is the same trap.

Commit counts still ship as `commitActivity` (method + MAME revision attached,
labelled "not a statement of authorship"), never as `topAuthors`. See
[[warm-cache-outlives-code]] for how removing those fields failed the first time.
