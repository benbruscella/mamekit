// A spinner through the real app.
//
// A spinner or trackball is a USB mouse to the browser, so this drives the
// shell with real mouse movement over the screen and reads the dial back
// through the generated bindings. Playwright's mouse carries movementX like
// a physical one; pointer lock is not needed for movement over the canvas.
// Arkanoid is the default because its paddle is the classic spinner dial.

import { expect, test } from '@playwright/test';
import { contractFor } from '../support/contracts.ts';
import { bootGame } from '../support/game.ts';

const game = process.env.MAMEKIT_E2E_GAMES?.split(',')[0]?.trim() || 'arkanoid';

interface Binding { port: string; mask: number; type?: string; player?: number; sensitivity?: number; relativeDelta?: number }

test.describe(`${game} pointer`, () => {
  test('mouse travel over the screen turns the dial by MAME\'s sensitivity', async ({ page }) => {
    const faults = await bootGame(page, contractFor(game), { qa: true });
    const dial = await page.evaluate(() => {
      const mamekit = (window as unknown as {
        mamekit: { config: { bindings: Binding[] }; input: { read(tag: string): number } };
      }).mamekit;
      const b = mamekit.config.bindings.find(b => b.type?.endsWith('_RIGHT') && b.relativeDelta !== undefined && (b.player ?? 1) === 1);
      return b ? { ...b, value: mamekit.input.read(b.port) } : null;
    });
    test.skip(!dial, `${game} has no relative control for a pointer to drive`);
    const sensitivity = dial!.sensitivity ?? 100;
    const sign = Math.sign(dial!.relativeDelta!) || 1;
    const read = () => page.evaluate((port: string) =>
      (window as unknown as { mamekit: { input: { read(tag: string): number } } }).mamekit.input.read(port), dial!.port);
    const step = () => page.evaluate(() => (window as unknown as { mamekit: { step(n: number): void } }).mamekit.step(1));

    const screen = page.locator('canvas[data-screen]');
    const box = (await screen.boundingBox())!;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await step();
    const rest = await read();

    // Enough pixels for a whole number of units at any sensitivity in the tree.
    const pixels = Math.ceil(100 / sensitivity) * 10;
    await page.mouse.move(cx + pixels, cy, { steps: 5 });
    await step();
    const expected = (rest + sign * Math.trunc(pixels * sensitivity / 100)) & dial!.mask;
    expect((await read()) & dial!.mask, `${pixels}px right at sensitivity ${sensitivity}`).toBe(expected);

    // Back the other way, one frame later, returns to where it started.
    await page.mouse.move(cx, cy, { steps: 5 });
    await step();
    expect((await read()) & dial!.mask, 'the same travel left undoes it').toBe(rest & dial!.mask);

    // A spinner's cursor wanders off the screen at once, so movement
    // anywhere on the focused page is a spin, as it is in MAME.
    await page.mouse.move(2, 2);
    await step();
    const offscreen = await read();
    await page.mouse.move(2 + pixels, 2, { steps: 5 });
    await step();
    // The jump to the corner leaves a fraction of a unit pending, so the
    // next step may land one unit either side of the nominal distance.
    const moved = (((await read()) - offscreen) * sign) & dial!.mask;
    const nominal = Math.trunc(pixels * sensitivity / 100);
    expect(moved, 'off-screen movement turns the dial too').toBeGreaterThanOrEqual(nominal - 1);
    expect(moved).toBeLessThanOrEqual(nominal + 1);

    await expect(page.locator('body')).toContainText('spinner');
    expect(faults.errors).toEqual([]);
  });
});
