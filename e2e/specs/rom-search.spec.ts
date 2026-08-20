// Can a visitor who owns no dumps still get a machine running?
//
// The drop screen's "Try web search" button is the only automatic ROM source
// the app has, and it is opt-in by design (user directive 2026-07-19). This
// spec answers the question the Node contracts cannot: does the public mirror
// actually hold a usable set for this machine, and does the app accept it.
//
// It is off by default because it downloads real romsets over the network.
// Enable with MAMEKIT_E2E_ROMSEARCH=1, and narrow it with MAMEKIT_E2E_GAMES.

import { expect, test } from '@playwright/test';
import { selectedContracts } from '../support/contracts.ts';
import { watchFaults } from '../support/game.ts';

test.describe('rom web search', () => {
  test.skip(!process.env.MAMEKIT_E2E_ROMSEARCH, 'set MAMEKIT_E2E_ROMSEARCH=1 to fetch real romsets');

  for (const contract of selectedContracts()) {
    test(`${contract.game} is findable on the web and boots`, async ({ page }) => {
      const faults = watchFaults(page);
      await page.goto(`/app/g/${contract.game}/?qa=1`);
      await page.locator('[data-dropzone]').waitFor({ state: 'visible' });

      // The search only ever runs on a real click, so this is the visitor's
      // gesture, not a back door into the mirror.
      await page.getByRole('button', { name: /try web search/i }).click();

      await page.waitForFunction(
        () => Boolean((window as unknown as { mamekit?: unknown }).mamekit),
        undefined,
        { timeout: 120_000 },
      );

      // A set that downloads but fails its CRC manifest never boots, so
      // reaching the machine is the whole assertion — plus the first frames.
      await page.evaluate(() => (window as unknown as {
        mamekit: { step(count: number): void };
      }).mamekit.step(120));
      expect(faults.errors).toEqual([]);
    });
  }
});
