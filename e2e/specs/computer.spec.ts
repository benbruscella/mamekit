// The software room, as a visitor meets it (issue #101).
//
// A computer's software arrives on several media, each a MAME software list
// of its own, so the room is one shelf per generated list rather than one
// cartridge catalogue. Like the console room, this is where the machine is
// checked end to end in the browser: the Node contract boots the board, but
// the shelves, the fetch and the mount are all app path.
//
// Three things are asserted:
//   1. the boot menu offers a COMPUTERS tab and the machine is on that shelf,
//      one box for all its regional versions, whose room offers each of them;
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

interface Shelf {
  list: string; kind: string; catalogUrl: string; availableUrl?: string; mountable: boolean; entries: number; slots?: string[];
  boot?: { delay: number; command: string; play?: boolean };
}
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

/** A title of the medium the local dump tree holds, with the firmware it needs. */
function localTitle(kind: string): { shelf: Shelf; set: string; firmware: string[] } | undefined {
  const shelf = shelves.find(candidate => candidate.kind === kind && candidate.mountable && candidate.boot);
  if (!shelf?.availableUrl) return undefined;
  const available: { carts: { name?: string }[] } =
    JSON.parse(readFileSync(join(machineDir, shelf.availableUrl), 'utf8'));
  const family = join(repoRoot, '.data/roms', config.software!.dumpsKey);
  const set = available.carts.map(cart => cart.name && join(family, shelf.list, `${cart.name}.zip`))
    .find((path): path is string => Boolean(path && existsSync(path)));
  const firmware = ['c64', ...(kind === 'floppy' ? ['c1541'] : [])]
    .map(name => join(family, 'bios', `${name}.zip`));
  return set && firmware.every(path => existsSync(path)) ? { shelf, set, firmware } : undefined;
}

interface ManifestEntry { game: string; kind?: string; cloneof?: string; preview?: boolean; supported?: boolean }

/** The machine's MAME parent and every regional version of it the build lists. */
function versionsOf(manifest: ManifestEntry[]): { family: string; versions: ManifestEntry[] } {
  const family = manifest.find(item => item.game === MACHINE)?.cloneof ?? MACHINE;
  return { family, versions: manifest.filter(item => item.kind === 'computer' && (item.cloneof ?? item.game) === family) };
}

/** A title one version's filtered catalogue holds and another's does not, from the generated lists. */
function regionOnlyTitle(versions: ManifestEntry[]): { list: string; name: string; description: string; version: string } | undefined {
  const catalog = (game: string, list: string): { entries: { name: string; description: string }[] } | undefined => {
    const path = join(repoRoot, 'dist/games/computers', game, 'software', `${list}.json`);
    return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : undefined;
  };
  for (const shelf of shelves) {
    const lists = versions.map(version => ({ version: version.game, catalog: catalog(version.game, shelf.list) }));
    for (const { version, catalog: own } of lists) {
      const others = lists.filter(other => other.version !== version)
        .map(other => new Set(other.catalog?.entries.map(item => item.name)));
      const title = own?.entries.find(item => others.every(names => !names.has(item.name)));
      if (title) return { list: shelf.list, name: title.name, description: title.description, version };
    }
  }
  return undefined;
}

/** The text on a C64-style screen at $0400, which is where BASIC talks. */
async function screenText(page: import('@playwright/test').Page): Promise<string> {
  return page.evaluate(() => {
    const board = (window as unknown as { mamekit: { board: { bindings: { calls: Record<string, () => Uint8Array> } } } }).mamekit.board;
    const ram = board.bindings.calls['m_ram.pointer']!();
    return Array.from(ram.slice(0x400, 0x400 + 1000), value => {
      const code = value & 0x7f;
      return String.fromCharCode(code < 32 ? code + 64 : code);
    }).join('');
  });
}

/** Insert a set through the room's own picker, play it (on `region`, when given), and give the machine its firmware. */
async function playLocalSet(page: import('@playwright/test').Page, set: string, firmware: string[], region?: string): Promise<void> {
  await page.goto(`/app/g/${MACHINE}/`);
  await page.locator('[data-software-room]').waitFor({ state: 'visible' });
  if (region) await page.locator(`[data-region-control] [data-region="${region}"]`).click();
  const chooser = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: /insert your own/i }).first().click();
  await (await chooser).setFiles(set);
  const shelved = page.locator('[data-owned-set]').first();
  await expect(shelved).toBeVisible({ timeout: 30_000 });
  await shelved.locator('[data-play]').click();
  await page.locator('[data-dropzone]').waitFor({ state: 'visible' });
  const firmwareChooser = page.waitForEvent('filechooser');
  await page.locator('[data-overlay]').click();
  await (await firmwareChooser).setFiles(firmware);
  await page.waitForFunction(() => Boolean((window as unknown as { mamekit?: unknown }).mamekit), undefined, { timeout: 60_000 });
}

