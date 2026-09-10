// Two players, through the real app.
//
// The unit specs prove the parts: a machine sees input only at a frame
// boundary, a session refuses to run a frame until every player has spoken,
// and two input models fed the same log agree. This proves the whole thing in
// a browser — two pages, a real WebRTC data channel between them, one of them
// hosting and one joining from the invite link — and that the two machines
// are still identical, pixel for pixel, after both players have played.
//
// Both pages run under ?qa=1 so frames are counted rather than raced. In a
// room a page can only run as far as its peer has published, so the two are
// stepped in turns, which is exactly what the run loop does with a wall clock.

import { expect, test, type Page } from '@playwright/test';
import { contractFor } from '../support/contracts.ts';
import { bootGame } from '../support/game.ts';

const game = process.env.MAMEKIT_E2E_GAMES?.split(',')[0]?.trim() || 'invaders';

/** Step frames and report where the machine got to and what it looks like. */
async function stepAndHash(page: Page, frames: number): Promise<string> {
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

const roomStatus = (page: Page) => page.evaluate(() =>
  (window as unknown as { mamekit: { netplay: { status(): string | undefined; live: boolean } } })
    .mamekit.netplay.status() ?? '');

test.describe(`${game} two player`, () => {
  test('a second browser joins from the invite link and both machines stay identical', async ({ browser }) => {
    test.slow(); // two machines, and a data channel that has to find itself
    const contract = contractFor(game);
    const context = await browser.newContext();
    const host = await context.newPage();
    const guest = await context.newPage();

    const hostFaults = await bootGame(host, contract, { qa: true });
    const hostDeck = host.locator('[data-netplay]');
    await expect(hostDeck).toBeVisible();
    await hostDeck.getByRole('button', { name: /two player game/i }).click();

    const panel = host.locator('[data-netplay-panel]');
    await panel.getByRole('button', { name: /invite a player/i }).click();
    const inviteField = panel.getByLabel('invite link', { exact: true });
    await expect(inviteField).toHaveValue(/#join=/, { timeout: 60_000 });
    const invite = await inviteField.inputValue();
    const joinCode = invite.split('#')[1]!;

    // The second player opens the invite, brings their own ROM, and the page
    // answers with a code to send back.
    const guestFaults = await bootGame(guest, contract, { qa: true, hash: `#${joinCode}` });
    const guestPanel = guest.locator('[data-netplay-panel]');
    const replyField = guestPanel.getByLabel('reply code', { exact: true });
    await expect(replyField).toHaveValue(/.{20,}/, { timeout: 60_000 });
    const reply = await replyField.inputValue();

    // The host pastes it in and the room starts.
    await panel.getByPlaceholder('paste their code').fill(reply);
    await panel.getByRole('button', { name: /^connect$/i }).click();

    await expect.poll(() => roomStatus(host), { timeout: 60_000 }).toMatch(/you are player 1/);
    await expect.poll(() => roomStatus(guest), { timeout: 60_000 }).toMatch(/you are player 2/);
    // Both machines restarted when the room began, so both are back at zero.
    expect(await stepAndHash(host, 0)).toMatch(/^0:/);
    expect(await stepAndHash(guest, 0)).toMatch(/^0:/);

    // Play. Neither page can outrun the other by more than the input delay,
    // so they take turns until both stand on the same frame; a room with a
    // wall clock does the same thing without being asked. Comparing them on
    // the same frame is what makes the picture comparison mean anything.
    const frameOf = (result: string): number => Number(result.split(':')[0]);
    const runTo = async (target: number): Promise<{ host: string; guest: string }> => {
      let onHost = await stepAndHash(host, 0);
      let onGuest = await stepAndHash(guest, 0);
      for (let guard = 0; guard < 400; guard++) {
        if (frameOf(onHost) >= target && frameOf(onGuest) >= target) break;
        if (frameOf(onHost) < target) {
          onHost = await stepAndHash(host, Math.min(4, target - frameOf(onHost)));
        }
        if (frameOf(onGuest) < target) {
          onGuest = await stepAndHash(guest, Math.min(4, target - frameOf(onGuest)));
        }
      }
      expect(
        `host ${onHost} guest ${onGuest}`,
        `the room reached frame ${target}`,
      ).toBe(`host ${target}:${onHost.split(':')[1]} guest ${target}:${onGuest.split(':')[1]}`);
      return { host: onHost, guest: onGuest };
    };
    const settled = await runTo(240);
    expect(settled.guest, 'both machines show the same picture on the same frame').toBe(settled.host);

    // The joiner's own controls drive player two on both machines.
    const coin = await guest.evaluate(() => {
      const mamekit = (window as unknown as {
        mamekit: { config: { bindings: { keys: string[]; type?: string; player?: number }[] } };
      }).mamekit;
      return mamekit.config.bindings.find(binding => binding.type === 'IPT_COIN1')?.keys[0];
    });
    test.skip(!coin, `${game} has no coin slot to press`);
    await guest.keyboard.down(coin!);
    await runTo(300);
    await guest.keyboard.up(coin!);
    const played = await runTo(420);

    expect(played.guest, 'and they still agree after the joiner played').toBe(played.host);
    expect(played.host, 'the game moved on').not.toBe(settled.host);
    // A room that had drifted would have said so in the status line.
    expect(await roomStatus(host)).not.toMatch(/stopped matching/);
    expect(await roomStatus(guest)).not.toMatch(/stopped matching/);

    expect(hostFaults.errors, 'no page errors on the host').toEqual([]);
    expect(guestFaults.errors, 'no page errors on the joiner').toEqual([]);
    await context.close();
  });
});
