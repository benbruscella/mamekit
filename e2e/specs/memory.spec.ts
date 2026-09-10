// What this browser keeps for a machine, through the real app (issue #132).
//
// The unit specs prove the keeper follows MAME's hiscore plugin and the
// stores round-trip in Node's fallback. This proves the page delivers it: a
// dropped set is kept and a reload boots without the drop screen, a score
// written into the hiscore.dat table is back in the machine after that
// reload, and Forget ROM brings the drop screen back. Under ?qa=1 so frames
// are counted, not raced.

import { expect, test } from '@playwright/test';
import { contractFor } from '../support/contracts.ts';
import { bootGame } from '../support/game.ts';

// Pac-Man's hiscore.dat entry names its high score at 4e88 (4 bytes, BCD) and
// the table sentinels at 43ed/43d1; any machine with an entry works here.
const game = process.env.MAMEKIT_E2E_GAMES?.split(',')[0]?.trim() || 'pacman';

interface Row { cpu: string; space?: string; share?: string; address: number; length: number }
interface Mamekit {
  config: { hiscore?: { rows: Row[] } };
  board: { memory(row: Row): { read(address: number): number; write(address: number, value: number): void } | undefined };
  memory: { hiscoreRows: number; hiscoreArmed(): boolean; flush(): void };
  step(frames: number): void;
}
/** Run frames until the plugin has accepted the table (the game initialised it). */
async function armHiscore(page: import('@playwright/test').Page): Promise<void> {
  await page.waitForFunction(() => {
    const m = (window as unknown as { mamekit: Mamekit }).mamekit;
    if (m.memory.hiscoreArmed()) return true;
    m.step(30);
    return false;
  }, undefined, { timeout: 60_000 });
}

/** The bytes of the first hiscore.dat row, read through the page's own bus accessor. */
async function firstRow(page: import('@playwright/test').Page): Promise<number[]> {
  return page.evaluate(() => {
    const m = (window as unknown as { mamekit: Mamekit }).mamekit;
    const row = m.config.hiscore!.rows[0]!;
    const access = m.board.memory(row)!;
    return Array.from({ length: row.length }, (_, index) => access.read(row.address + index));
  });
}

test.describe(`${game} memory kept in the browser`, () => {
  test('the ROM and a high score survive a reload; Forget ROM brings the drop screen back', async ({ page }) => {
    const contract = contractFor(game);
    const faults = await bootGame(page, contract, { qa: true });
    await expect(page.locator('[data-toast]')).toContainText('kept in this browser');
    const deck = page.locator('[data-memory-deck]');
    await expect(deck.getByRole('button', { name: 'Forget ROM' })).toBeVisible();

    const rows = await page.evaluate(() => (window as unknown as { mamekit: Mamekit }).mamekit.memory.hiscoreRows);
    test.skip(rows === 0, `${game} has no hiscore.dat entry this board can reach`);

    // Once the game has initialised its table, write a score into it the way
    // the game would (through the CPU's own space), distinct from the defaults.
    await armHiscore(page);
    const before = await firstRow(page);
    await page.evaluate(() => {
      const m = (window as unknown as { mamekit: Mamekit }).mamekit;
      const row = m.config.hiscore!.rows[0]!;
      const access = m.board.memory(row)!;
      for (let index = 0; index < row.length; index++) access.write(row.address + index, (access.read(row.address + index) + index + 1) & 0xff);
      m.step(2); // the keeper notices on the next frame
      m.memory.flush(); // and the page-leave path writes it now
    });
    // What the machine holds, not what was sent: Williams' CMOS RAM is four
    // bits wide and reads the high nibble back as ones.
    const score = await firstRow(page);
    expect(score).not.toEqual(before);

    // A fresh page: no drop screen, and the score is back in the machine once
    // the game has initialised its table again.
    await page.reload();
    await bootGame(page, contract, { qa: true });
    await expect(page.locator('[data-dropzone]')).toHaveCount(0);
    await armHiscore(page);
    await expect(page.locator('[data-toast]')).toContainText('High scores restored');
    expect(await firstRow(page), 'the high score written before the reload').toEqual(score);

    // Forget ROM: the next visit asks for the set again.
    await deck.getByRole('button', { name: 'Forget ROM' }).click();
    await expect(page.locator('[data-toast]')).toContainText('ROM forgotten');
    await page.reload();
    await page.locator('[data-dropzone]').waitFor({ state: 'visible' });

    // Clear memory: the machine boots cold and the score is gone.
    await bootGame(page, contract, { qa: true });
    page.once('dialog', dialog => void dialog.accept());
    // Clearing reloads the page (the re-dropped set was kept again, so the new
    // document boots straight in); wait for it rather than the old machine.
    const reloaded = page.waitForEvent('load');
    await page.locator('[data-memory-deck]').getByRole('button', { name: 'Clear memory' }).click();
    await reloaded;
    await bootGame(page, contract, { qa: true });
    await armHiscore(page);
    expect(await firstRow(page), 'cleared memory boots the game\'s own table').toEqual(before);

    // Leave it as found for the next spec in this context.
    await page.locator('[data-memory-deck]').getByRole('button', { name: 'Forget ROM' }).click();
    expect(faults.errors, 'no page errors').toEqual([]);
  });
});
