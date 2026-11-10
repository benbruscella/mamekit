---
name: e2e-webserver-is-the-browser-check
description: "No dev server running? Playwright's own webServer (node bin/mamekit.js --serve 8280, reuseExistingServer) is the sanctioned way to browser-verify; pick a game whose ROM set is self-contained locally"
metadata:
  type: project
---

CLAUDE.md forbids starting a dev server, but `e2e/playwright.config.ts`
declares a `webServer` that runs `node bin/mamekit.js --serve 8280` with
`reuseExistingServer: true`, so `npx playwright test --config
e2e/playwright.config.ts <spec>` verifies the real app whether or not the
user's server is up (2026-09-07, issue #123 gamepad work).

**Why:** the shell can only be proven in a browser, and waiting for a server
that is not running blocks the whole verification.

**How to apply:**
- `--serve` recompiles the app from the working tree first, so do not run a
  Node acceptance sweep concurrently ([[dist-rebuild-breaks-sweeps]]).
- `bootGame` throws on any game whose *device* ROM sets are missing from
  `.data/roms/arcade` (pacman failed that way); `sf2` and `invaders` are
  self-contained and boot cleanly.
- Narrow with `MAMEKIT_E2E_GAMES=<game>` and the spec name as the filter.
- Synthetic hardware goes in via `page.addInitScript` (the gamepad spec
  replaces `navigator.getGamepads`), then `window.mamekit.step(1)` under
  `?qa=1` runs one frame including the shell's poll.