test.describe('software room', () => {
  test.skip(!generated, `generate the computer first: node bin/mamekit.js ${MACHINE}`);

  test('is on the boot menu behind a COMPUTERS tab, one box for every regional version', async ({ page }) => {
    const faults = watchFaults(page);
    const { family, versions } = versionsOf(await (await page.request.get('/games.json')).json());
    await page.goto('/app/');
    const computers = page.locator('[data-tab="computers"]');
    await expect(computers).toBeVisible();
    await computers.click();
    await expect(page.locator(`[data-cart-badge="${family}"]`)).toBeVisible();
    for (const version of versions.filter(item => item.game !== family)) {
      await expect(page.locator(`[data-cart-badge="${version.game}"]`)).toHaveCount(0);
    }
    expect(faults.errors).toEqual([]);
  });

  // One Commodore 64 (issue #161): the region is chosen in the room. Auto
  // plays each title on the version its software list lets it through to,
  // and a title only one version lists says which.
  test('one room offers every regional version and marks what only one plays', async ({ page }) => {
    const faults = watchFaults(page);
    const { family, versions } = versionsOf(await (await page.request.get('/games.json')).json());
    test.skip(versions.length < 2, 'the machine has no other regional version');
    await page.goto(`/app/g/${family}/`);
    await page.locator('[data-software-room]').waitFor({ state: 'visible' });
    const control = page.locator('[data-region-control]');
    await expect(control.locator('[data-region="auto"]')).toHaveAttribute('aria-pressed', 'true');
    for (const version of versions) await expect(control.locator(`[data-region="${version.game}"]`)).toBeVisible();

    const only = regionOnlyTitle(versions);
    expect(only, 'no title is limited to one version').toBeTruthy();
    await page.locator(`[data-media-tab="${only!.list}"]`).click();
    await page.getByRole('combobox').first().selectOption('all');
    await page.getByPlaceholder(/search titles/i).fill(only!.description.replace(/\s*\(.*\)$/, ''));
    await expect(page.locator(`[data-catalog-set="${only!.name}"] [data-region-only="${only!.version}"]`)).toBeVisible();

    // The choice is remembered for the machine.
    await control.locator(`[data-region="${MACHINE}"]`).click();
    await page.reload();
    await expect(page.locator(`[data-region-control] [data-region="${MACHINE}"]`)).toHaveAttribute('aria-pressed', 'true');
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
    // A machine the build exposes before acceptance wears a BETA badge.
    const manifest: { game: string; preview?: boolean; supported?: boolean }[] =
      await (await page.request.get('/games.json')).json();
    const entry = manifest.find(item => item.game === MACHINE);
    if (entry?.preview || entry?.supported === false) {
      await expect(page.locator('[data-beta]').first()).toBeVisible();
    }
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

  // The room says which firmware this browser keeps before anything boots,
  // and what a missing set costs: the drive ROM only stops the disks.
  test('says which firmware is missing and keeps what is added', async ({ page }) => {
    const family = join(repoRoot, '.data/roms', config.software?.dumpsKey ?? 'computers/c64', 'bios');
    const main = join(family, 'c64.zip');
    test.skip(!existsSync(main), 'no local c64.zip under .data/roms');
    const faults = watchFaults(page);
    await page.goto(`/app/g/${MACHINE}/`);
    const bar = page.locator('[data-firmware-status]');
    await expect(bar).toBeVisible();
    await expect(bar.locator('[data-firmware="c64"]')).toHaveAttribute('data-kept', 'false');
    await expect(bar.locator('[data-firmware="c1541"]')).toContainText(/disks need it/);
    const chooser = page.waitForEvent('filechooser');
    await bar.locator('[data-firmware-add]').click();
    await (await chooser).setFiles(main);
    await expect(bar.locator('[data-firmware="c64"]')).toHaveAttribute('data-kept', 'true');
    await expect(bar.locator('[data-firmware="c1541"]')).toHaveAttribute('data-kept', 'false');
    expect(faults.errors).toEqual([]);
  });

  // One-click play (issue #161): Play on a title starts it. The machine types
  // its shelf's command through MAME's natural keyboard once it is up, a tape
  // has PLAY pressed when that is typed, and the load runs warped.
  test('a tape title starts itself and warps through its load', async ({ page }) => {
    const local = localTitle('cassette');
    test.skip(!local, 'no local tape set and firmware under .data/roms');
    const faults = watchFaults(page);
    await playLocalSet(page, local!.set, local!.firmware);
    await page.waitForFunction(() => {
      const tape = (window as unknown as { mamekit: { board: { media(): { playing(): boolean; motorOn(): boolean }[] } } })
        .mamekit.board.media()[0]!;
      return tape.playing() && tape.motorOn();
    }, undefined, { timeout: 60_000 });
    const screen = await screenText(page);
    expect(screen).toContain('LOAD');
    expect(screen).toMatch(/PRESS PLAY ON TAPE|SEARCHING|FOUND|LOADING/);
    // The readout says the machine chose to fast-forward, and why.
    await expect(page.getByText(/· loading/).first()).toBeVisible({ timeout: 10_000 });
    // An untagged tape on Auto plays on the accepted version whose shelves
    // hold the most titles (machine-versions.ts).
    const { versions } = versionsOf(await (await page.request.get('/games.json')).json());
    const titlesOf = (game: string): number => {
      const path = join(repoRoot, 'dist/games/computers', game, 'config.json');
      const shelvesOf: Shelf[] = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')).software?.shelves ?? [] : [];
      return shelvesOf.reduce((sum, shelf) => sum + shelf.entries, 0);
    };
    const ready = versions.filter(version => version.supported !== false && !version.preview);
    const accepted = (ready.length ? ready : versions)
      .reduce((best, version) => titlesOf(version.game) > titlesOf(best.game) ? version : best).game;
    expect(await page.evaluate(() => (window as unknown as { mamekit: { config: { game: string } } }).mamekit.config.game)).toBe(accepted);
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });

  test('a region picked in the room boots that version', async ({ page }) => {
    const local = localTitle('cassette');
    test.skip(!local, 'no local tape set and firmware under .data/roms');
    const { versions } = versionsOf(await (await page.request.get('/games.json')).json());
    const other = versions.find(version => version.game !== MACHINE);
    test.skip(!other, 'the machine has no other regional version');
    const faults = watchFaults(page);
    await playLocalSet(page, local!.set, local!.firmware, other!.game);
    await page.waitForFunction(() => {
      const tape = (window as unknown as { mamekit: { board: { media(): { playing(): boolean; motorOn(): boolean }[] } } })
        .mamekit.board.media()[0]!;
      return tape.playing() && tape.motorOn();
    }, undefined, { timeout: 60_000 });
    expect(await page.evaluate(() => (window as unknown as { mamekit: { config: { game: string } } }).mamekit.config.game)).toBe(other!.game);
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });

  test('a disk title starts itself with LOAD"*",8,1', async ({ page }) => {
    const local = localTitle('floppy');
    test.skip(!local, 'no local disk set and drive firmware under .data/roms');
    const faults = watchFaults(page);
    await playLocalSet(page, local!.set, local!.firmware);
    await page.waitForFunction(() =>
      (window as unknown as { mamekit: { board: { disks(): { spinning(): boolean }[] } } }).mamekit.board.disks()[0]!.spinning(),
    undefined, { timeout: 60_000 });
    const screen = await screenText(page);
    expect(screen).toContain('LOAD"*",8,1');
    expect(screen).toContain('SEARCHING FOR *');
    await expect(page.getByText(/· loading/).first()).toBeVisible({ timeout: 10_000 });
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });

  // A title whose MAME usage note names its own command starts with it:
  // Jingle Disk's first file is a utility, so LOAD"*",8,1 would start nothing.
  test('a title with its own start command in MAME\'s note types that', async ({ page }) => {
    const set = join(repoRoot, '.data/roms', config.software?.dumpsKey ?? 'computers/c64', 'c64_flop_misc', 'jingldsk.zip');
    const local = localTitle('floppy');
    test.skip(!existsSync(set) || !local, 'no local Jingle Disk set and drive firmware');
    const faults = watchFaults(page);
    await playLocalSet(page, set, local!.firmware);
    await page.waitForFunction(() =>
      (window as unknown as { mamekit: { board: { disks(): { spinning(): boolean }[] } } }).mamekit.board.disks()[0]!.spinning(),
    undefined, { timeout: 60_000 });
    expect(await screenText(page)).toContain('LOAD"JINGLE",8,1');
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
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
    // One panel under the screen (issue #157): the tape transport is a strip
    // of the machine's own control panel and Reset / Fast-forward are a group
    // in its toolbar, not panels of their own. The screen yields room to the
    // panel, so nothing is pushed below the fold and the page needs no
    // scrolling.
    await expect(page.locator('[data-deck] [data-media-bay="tape"]')).toBeVisible();
    // A tape title boots with every other medium's slot empty, as MAME's
    // `-iec8 ""` does; the disk drive's strip says so and offers to connect.
    for (const slot of shelves.filter(shelf => shelf.kind !== mountable!.kind).flatMap(shelf => shelf.slots ?? [])) {
      await expect(page.locator(`[data-deck] [data-detached="${slot}"]`)).toBeVisible();
    }
    await expect(page.locator('[data-deck] [data-toolbar] [data-computer-controls]')).toBeVisible();
    const layout = await page.evaluate(() => {
      const panel = document.querySelector('[data-deck]')!.getBoundingClientRect();
      return { bottom: Math.round(panel.bottom), viewport: innerHeight, scrollHeight: document.documentElement.scrollHeight };
    });
    expect(layout.bottom).toBeLessThanOrEqual(layout.viewport);
    expect(layout.scrollHeight).toBeLessThanOrEqual(layout.viewport + 1);
    // The firmware search tries the clone's own set name before the family's,
    // and a computer has no bezel: both are 404s the browser logs as errors.
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });
});
