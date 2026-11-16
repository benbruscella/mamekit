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

Remaining #260 items: 2 `mamekit build`, 4 `diverge`, 5 tolerances/`moved`, 3 `--against <commit>`, 7 `sweep`, 6 `levels`.
Supersedes [[mame-oracle-tool]] and [[mame-baseline-204]] for command names. Related: [[ask-before-mame-sweeps]].
