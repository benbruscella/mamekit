---
name: mamekit-compare-commands
description: "#260: MAME comparison is `mamekit against|record|compare|show` (tools/compare); no separate mkt CLI; .env holds MAME paths; MAME side cached in .mamekit/mame"
metadata:
  node_type: memory
  type: project
  originSessionId: 231f5567-c8c1-496f-abd9-46774502e414
  modified: 2026-11-16T08:19:29.731Z
---

Since #260 (2026-11-16) the old `tools/mame-oracle.ts` / `tools/mame-baseline.ts` / `npm run oracle:baseline` are gone.

- Run: `npm run mamekit -- against <target> [title]`, `record`, `compare`, `show`, `help <cmd>`. bin/mamekit.js routes these to tools/compare/cli.ts; src/cli.ts imports nothing from tools/.
- The user ruled: **no separate `mkt` tool and no second bin**. Everything is a `mamekit` subcommand. `run` was renamed `against` because `mamekit <target>` already means generate.
- Paths come from git-ignored `.env` (src/local-env.ts; MAME_SRC, MAME_BIN, MAMEKIT_ROMS, MAMEKIT_SAMPLES). The shell wins over the file. Never write absolute MAME paths into the repo.
- State: `.mamekit/{baseline,compare,mame}` (was `.oracle/`), reports in `.cache/compare/` (was `.cache/oracle`). Old baselines store `tools/mame-oracle.ts` as their first arg; `cliArguments` maps that to `against`.
- MAME cache key = MAME args + Lua plan (work dir neutralised) + oracle.lua + version + set-file stamps. Moving oracle.lua's path changes every key once. Flags: `--refresh-mame`, `--verify-mame` (writes uncacheable.json), `--no-mame-cache`.
- A cached compare is bounded by our side's emulation (dkong: 47 s for two runs). It defaults to half the cores.

All seven #260 items landed 2026-11-16:
- `mamekit build`: tsc over the staged runtime only, ~2 s; `--check` was identical after a full build. Use it instead of `--build-app` for runtime-only changes.
- `diverge`: ranges come from the board maps. Marble: `$1820` 97/87 at frame 384.
- Verdicts: `TOLERANCE` in baseline.ts, `moved` within it. Pixels are read at the baseline's offset first.
- `compare --against <commit>` and `against --runtime <commit>`: a git-archive overlay in `.cache/compare/overlay`. Copies, because symlinks break module resolution.
- `sweep`: classifies each contract; the harness `throughput` option skips the fps floor.
- `levels`: harness `onSoundWrite` plus `MAMEKIT_OBSERVE_STREAMS`.
- The MAME cache keys oracle.lua's code only, not its comments. **It must be refilled after the #260 lua changes**: that is a full 107-scenario MAME pass, so ask the user first.
- Taps on a 16-bit bus are aligned to whole words, and word accesses are logged once on both sides.
Supersedes [[mame-oracle-tool]] and [[mame-baseline-204]] for command names. Related: [[ask-before-mame-sweeps]].
