// The software room, as a visitor meets it (issue #101).
//
// A computer's software arrives on several media, each a MAME software list
// of its own, so the room is one shelf per generated list rather than one
// cartridge catalogue. Like the console room, this is where the machine is
// checked end to end in the browser: the Node contract boots the board, but
// the shelves, the fetch and the mount are all app path.
//
// Three things are asserted:
//   1. the boot menu offers a COMPUTERS tab and the machine is on that shelf;
//   2. the room shows one tab per generated software list, the mountable one
//      first, and a verified title on it offers a working "⌕ Search";
//   3. that button really does fetch a set, shelve it and boot the machine
//      with the tape mounted (network-gated, like the console spec).

import { expect, test } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { repoRoot } from '../support/contracts.ts';
import { watchFaults } from '../support/game.ts';

const MACHINE = process.env.MAMEKIT_E2E_COMPUTER ?? 'c64p';
const machineDir = join(repoRoot, 'dist/games/computers', MACHINE);

interface Shelf { list: string; kind: string; catalogUrl: string; availableUrl?: string; mountable: boolean; entries: number }
interface MachineConfig { software?: { dumpsKey: string; shelves: Shelf[] } }

const generated = existsSync(join(machineDir, 'config.json'));
const config: MachineConfig = generated
  ? JSON.parse(readFileSync(join(machineDir, 'config.json'), 'utf8'))
  : {};
const shelves = config.software?.shelves ?? [];
const mountable = shelves.find(shelf => shelf.mountable);

/** The first verified title on the mountable shelf, from the generated index. */
function firstVerified(): { name: string; description: string } | undefined {
  if (!mountable?.availableUrl) return undefined;
  const available: { carts: { name?: string }[] } =
    JSON.parse(readFileSync(join(machineDir, mountable.availableUrl), 'utf8'));
  const catalog: { entries: { name: string; description: string; supported?: string }[] } =
    JSON.parse(readFileSync(join(machineDir, mountable.catalogUrl), 'utf8'));
  const names = new Set(available.carts.map(cart => cart.name).filter(Boolean));
  return catalog.entries.find(entry => names.has(entry.name) && !entry.supported);
}

test.describe('software room', () => {
  test.skip(!generated, `generate the computer first: node bin/mamekit.js ${MACHINE}`);

  test('is on the boot menu behind a COMPUTERS tab', async ({ page }) => {
    const faults = watchFaults(page);
    await page.goto('/app/');
    const computers = page.locator('[data-tab="computers"]');
    await expect(computers).toBeVisible();
    await computers.click();
    await expect(page.locator(`[data-cart-badge="${MACHINE}"]`)).toBeVisible();
    expect(faults.errors).toEqual([]);
  });

  test('offers one shelf per software list and a web search on a verified title', async ({ page }) => {
    const faults = watchFaults(page);
    expect(shelves.length, 'the machine declares no software list').toBeGreaterThan(0);
    await page.goto(`/app/g/${MACHINE}/`);
    await page.locator('[data-software-room]').waitFor({ state: 'visible' });

    for (const shelf of shelves) {
      await expect(page.locator(`[data-media-tab="${shelf.list}"]`)).toBeVisible();
    }
    expect(mountable, 'no shelf can mount its medium').toBeTruthy();
    await expect(page.locator(`[data-media-tab="${mountable!.list}"]`)).toHaveAttribute('aria-selected', 'true');

    const verified = firstVerified();
    test.skip(!verified, 'no verified dump audited for the mountable shelf');
    await page.getByPlaceholder(/search titles/i).fill(verified!.description.replace(/\s*\(.*\)$/, ''));
    const tile = page.locator(`[data-catalog-set="${verified!.name}"]`);
    await expect(tile).toBeVisible();
    await expect(tile.locator('[data-fetch]')).toBeEnabled();

    // A shelf whose medium has no transport is browsable but says so.
    const display = shelves.find(shelf => !shelf.mountable);
    if (display) {
      // the search term follows the visitor across shelves, so clear it first
      await page.getByPlaceholder(/search titles/i).fill('');
      await page.locator(`[data-media-tab="${display.list}"]`).click();
      await expect(page.locator('[data-catalog-set]').first()).toBeVisible();
      await expect(page.locator('[data-catalog-set] [data-fetch]').first()).toBeDisabled();
    }
    expect(faults.errors).toEqual([]);
  });

  // Off by default: it pulls a real dump over the network, and then needs the
  // machine's own firmware, which the web search also has to find.
  test('fetches a set from the web and boots the machine with it mounted', async ({ page }) => {
    test.skip(!process.env.MAMEKIT_E2E_ROMSEARCH, 'set MAMEKIT_E2E_ROMSEARCH=1 to fetch a real set');
    const verified = firstVerified();
    test.skip(!verified, 'no verified dump audited for the mountable shelf');
    const faults = watchFaults(page);
    await page.goto(`/app/g/${MACHINE}/`);
    await page.locator('[data-software-room]').waitFor({ state: 'visible' });
    await page.getByPlaceholder(/search titles/i).fill(verified!.description.replace(/\s*\(.*\)$/, ''));
    const tile = page.locator(`[data-catalog-set="${verified!.name}"]`);
    await tile.locator('[data-fetch]').click();

    const shelved = page.locator('[data-owned-set]').first();
    await expect(shelved).toBeVisible({ timeout: 120_000 });
    await shelved.locator('[data-play]').click();

    // The machine asks for its firmware: the web search finds it under the
    // machine's own dump directory.
    await page.locator('[data-dropzone]').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /try web search/i }).click();
    await page.waitForFunction(
      () => Boolean((window as unknown as { mamekit?: unknown }).mamekit),
      undefined,
      { timeout: 120_000 },
    );
    await expect(page.getByRole('status').filter({ hasText: /mounted/ }).first()).toBeVisible();
    // The decks are part of the machine: the screen yields room to them, so
    // neither one is pushed below the fold and the page needs no scrolling.
    const layout = await page.evaluate(() => {
      const bottoms = [...document.querySelectorAll('[aria-label^="Cassette"], [data-computer-deck]')]
        .map(deck => Math.round(deck.getBoundingClientRect().bottom));
      return { bottoms, viewport: innerHeight, scrollHeight: document.documentElement.scrollHeight };
    });
    expect(layout.bottoms.length, 'both decks are on the page').toBe(2);
    for (const bottom of layout.bottoms) expect(bottom).toBeLessThanOrEqual(layout.viewport);
    expect(layout.scrollHeight).toBeLessThanOrEqual(layout.viewport + 1);
    // The firmware search tries the clone's own set name before the family's,
    // and a computer has no bezel: both are 404s the browser logs as errors.
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });
});
