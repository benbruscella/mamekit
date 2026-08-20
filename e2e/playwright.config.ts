// Browser QA for generated arcade machines.
//
// The Node acceptance contracts in src/games prove a generated board is
// correct when driven directly. They deliberately bypass the app: no DOM, no
// canvas, no AudioWorklet, no keyboard. Everything a visitor actually touches
// is therefore unproven until here, which is why an audio-wiring break can
// pass `npm run test:games` and still ship a silent game.
//
// These tests drive the real app at /app/g/<game>/ and reuse the goldens the
// Node contracts already own, so a browser failure means the app path
// diverged — not that a new baseline needs recording.
//
// ROMs are required and never committed: the suite reads them from the same
// gitignored .data/roms tree the Node contracts use, so CI cannot run this.
import { defineConfig, devices } from '@playwright/test';

const port = process.env.MAMEKIT_PORT ?? '8280';

// Watching a machine play is the point of this suite, so headed is a
// first-class mode rather than a flag you have to remember. MAMEKIT_HEADED=1
// and Playwright's own --headed both select it; argv is read here only so the
// worker count can follow the flag, because a wall of browser windows opening
// four at a time is not watchable.
const headed = process.env.MAMEKIT_HEADED === '1' || process.argv.includes('--headed');

// Milliseconds to pause between Playwright actions. Only useful headed, and
// only for the live pass — the contract pass drives frames itself and runs
// flat out by design.
const slowMo = Number(process.env.MAMEKIT_SLOWMO ?? 0);

export default defineConfig({
  testDir: './specs',
  // One machine replays its whole contract — thousands of emulated frames —
  // through the canvas, and the longest contracts run 2,400.
  timeout: 5 * 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.PLAYWRIGHT_WORKERS
    ? Number(process.env.PLAYWRIGHT_WORKERS)
    : headed ? 1 : 4,
  reporter: [['list']],
  // One baseline per machine, kept together rather than in a sibling directory
  // of every spec file. They are native-resolution canvas read-backs, so there
  // is nothing platform-specific to key them on.
  snapshotPathTemplate: '{testDir}/../snapshots/{arg}{ext}',
  use: {
    baseURL: `http://localhost:${port}`,
    headless: !headed,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'arcade',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo,
          args: [
            // Web Audio must render without a click: the app starts its own
            // AudioContext and QA has no user gesture to offer it.
            '--autoplay-policy=no-user-gesture-required',
          ],
        },
      },
    },
  ],
  webServer: {
    command: `node bin/mamekit.js --serve ${port}`,
    url: `http://localhost:${port}/games.json`,
    cwd: '..',
    reuseExistingServer: true,
    // --serve recompiles the app from the current tree before it listens.
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
