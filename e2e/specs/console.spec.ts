// The console room, as a visitor meets it.
//
// A console has no romset of its own, so it cannot hold a Node acceptance
// contract the way an arcade machine does — its software arrives on cartridges
// the visitor supplies. That makes this the only place the machine is checked
// end to end, which is exactly how issue #53 came to drop it: the target left
// the build and nothing went red.
//
// Three things are asserted, and they are the three issue #85 asked for:
//   1. the boot menu offers a CONSOLES tab and the machine is on that shelf;
//   2. every title the machine claims support for is on the shelf with a
//      cartridge scan and a working "⌕ Search" button;
//   3. that button really does fetch a dump and boot it (network-gated, like
//      the arcade rom-search spec — it downloads real cartridges).

import { expect, test } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { repoRoot } from '../support/contracts.ts';
import { watchFaults } from '../support/game.ts';

const MACHINE = 'nes';
const machineDir = join(repoRoot, 'dist/games/consoles', MACHINE);

interface SoftEntry { name: string; description: string; cloneof?: string }
interface MachineConfig {
  cart?: { games?: string[]; cartArt?: Record<string, { cart?: string; sticker?: string }> };
}

const generated = existsSync(join(machineDir, 'config.json'));
const config: MachineConfig = generated
  ? JSON.parse(readFileSync(join(machineDir, 'config.json'), 'utf8'))
  : {};
const catalog: { entries: SoftEntry[] } = generated
  ? JSON.parse(readFileSync(join(machineDir, 'softlist.json'), 'utf8'))
  : { entries: [] };
const availability: { carts: { name?: string; file: string; tier: string }[] } =
  existsSync(join(machineDir, 'carts.json'))
    ? JSON.parse(readFileSync(join(machineDir, 'carts.json'), 'utf8'))
    : { carts: [] };

/**
 * The dump the shelf offers for each supported title.
 *
 * A support entry names the softlist PARENT and the collection often holds a
 * different region of it — `smb` is the European Super Mario Bros. while the
 * dump on hand is `smb1`. The shelf keys its tile, its scan and its fetch
 * button off the dump, so that is what these assertions look for.
 */
const supported = (config.cart?.games ?? []).map(title => {
  const family = catalog.entries.filter(entry => (entry.cloneof ?? entry.name) === title);
  const dumps = new Set(availability.carts
    .filter(cart => cart.tier === 'verified' && cart.name)
    .map(cart => cart.name!));
  const candidates = family.filter(entry => dumps.has(entry.name));
  return { title, dump: candidates.find(entry => entry.name === title) ?? candidates[0] };
});

