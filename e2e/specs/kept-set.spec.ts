// A kept set against what the machine requires, through the real app (issue
// #232). The acceptance harness never runs the shell's boot path, and the unit
// specs cover the rule itself. This proves a player who kept Carnival's ROM
// before it played samples lands on the drop screen and gets them from there,
// and that nobody is sent back to it twice. The C64's half is in computer.spec.ts.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import { contractFor, repoRoot, romFiles } from '../support/contracts.ts';
import { bootGame } from '../support/game.ts';

const game = 'carnival';
const sampleZip = join(repoRoot, '.data/samples', `${game}.zip`);

const samplePath = (page: Page): Promise<string[]> => page.evaluate(() => Object.keys(
  (window as unknown as { mamekit: { samplePath?: Record<string, unknown> } }).mamekit.samplePath ?? {}));

/** Make the kept record what an older build left: no record of what was required. */
async function keptBeforeRequirements(page: Page, name: string): Promise<void> {
  await page.evaluate(async (key: string) => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const open = indexedDB.open('mamekit-roms');
      open.onsuccess = () => resolve(open.result);
      open.onerror = () => reject(open.error);
    });
    const store = db.transaction('roms', 'readwrite').objectStore('roms');
    const record = await new Promise<Record<string, unknown>>(resolve => {
      const get = store.get(key);
      get.onsuccess = () => resolve(get.result);
    });
    delete record.requires;
    await new Promise(resolve => { store.put(record).onsuccess = resolve; });
    db.close();
  }, name);
}

test.describe('kept set', () => {
  test(`${game} kept before it played samples reaches them through the drop screen`, async ({ page }) => {
    test.skip(!existsSync(sampleZip), `no local sample set at ${sampleZip}`);
    const contract = contractFor(game);
    // The mirror, answered from the local sets so this runs without a network.
    await page.route(`**/samplesearch/${game}.zip`, route =>
      route.fulfill({ body: readFileSync(sampleZip), contentType: 'application/zip' }));
    await page.route(`**/romsearch/arcade/${game}.zip`, route =>
      route.fulfill({ body: readFileSync(romFiles(contract)[0]!), contentType: 'application/zip' }));

    await bootGame(page, contract, { qa: true });
    expect(await samplePath(page)).toEqual([]);
    await keptBeforeRequirements(page, game);

    // Cleared, told why, and back at the normal flow.
    await page.reload();
    await page.locator('[data-dropzone]').waitFor({ state: 'visible' });
    await expect(page.locator('[data-toast]')).toContainText('its kept set was cleared');
    await expect(page.locator('[data-zone-note]')).toContainText('so that set was cleared');
    await page.getByRole('button', { name: /try web search/i }).click();
    await page.waitForFunction(() => Boolean((window as unknown as { mamekit?: unknown }).mamekit), undefined, { timeout: 60_000 });
    expect(await samplePath(page)).toEqual([game]);

    // And it boots straight in from then on, samples and all.
    await page.reload();
    await page.waitForFunction(() => Boolean((window as unknown as { mamekit?: unknown }).mamekit), undefined, { timeout: 60_000 });
    await expect(page.locator('[data-dropzone]')).toHaveCount(0);
    expect(await samplePath(page)).toEqual([game]);
  });

  test(`${game} kept without its optional samples is not asked for again`, async ({ page }) => {
    const contract = contractFor(game);
    await bootGame(page, contract, { qa: true });
    await page.reload();
    await page.waitForFunction(() => Boolean((window as unknown as { mamekit?: unknown }).mamekit), undefined, { timeout: 60_000 });
    await expect(page.locator('[data-dropzone]')).toHaveCount(0);
    expect(await samplePath(page)).toEqual([]);
  });

  test('a set that still meets the requirements stays through the change', async ({ page }) => {
    const contract = contractFor('sf2');
    await bootGame(page, contract, { qa: true });
    await keptBeforeRequirements(page, 'sf2');
    await page.reload();
    await page.waitForFunction(() => Boolean((window as unknown as { mamekit?: unknown }).mamekit), undefined, { timeout: 60_000 });
    await expect(page.locator('[data-dropzone]')).toHaveCount(0);
  });
});
