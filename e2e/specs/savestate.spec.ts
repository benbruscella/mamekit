// Save states through the real app.
//
// The Node contracts prove a board survives a save and a load (every
// accepted game rewinds to a checkpoint and must retrace its trajectory).
// This proves the page delivers it: the deck's buttons, the F7 keys, the
// visitor's own IndexedDB across a reload, and a refusal when the save came
// from another machine. Everything runs under ?qa=1 so frames are counted,
// not raced.

import { expect, test } from '@playwright/test';
import { contractFor } from '../support/contracts.ts';
import { bootGame } from '../support/game.ts';

const game = process.env.MAMEKIT_E2E_GAMES?.split(',')[0]?.trim() || 'pacman';

interface Saves {
  save(): Promise<{ id: string; frame: number } | undefined>;
  load(id: string): Promise<boolean>;
  loadLatest(): Promise<boolean>;
  list(): Promise<{ id: string; frame: number; identity: string }[]>;
  remove(id: string): Promise<void>;
}

/** Step frames on the page and hash the framebuffer the shell presents. */
async function stepAndHash(page: import('@playwright/test').Page, frames: number): Promise<string> {
  return page.evaluate(async (count: number) => {
    const mamekit = (window as unknown as {
      mamekit: { step(n: number): void; framebuffer: Uint32Array; board: { snapshot(): { frame: number } } };
    }).mamekit;
    const zipModule = '/runtime/core/zip.js';
    const { crc32 } = await import(zipModule) as { crc32(bytes: Uint8Array): number };
    mamekit.step(count);
    return `${mamekit.board.snapshot().frame}:${crc32(new Uint8Array(mamekit.framebuffer.buffer)).toString(16)}`;
  }, frames);
}

const saves = (page: import('@playwright/test').Page) => ({
  save: () => page.evaluate(() => (window as unknown as { mamekit: { saves: Saves } }).mamekit.saves.save()),
  load: (id: string) => page.evaluate(saveId => (window as unknown as { mamekit: { saves: Saves } }).mamekit.saves.load(saveId), id),
  list: () => page.evaluate(() => (window as unknown as { mamekit: { saves: Saves } }).mamekit.saves.list()),
  remove: (id: string) => page.evaluate(saveId => (window as unknown as { mamekit: { saves: Saves } }).mamekit.saves.remove(saveId), id),
});

test.describe(`${game} save states`, () => {
  test('a save rewinds the machine, survives a reload, and refuses another machine', async ({ page }) => {
    const contract = contractFor(game);
    const faults = await bootGame(page, contract, { qa: true });
    const deck = page.locator('[data-saves-deck]');
    await expect(deck).toBeVisible();
    // clean slate: a previous run's saves would make "latest" ambiguous
    for (const record of await saves(page).list()) await saves(page).remove(record.id);

    // Into gameplay, then save through the deck button
    const first = contract.actions[0];
    await stepAndHash(page, Math.max(120, first?.atFrame ?? 120) + 60);
    const before = await saves(page).list();
    await deck.getByRole('button', { name: /save state/i }).click();
    await expect(page.locator('[data-saves-shelf] [data-save]')).toHaveCount(before.length + 1);
    const [record] = await saves(page).list();
    expect(record?.frame).toBeGreaterThan(0);

    // The next 90 frames from the save, twice: through F7 they must match.
    const original = await stepAndHash(page, 90);
    await page.keyboard.press('F7');
    await expect(page.locator('[data-toast]')).toContainText('Loaded');
    const replayed = await stepAndHash(page, 90);
    expect(replayed, 'the machine retraces its steps after a load').toBe(original);

    // Shift+F7 saves too, and the shelf shows it newest first.
    await page.keyboard.press('Shift+F7');
    await expect(page.locator('[data-saves-shelf] [data-save]')).toHaveCount(before.length + 2);
    const [newest] = await saves(page).list();
    expect(newest?.frame).toBeGreaterThan(record!.frame);

    // A fresh page: the saves are still in this browser and load into a
    // freshly booted machine.
    await page.reload();
    await bootGame(page, contract, { qa: true });
    await expect(page.locator('[data-saves-shelf] [data-save]')).toHaveCount(before.length + 2);
    const loaded = await saves(page).load(record!.id);
    if (!loaded) {
      // The toast keeps only the first line; the board's own diagnostics say which path did not match.
      const detail = await page.evaluate(async (id: string) => {
        const open = indexedDB.open('mamekit-saves');
        const db = await new Promise<IDBDatabase>((resolve, reject) => { open.onsuccess = () => resolve(open.result); open.onerror = () => reject(open.error); });
        const request = db.transaction('saves', 'readonly').objectStore('saves').get(id);
        const saved = await new Promise<{ state: unknown }>((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
        try {
          (window as unknown as { mamekit: { board: { load(state: unknown): void } } }).mamekit.board.load(saved.state);
          return 'loaded on the second attempt';
        } catch (error) {
          return (error as Error).message;
        }
      }, record!.id);
      expect(loaded, `load after reload: ${detail}`).toBe(true);
    }
    const afterReload = await stepAndHash(page, 90);
    expect(afterReload, 'a save loads into a freshly booted machine').toBe(original);

    // A save from another machine (a tampered identity) is refused untouched.
    const foreign = await page.evaluate(async (id: string) => {
      const open = indexedDB.open('mamekit-saves');
      const db = await new Promise<IDBDatabase>((resolve, reject) => { open.onsuccess = () => resolve(open.result); open.onerror = () => reject(open.error); });
      const store = db.transaction('saves', 'readwrite').objectStore('saves');
      const original = await new Promise<Record<string, unknown>>((resolve, reject) => { const r = store.get(id); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
      const copy = { ...original, id: `${id}-foreign`, identity: 'other|00000000|maincpu=00000000' };
      await new Promise<void>((resolve, reject) => { const r = store.put(copy); r.onsuccess = () => resolve(); r.onerror = () => reject(r.error); });
      return copy.id as string;
    }, record!.id);
    const mark = await stepAndHash(page, 1);
    expect(await saves(page).load(foreign)).toBe(false);
    expect(await stepAndHash(page, 0), 'a refused load changes nothing').toBe(mark);

    for (const save of await saves(page).list()) await saves(page).remove(save.id);
    expect(faults.errors, 'no page errors').toEqual([]);
  });
});
