// Every supported arcade machine, played through the app a visitor uses.
//
// The set comes from src/games, so a machine parked in src/games/disabled/
// leaves browser QA at the same moment it leaves generation. Narrow a run with
// MAMEKIT_E2E_GAMES=pacman,galaga while bringing a machine up.

import { expect, test } from '@playwright/test';
import { readyFrame, selectedContracts } from '../support/contracts.ts';
import { knownIssue } from '../support/known-issues.ts';
import { audioPeak, bootGame, keysFor, replayContract, screenPng, secondsToFrame, trackAudioPeak } from '../support/game.ts';

for (const contract of selectedContracts()) {
  test.describe(contract.game, () => {
    const known = knownIssue(contract.game);
    test.skip(Boolean(known), `known issue #54: ${known}`);

    test('plays its accepted contract on the app canvas', async ({ page }) => {
      const faults = await bootGame(page, contract, { qa: true });

      const result = await replayContract(page, {
        actions: contract.actions,
        checkpoints: contract.checkpoints,
        frames: contract.frames,
      });

      // The app's own ROM picker assembled the regions the contract accepted:
      // right set, right CRCs, right driver-init patches and transforms.
      expect(result.regions).toEqual(contract.golden.regions);

      // Every checkpoint is bit-identical to the accepted baseline. The
      // schedule inserts a coin, presses start and works player 1's controls,
      // so matching it end to end means the app delivered all of that to the
      // board and got the accepted machine back.
      expect(result.checkpoints).toEqual(contract.golden.checkpoints);

      // Hashes come from the framebuffer; this is the canvas that was actually
      // presented, so a shell that stopped blitting still fails here.
      expect(await screenPng(page)).toMatchSnapshot(`${contract.game}-final.png`);
      expect(faults.errors).toEqual([]);
    });

    test('boots, takes a coin and is audible at full speed', async ({ page }) => {
      const faults = await bootGame(page, contract);

      // Real wall-clock play through real key events — the timestep, the
      // AudioWorklet and the browser's own scheduling all participate.
      const coin = (await keysFor(page, 'IPT_COIN1'))[0];
      const start = (await keysFor(page, 'IPT_START1'))[0];
      const fire = (await keysFor(page, 'IPT_BUTTON1'))[0];
      expect(coin, 'no generated IPT_COIN1 binding').toBeTruthy();
      expect(start, 'no generated IPT_START1 binding').toBeTruthy();

      // Wait exactly as long as this machine's token does before coining it.
      // A fixed wait coins Ghouls'n Ghosts 29 seconds into its boot, where the
      // coin is ignored and the silent attract screen looks like broken audio.
      // Listen from boot, so attract music counts as evidence too.
      await trackAudioPeak(page);
      await page.waitForTimeout(await secondsToFrame(page, readyFrame(contract)) * 1000);
      await page.keyboard.press(coin!, { delay: 120 });
      await page.waitForTimeout(500);
      await page.keyboard.press(start!, { delay: 120 });
      await page.waitForTimeout(2_000);

      for (let shot = 0; shot < 8 && fire; shot++) {
        await page.keyboard.press(fire, { delay: 80 });
        await page.waitForTimeout(400);
      }
      await page.waitForTimeout(1_500);
      const peak = await audioPeak(page);
      test.info().annotations.push({ type: 'audio', description: `peak rms ${peak.toFixed(4)}` });
      if (contract.soundKind !== 'none') {
        // Silence is the failure the Node audio probe cannot see: it renders
        // the DSP offline and never touches this graph. Attract mode measures
        // exactly 0 here, so any real signal clears this by orders of magnitude.
        expect(peak, 'no sound reached the speakers').toBeGreaterThan(1e-4);
      }

      // The status line reports emulated frames per wall-clock second.
      const status = await page.locator('body').innerText();
      const fps = Number(/(\d+) fps/.exec(status)?.[1] ?? 0);
      test.info().annotations.push({ type: 'speed', description: `${fps} fps` });
      expect(fps).toBeGreaterThanOrEqual(contract.minimumFps);
      expect(faults.errors).toEqual([]);
    });
  });
}
