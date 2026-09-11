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

/** Is the control of this MAME input type held down on this page's machine? */
const typeHeld = (page: Page, type: string) => page.evaluate((wanted: string) => {
  const mamekit = (window as unknown as {
    mamekit: {
      config: { bindings: { port: string; mask: number; type?: string; activeLow?: boolean }[] };
      input: { read(tag: string): number };
    };
  }).mamekit;
  const binding = mamekit.config.bindings.find(candidate => candidate.type === wanted);
  if (!binding) return null;
  const bits = mamekit.input.read(binding.port) & binding.mask;
  return binding.activeLow !== false ? bits === 0 : bits !== 0;
}, type);

/**
 * Does this board have a control of this type at all?
 *
 * Not every cabinet has one of everything. Space Invaders has a single coin
 * slot shared by both players, so there is no `IPT_COIN2` to press and the
 * checks that use one have to stand aside rather than read `null` and fail.
 */
const hasType = (page: Page, type: string) => page.evaluate((wanted: string) =>
  (window as unknown as { mamekit: { config: { bindings: { type?: string }[] } } })
    .mamekit.config.bindings.some(binding => binding.type === wanted), type);

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
    // Opening the lobby is the whole ask: the invite starts building at once,
    // and the dialog says which hop of the handshake it is on (issue #140).
    await hostDeck.getByRole('button', { name: /two player game/i }).click();

    const panel = host.locator('[data-netplay-panel]');
    await expect(panel).toBeVisible();
    const inviteField = panel.getByLabel('invite link', { exact: true });
    await expect(inviteField).toHaveValue(/#join=/, { timeout: 60_000 });
    const invite = await inviteField.inputValue();

    // The second player already had the game open and pastes the invite into
    // it. Only the fragment changes, so the page does not reload: the join has
    // to be noticed anyway, or the link looks like it does nothing.
    const guestFaults = await bootGame(guest, contract, { qa: true });
    await guest.evaluate((url: string) => { window.location.href = url; }, invite);
    const guestPanel = guest.locator('[data-netplay-panel]');
    await expect(guestPanel).toBeVisible({ timeout: 60_000 });
    await expect.poll(() => guest.evaluate(() => location.hash))
      .toBe('');  // the invite is spent, so a reload will not answer it again
    const replyField = guestPanel.getByLabel('reply code', { exact: true });
    await expect(replyField).toHaveValue(/.{20,}/, { timeout: 60_000 });
    const reply = await replyField.inputValue();

    // The reply arrives the way it really does: pasted onto the page, from
    // whatever the two of them were talking in. No clicking into the right
    // box first, and it works with the sentence somebody wrapped round it.
    await host.evaluate((code: string) => {
      const event = new Event('paste', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'clipboardData', { value: { getData: () => `here you go — ${code}` } });
      document.dispatchEvent(event);
    }, reply);

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
    // A one-slot cabinet gives the joiner nowhere to put their coin, so the
    // press to watch for is whichever slot this board actually has.
    const joinerCoin = (await hasType(host, 'IPT_COIN2')) ? 'IPT_COIN2' : 'IPT_COIN1';
    expect(await typeHeld(host, joinerCoin), 'nobody has coined up yet').toBe(false);

    // Coin up while the joiner's own gate is blocked, which is when a press
    // is easiest to lose: the run loop asks to run on every animation frame,
    // so one frame gets asked about many times over while it waits.
    await stepAndHash(guest, 40);  // runs only as far as the host has published
    await guest.keyboard.down(coin!);
    await stepAndHash(guest, 5);   // still waiting; the press has to survive it
    await runTo(300);
    expect(await typeHeld(host, joinerCoin),
      "the joiner's coin crossed the link and reached the host's machine").toBe(true);
    await guest.keyboard.up(coin!);
    const played = await runTo(420);
    expect(await typeHeld(host, joinerCoin), 'and letting go crossed it too').toBe(false);

    expect(played.guest, 'and they still agree after the joiner played').toBe(played.host);
    expect(played.host, 'the game moved on').not.toBe(settled.host);
    // A room that had drifted would have said so in the status line.
    expect(await roomStatus(host)).not.toMatch(/stopped matching/);
    expect(await roomStatus(guest)).not.toMatch(/stopped matching/);

    expect(hostFaults.errors, 'no page errors on the host').toEqual([]);
    expect(guestFaults.errors, 'no page errors on the joiner').toEqual([]);
    await context.close();
  });
  test('the lobby holds the machine while a game is being set up, and lets a live room run', async ({ browser }) => {
    test.slow();
    // Setting a two-player game up takes a minute of copying a link into a
    // conversation. The cabinet used to carry on without you (issue #140).
    const contract = contractFor(game);
    const context = await browser.newContext();
    const host = await context.newPage();
    const faults = await bootGame(host, contract);
    const frameOf = () => host.evaluate(() =>
      (window as unknown as { mamekit: { board: { snapshot(): { frame: number } } } })
        .mamekit.board.snapshot().frame);

    await expect.poll(async () => (await frameOf()) > 0, { timeout: 15_000 }).toBe(true);
    await host.locator('[data-netplay]').getByRole('button', { name: /two player game/i }).click();
    await expect(host.locator('[data-netplay-panel]')).toBeVisible();
    await host.waitForTimeout(700);   // let the frame in flight finish
    const held = await frameOf();
    await host.waitForTimeout(1500);
    expect(await frameOf(), 'the machine stands still while the lobby is open').toBe(held);
    await expect.poll(() => roomStatus(host)).toBe('');   // no room yet, so nothing to report

    // Esc closes the lobby rather than walking out of the game, and the
    // machine picks up from where it stood.
    await host.keyboard.press('Escape');
    await expect(host.locator('[data-netplay-panel]')).toBeHidden();
    await expect(host.locator('[data-screen]'), 'Esc closed the lobby, it did not leave the game').toBeVisible();
    await expect.poll(frameOf, { timeout: 15_000 }).toBeGreaterThan(held);
    expect(faults.errors).toEqual([]);
    await context.close();
  });

  test('two browsers play in real time at the board\'s own speed, with every cabinet button working', async ({ browser }) => {
    test.slow();
    // Two contexts: two people, two browsers, nothing shared between them.
    // No ?qa=1 either — this is the wall-clock run loop a visitor gets, which
    // is where a room has to survive the machine being busy at 60fps.
    const contract = contractFor(game);
    const one = await browser.newContext();
    const two = await browser.newContext();
    const host = await one.newPage();
    const guest = await two.newPage();
    const hostFaults = await bootGame(host, contract);
    await host.locator('[data-netplay]').getByRole('button', { name: /two player game/i }).click();
    const panel = host.locator('[data-netplay-panel]');
    const inviteField = panel.getByLabel('invite link', { exact: true });
    await expect(inviteField).toHaveValue(/#join=/, { timeout: 60_000 });
    const invite = await inviteField.inputValue();

    const guestFaults = await bootGame(guest, contract);
    await guest.evaluate((url: string) => { window.location.href = url; }, invite);
    const guestPanel = guest.locator('[data-netplay-panel]');
    const replyField = guestPanel.getByLabel('reply code', { exact: true });
    await expect(replyField).toHaveValue(/.{20,}/, { timeout: 60_000 });
    // The typed-in path, for a browser that will not hand over the clipboard:
    // the box and its Connect button are always there behind the one-click one.
    await panel.getByPlaceholder('paste their code').fill(await replyField.inputValue());
    await panel.getByRole('button', { name: /^connect$/i }).click();

    await expect.poll(() => roomStatus(host), { timeout: 60_000 }).toMatch(/you are player 1/);
    await expect.poll(() => roomStatus(guest), { timeout: 60_000 }).toMatch(/you are player 2/);

    // The machine has to actually be running, not stalled waiting forever.
    const frameOf = (page: Page) => page.evaluate(() =>
      (window as unknown as { mamekit: { board: { snapshot(): { frame: number } } } })
        .mamekit.board.snapshot().frame);
    const refresh = await host.evaluate(() =>
      (window as unknown as { mamekit: { config: { board: { screen: { refresh: number } } } } })
        .mamekit.config.board.screen.refresh);
    const before = await frameOf(host);
    await host.waitForTimeout(3000);
    const rate = ((await frameOf(host)) - before) / 3;
    // The board's own refresh, no faster: the frames an input delay keeps in
    // hand are not a backlog to burn through.
    expect(rate, `a room ran at ${rate.toFixed(1)} fps against a ${refresh.toFixed(1)} Hz board`)
      .toBeGreaterThan(refresh * 0.8);
    expect(rate, `a room ran at ${rate.toFixed(1)} fps against a ${refresh.toFixed(1)} Hz board`)
      .toBeLessThan(refresh * 1.1);

    const coin = await guest.evaluate(() => {
      const mamekit = (window as unknown as {
        mamekit: { config: { bindings: { keys: string[]; type?: string }[] } };
      }).mamekit;
      return mamekit.config.bindings.find(binding => binding.type === 'IPT_COIN1')?.keys[0];
    });
    test.skip(!coin, `${game} has no coin slot to press`);

    // Player one coins up. Both machines must see it, because both are
    // running the same machine.
    await host.keyboard.down(coin!);
    await expect.poll(() => typeHeld(host, 'IPT_COIN1'), { timeout: 15_000 }).toBe(true);
    await expect.poll(() => typeHeld(guest, 'IPT_COIN1'), { timeout: 15_000 })
      .toBe(true); // the host's coin crossed to the other browser
    await host.keyboard.up(coin!);
    await expect.poll(() => typeHeld(guest, 'IPT_COIN1'), { timeout: 15_000 }).toBe(false);

    // And the joiner's own coin, from the other browser's keyboard: their own
    // slot where the cabinet has two, the shared one where it has one.
    const joinerCoin = (await hasType(host, 'IPT_COIN2')) ? 'IPT_COIN2' : 'IPT_COIN1';
    await guest.keyboard.down(coin!);
    await expect.poll(() => typeHeld(host, joinerCoin), { timeout: 15_000 }).toBe(true);
    await guest.keyboard.up(coin!);
    await expect.poll(() => typeHeld(host, joinerCoin), { timeout: 15_000 }).toBe(false);

    // Start is a cabinet button too. The host's own two-player start works,
    // and so does the joiner's own start key, which is their own slot.
    const start2 = await host.evaluate(() => {
      const mamekit = (window as unknown as {
        mamekit: { config: { bindings: { keys: string[]; type?: string }[] } };
      }).mamekit;
      return mamekit.config.bindings.find(binding => binding.type === 'IPT_START2')?.keys[0];
    });
    const start1 = await guest.evaluate(() => {
      const mamekit = (window as unknown as {
        mamekit: { config: { bindings: { keys: string[]; type?: string }[] } };
      }).mamekit;
      return mamekit.config.bindings.find(binding => binding.type === 'IPT_START1')?.keys[0];
    });
    if (start2) {
      await host.keyboard.down(start2);
      await expect.poll(() => typeHeld(guest, 'IPT_START2'), { timeout: 15_000 })
        .toBe(true); // the host works the whole cabinet
      await host.keyboard.up(start2);
      await expect.poll(() => typeHeld(guest, 'IPT_START2'), { timeout: 15_000 }).toBe(false);
    }
    if (start1) {
      await guest.keyboard.down(start1);
      await expect.poll(() => typeHeld(host, 'IPT_START2'), { timeout: 15_000 })
        .toBe(true); // the joiner's own start key is player two's
      await guest.keyboard.up(start1);
      await expect.poll(() => typeHeld(host, 'IPT_START2'), { timeout: 15_000 }).toBe(false);
    }

    // Opening the lobby mid-game must NOT hold this machine: two machines in
    // a room run in lockstep, so a browser that stops publishing frames
    // leaves the other one standing still waiting for input.
    const hostFrame = () => host.evaluate(() =>
      (window as unknown as { mamekit: { board: { snapshot(): { frame: number } } } })
        .mamekit.board.snapshot().frame);
    await host.locator('[data-netplay]').getByRole('button', { name: /two player game/i }).click();
    await expect(host.locator('[data-netplay-panel]')).toBeVisible();
    const atOpen = await hostFrame();
    await host.waitForTimeout(1200);
    expect(await hostFrame(), 'a live room keeps running with the lobby open')
      .toBeGreaterThan(atOpen);
    await host.keyboard.press('Escape');
    await expect(host.locator('[data-netplay-panel]')).toBeHidden();

    // Play on, then check the two machines never told each other they had
    // drifted apart — they compare themselves every 60 frames.
    await host.waitForTimeout(3000);
    expect(await roomStatus(host)).not.toMatch(/stopped matching/);
    expect(await roomStatus(guest)).not.toMatch(/stopped matching/);
    expect(hostFaults.errors, 'no page errors on the host').toEqual([]);
    expect(guestFaults.errors, 'no page errors on the joiner').toEqual([]);
    await one.close();
    await two.close();
  });
});
