// A gamepad through the real app.
//
// Playwright cannot plug a controller in, so `navigator.getGamepads` is
// replaced with a synthetic pad the test sets each step. Everything after
// that is the shell's own path: the run loop's per-frame poll, the generated
// bindings, the port bytes the board reads and the controls legend. One
// machine is enough — the mapping is hardware-neutral and the unit spec
// covers its table; this proves the page delivers it.

import { expect, test } from '@playwright/test';
import { contractFor } from '../support/contracts.ts';
import { bootGame } from '../support/game.ts';

const game = process.env.MAMEKIT_E2E_GAMES?.split(',')[0]?.trim() || 'pacman';

interface Binding { port: string; mask: number; type?: string; player?: number; activeLow?: boolean }
interface Probe { mask: number; activeLow: boolean; value: number }

/** The live port byte behind player one's binding of one MAME input type. */
async function probe(page: import('@playwright/test').Page, type: string): Promise<Probe | null> {
  return page.evaluate((wanted: string) => {
    const mamekit = (window as unknown as {
      mamekit: { config: { bindings: Binding[] }; input: { read(tag: string): number } };
    }).mamekit;
    const binding = mamekit.config.bindings.find(b => b.type === wanted && (b.player ?? 1) === 1);
    if (!binding) return null;
    return { mask: binding.mask, activeLow: binding.activeLow !== false, value: mamekit.input.read(binding.port) };
  }, type);
}

function pressedBits(p: Probe): number { return p.activeLow ? 0 : p.mask; }
function releasedBits(p: Probe): number { return p.activeLow ? p.mask : 0; }

test.describe(`${game} gamepad`, () => {
  test('a standard pad coins, moves and is announced through the shell', async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __pads: unknown[] };
      w.__pads = [];
      Object.defineProperty(navigator, 'getGamepads', { value: () => w.__pads, configurable: true });
    });
    const faults = await bootGame(page, contractFor(game), { qa: true });

    const setPad = (buttons: number[], axes: number[] = [0, 0, 0, 0]) => page.evaluate(
      ({ buttons, axes }) => {
        const w = window as unknown as { __pads: unknown[] };
        w.__pads = [{
          index: 0, id: 'Synthetic Pad (Vendor: 0000 Product: 0000)', mapping: 'standard', connected: true, timestamp: 0,
          buttons: Array.from({ length: 17 }, (_, i) => ({
            pressed: buttons.includes(i), touched: buttons.includes(i), value: buttons.includes(i) ? 1 : 0,
          })),
          axes,
        }];
      }, { buttons, axes });
    const unplug = () => page.evaluate(() => { (window as unknown as { __pads: unknown[] }).__pads = []; });
    const step = () => page.evaluate(() => (window as unknown as { mamekit: { step(n: number): void } }).mamekit.step(1));
    const legend = page.locator('body');

    await expect(legend).not.toContainText('🎮');
    const badge = page.locator('[data-pads]');
    await expect(badge).toBeHidden();
    await setPad([]);
    await step();
    await expect(legend, 'the legend announces the pad').toContainText('🎮 Synthetic Pad connected');
    await expect(badge, 'the badge beside the title names the pad').toBeVisible();
    await expect(badge).toContainText('Synthetic Pad connected');
    await expect(page.locator('[data-toast]'), 'a toast flashes over the screen').toHaveText('🎮 Synthetic Pad connected as player 1');

    // Start is the coin slot on every cabinet, so it is the one control
    // every arcade contract has.
    const coinRest = await probe(page, 'IPT_COIN1');
    expect(coinRest, 'no generated IPT_COIN1 binding').toBeTruthy();
    expect(coinRest!.value & coinRest!.mask).toBe(releasedBits(coinRest!));
    await setPad([9]);
    await step();
    const coinDown = await probe(page, 'IPT_COIN1');
    expect(coinDown!.value & coinDown!.mask, 'Start coins the machine').toBe(pressedBits(coinDown!));
    await setPad([]);
    await step();
    expect((await probe(page, 'IPT_COIN1'))!.value & coinRest!.mask).toBe(releasedBits(coinRest!));

    // The stick, past the deadzone, is a held direction; centred, it releases.
    const left = await probe(page, 'IPT_JOYSTICK_LEFT');
    if (left) {
      await setPad([], [-0.9, 0, 0, 0]);
      await step();
      expect((await probe(page, 'IPT_JOYSTICK_LEFT'))!.value & left.mask, 'stick left').toBe(pressedBits(left));
      await setPad([14]);
      await step();
      expect((await probe(page, 'IPT_JOYSTICK_LEFT'))!.value & left.mask, 'd-pad left').toBe(pressedBits(left));
      await setPad([]);
      await step();
      expect((await probe(page, 'IPT_JOYSTICK_LEFT'))!.value & left.mask).toBe(releasedBits(left));
      await expect(legend).toContainText('🎮 D-pad');
    }

    // Unplugging mid-press releases the field and withdraws the announcement.
    await setPad([9]);
    await step();
    await unplug();
    await step();
    expect((await probe(page, 'IPT_COIN1'))!.value & coinRest!.mask, 'unplug releases').toBe(releasedBits(coinRest!));
    // The toast keeps its last words while it fades, so the withdrawal is
    // read from the legend line and the badge, not the whole page.
    await expect(page.locator('[data-help]')).not.toContainText('🎮');
    await expect(badge, 'the badge goes with the pad').toBeHidden();
    await expect(page.locator('[data-toast]')).toHaveText('🎮 Synthetic Pad disconnected');
    expect(faults.errors).toEqual([]);
  });
});