test.describe('console room', () => {
  test.skip(!generated, `generate the console first: node bin/mamekit.js ${MACHINE}`);

  test('is on the boot menu behind a CONSOLES tab', async ({ page }) => {
    const faults = watchFaults(page);
    await page.goto('/app/');

    // Issue #53 removed the only console and the tab bar went with it, because
    // it is derived from what the manifest actually holds (menuTabs). Its
    // return is therefore the honest signal that the target is built again.
    const consoles = page.locator('[data-tab="consoles"]');
    await expect(consoles).toBeVisible();
    await expect(page.locator('[data-tab="arcade"]')).toBeVisible();

    await consoles.click();
    // Console tiles carry the cart-count badge; an arcade tile never does.
    await expect(page.locator(`[data-cart-badge="${MACHINE}"]`)).toBeVisible();
    expect(faults.errors).toEqual([]);
  });

  test('offers every supported cartridge with art and a web search', async ({ page }) => {
    const faults = watchFaults(page);
    await page.goto(`/app/g/${MACHINE}/`);
    await page.locator('[data-console-room]').waitFor({ state: 'visible' });

    // The shelf pages at 48 tiles and defaults to a filter, so drive it the way
    // a visitor looking for one cartridge does: type its name in the search box.
    const search = page.getByPlaceholder(/search titles/i);
    const cartArt = config.cart?.cartArt ?? {};

    expect(supported.length, 'the machine claims no supported cartridges')
      .toBeGreaterThan(0);

    const withoutDump: string[] = [];
    const withoutArt: string[] = [];
    for (const entry of supported) {
      if (!entry.dump) { withoutDump.push(entry.title); continue; }
      if (!cartArt[entry.dump.name]) withoutArt.push(entry.dump.name);
    }
    // Reported as whole lists rather than one failing title at a time: a gap
    // here is a data gap, and the fix is `node tools/nes-cart-art.ts`.
    expect(withoutDump, 'supported titles the web search cannot fetch').toEqual([]);
    expect(withoutArt, 'supported titles with no cartridge scan').toEqual([]);

    // Spot-check the shelf itself on one title per mapper family rather than
    // all fifty: the tile is built by one code path, and fifty searches is four
    // minutes of QA to prove the same thing once.
    for (const name of ['smb1', 'gradiusu', 'cvaniau', 'zeldau', 'smb3']) {
      const entry = supported.find(item => item.dump?.name === name);
      expect(entry, `${name} is not a supported cartridge any more`).toBeTruthy();
      await search.fill(entry!.dump!.description.replace(/\s*\(.*\)$/, ''));
      const tile = page.locator(`[data-catalog-cart="${entry!.dump!.name}"]`);
      await expect(tile).toBeVisible();
      // The fetch button is what "playable using search web" means.
      await expect(tile.locator('[data-fetch]')).toBeEnabled();
      await expect(tile.locator('img')).toBeVisible();
    }
    expect(faults.errors).toEqual([]);
  });

  // Off by default: it pulls real cartridge dumps over the network, the same
  // reason the arcade rom-search spec is opt-in.
  test('fetches a cartridge from the web and boots it', async ({ page }) => {
    test.skip(!process.env.MAMEKIT_E2E_ROMSEARCH,
      'set MAMEKIT_E2E_ROMSEARCH=1 to fetch a real cartridge');
    const faults = watchFaults(page);
    await page.goto(`/app/g/${MACHINE}/`);
    await page.locator('[data-console-room]').waitFor({ state: 'visible' });

    const entry = supported.find(item => item.dump?.name === 'smb1');
    expect(entry, 'smb1 is not a supported cartridge any more').toBeTruthy();
    await page.getByPlaceholder(/search titles/i).fill('Super Mario Bros.');
    const tile = page.locator('[data-catalog-cart="smb1"]');
    await expect(tile).toBeVisible();
    await tile.locator('[data-fetch]').click();

    // The fetched cart lands in YOUR CARTRIDGES; playing it is a second gesture.
    const shelved = page.locator('[data-cart-tile]').first();
    await expect(shelved).toBeVisible({ timeout: 120_000 });
    await shelved.locator('[data-play]').click();

    await page.waitForFunction(
      () => Boolean((window as unknown as { mamekit?: unknown }).mamekit),
      undefined,
      { timeout: 60_000 },
    );
    // A cartridge that boots but draws nothing is the state issue #85 found the
    // console in, so the assertion is on pixels, not on reaching the shell.
    const colours = await page.evaluate(async () => {
      const api = (window as unknown as { mamekit: { step(count: number): void } }).mamekit;
      api.step(400);
      const canvas = document.querySelector('[data-screen]') as HTMLCanvasElement;
      const pixels = canvas.getContext('2d')!
        .getImageData(0, 0, canvas.width, canvas.height).data;
      const seen = new Set<number>();
      for (let index = 0; index < pixels.length; index += 4) {
        seen.add((pixels[index]! << 16) | (pixels[index + 1]! << 8) | pixels[index + 2]!);
      }
      return seen.size;
    });
    expect(colours, 'the cartridge booted to a blank screen').toBeGreaterThan(4);
    expect(faults.errors).toEqual([]);
  });
});
