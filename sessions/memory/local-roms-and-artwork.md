---
name: local-roms-and-artwork
description: "Which ROM and artwork zips exist locally (gitignored, so not discoverable from the repo)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7daada0d-2bc1-4df2-9a32-20e84fa4451c
---

As of 2026-07-06 the user's local (gitignored) assets are:

- `_roms/` (user renamed from `roms/` on 2026-07-06, so the dev server 404s zips and the drag-drop uploader shows; rename back to `roms/` to restore auto-load): galaga.zip (dash-style names, incl. 54xx.bin), pacman.zip, galaxian.zip, gyruss.zip, invaders.zip, mpatrol.zip. **Incident:** the rename escaped `.gitignore` and the zips got committed+pushed on the issue-#3 branch; scrubbed via filter-branch + force-push on 2026-07-06, `.gitignore` now blocks `/roms/`, `/_roms/`, and `*.zip` — old blobs may linger on GitHub until GC (contact GitHub support for a hard purge if it matters).
- `artwork/`: galaga.zip, galaxian.zip, pacman.zip — downloaded from Mr. Do's site via direct URLs `https://mrdo.mameworld.info/artwork/<name>.zip` (the site's download *pages* are broken, direct paths work). Pac-Man's artwork lives under its parent set name **puckman** upstream; saved locally as pacman.zip. Each zip's `default.lay` gives the exact CRT screen bounds (artwork.ts parses it).
- `artwork/data/history/history.xml`: the 61 MB Gaming History (arcade-history.com) dat — the generator extracts per-game story text from it at transpile time.
- `artwork/covers/<game>.png`: classic promotional flyers, and `artwork/media/{marquees,cpanels,cabinets}/<game>.png`: cabinet part scans — all from Arcade Database: `http://adb.arcadeitalia.net/media/mame.current/<kind>/<game>.png` (follow redirects with `curl -L`; available kinds also include pcbs, decals, titles, ingames, scores). Menu covers use flyers; the game page shows marquee + bezel + control panel as a full cabinet.

**Why:** roms/ and artwork/ are gitignored (copyright), so future sessions can't learn this from git; browser verification of pacman/galaxian is possible with these sets.
**How to apply:** don't ask the user for ROMs for these three games; fetch more artwork with the direct URL pattern (check parent-set names when a game 404s).
