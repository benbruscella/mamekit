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
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { repoRoot } from '../support/contracts.ts';
import { watchFaults } from '../support/game.ts';

const MACHINE = process.env.MAMEKIT_E2E_COMPUTER ?? 'c64p';
const machineDir = join(repoRoot, 'dist/games/computers', MACHINE);

interface Shelf {
  list: string; kind: string; catalogUrl: string; availableUrl?: string; mountable: boolean; entries: number; slots?: string[];
  extensions: string[]; imageDevice?: string;
  boot?: { delay: number; command: string; play?: boolean };
}
interface MachineConfig { software?: { dumpsKey: string; shelves: Shelf[] }; dipDefaults?: { config?: boolean }[] }

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

  // A cartridge is in the expansion port before the machine starts, read by
  // area into the card its list names, and starts itself: the program is
  // running out of the cartridge's ROML window, not waiting at READY.
  test('a cartridge title boots straight into the cartridge', async ({ page }) => {
    const shelf = shelves.find(candidate => candidate.kind === 'cartridge' && candidate.mountable && candidate.imageDevice);
    const family = join(repoRoot, '.data/roms', config.software?.dumpsKey ?? 'computers/c64');
    const set = join(family, 'c64_cart', 'kungfum.zip');
    const firmware = [join(family, 'bios', 'c64.zip')];
    test.skip(!shelf || !existsSync(set) || !existsSync(firmware[0]!), 'no mountable cartridge shelf, or no local Kung-Fu Master set and firmware');
    const faults = watchFaults(page);
    await playLocalSet(page, set, firmware);
    await page.waitForFunction(() => {
      const pc = (window as unknown as { mamekit: { board: { snapshot(): { cpus: { pc: number }[] } } } }).mamekit.board.snapshot().cpus[0]!.pc;
      return pc >= 0x8000 && pc < 0xa000;
    }, undefined, { timeout: 60_000 });
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });

  // A bare .crt, as cartridges are mostly found: the port's own chooser reads
  // its header for the card, and the cartridge starts the machine.
  test('a bare .crt boots straight into the cartridge', async ({ page }) => {
    const family = join(repoRoot, '.data/roms', config.software?.dumpsKey ?? 'computers/c64');
    const set = join(family, 'c64_cart', 'pacman.zip');
    const firmware = [join(family, 'bios', 'c64.zip')];
    test.skip(!existsSync(set) || !existsSync(firmware[0]!), 'no local Pac-Man set and firmware');
    // Through a file URL, as e2e/support reaches the repository's own modules.
    const { readZip } = await import(pathToFileURL(join(repoRoot, 'src/runtime/zip.ts')).href) as
      { readZip(bytes: Uint8Array): Promise<Map<string, Uint8Array>> };
    const [rom] = [...(await readZip(new Uint8Array(readFileSync(set)))).values()];
    // MAME's CRT layout (lib/formats/cbm_crt.cpp): a 64-byte header, then one CHIP packet.
    const header = new Uint8Array(0x40);
    header.set(new TextEncoder().encode('C64 CARTRIDGE   '));
    new DataView(header.buffer).setUint32(0x10, 0x40);
    new DataView(header.buffer).setUint16(0x14, 0x0100);
    header[0x18] = 0; // EXROM active
    header[0x19] = 1;
    const chip = new Uint8Array(0x10);
    chip.set(new TextEncoder().encode('CHIP'));
    new DataView(chip.buffer).setUint32(4, 0x10 + rom!.length);
    new DataView(chip.buffer).setUint16(0x0c, 0x8000);
    new DataView(chip.buffer).setUint16(0x0e, rom!.length);
    const file = join(mkdtempSync(join(tmpdir(), 'mamekit-crt-')), 'pacman.crt');
    writeFileSync(file, Buffer.concat([header, chip, rom!]));
    const faults = watchFaults(page);
    await playLocalSet(page, file, firmware);
    await page.waitForFunction(() => {
      const pc = (window as unknown as { mamekit: { board: { snapshot(): { cpus: { pc: number }[] } } } }).mamekit.board.snapshot().cpus[0]!.pc;
      return pc >= 0x8000 && pc < 0xa000;
    }, undefined, { timeout: 60_000 });
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });

  // MAME's own configuration switch, as a toggle: the C64's "Swap joystick
  // ports", for the titles that read port 1.
  test('the machine settings throw MAME\'s own joystick swap', async ({ page }) => {
    const local = localTitle('cassette');
    test.skip(!local, 'no local tape set and firmware under .data/roms');
    test.skip(!config.dipDefaults?.some(dip => dip.config), 'the machine declares no configuration switch');
    await playLocalSet(page, local!.set, local!.firmware);
    const swap = page.locator('[data-machine-setting="JOYSWAP"]');
    await expect(swap).toBeVisible({ timeout: 30_000 });
    await expect(swap).toHaveAttribute('aria-pressed', 'false');
    await swap.click();
    await expect(swap).toHaveAttribute('aria-pressed', 'true');
    const value = await page.evaluate(() => {
      const input = (window as unknown as { mamekit: { input: { latch(): void; read(port: string): number } } }).mamekit.input;
      input.latch();
      return input.read('JOYSWAP');
    });
    expect(value & 1).toBe(1);
  });

  // The computer's own keyboard on screen: a key pressed there is a key the
  // machine reads, as BASIC's echo shows.
  test('the on-screen keyboard types on the computer', async ({ page }) => {
    const local = localTitle('quickload') ?? localTitle('cassette');
    test.skip(!local, 'no local firmware');
    const program = [0x01, 0x08, 0x0e, 0x08, 0x0a, 0x00, 0x99, 0x22, ...[...'QUICK'].map(c => c.charCodeAt(0)), 0x22, 0x00, 0x00, 0x00];
    const file = join(mkdtempSync(join(tmpdir(), 'mamekit-prg-')), 'quick.prg');
    writeFileSync(file, Uint8Array.from(program));
    await playLocalSet(page, file, local!.firmware.slice(0, 1));
    await expect.poll(() => screenText(page), { timeout: 60_000 }).toMatch(/QUICK\s+READY\./);
    await page.locator('[data-onscreen-keyboard]').first().click();
    const panel = page.locator('[data-onscreen-keyboard][role="group"]');
    await expect(panel).toBeVisible();
    for (const key of ['H', 'I']) await panel.locator(`[data-key="${key}"]`).click();
    await expect.poll(() => screenText(page), { timeout: 30_000 }).toMatch(/READY\.\s+HI/);
  });

  // Leaving a computer title keeps where it was; coming back to it carries on
  // from there instead of loading the tape again.
  test('a computer title comes back where it was left', async ({ page }) => {
    const local = localTitle('cassette');
    test.skip(!local, 'no local tape set and firmware under .data/roms');
    await playLocalSet(page, local!.set, local!.firmware);
    await page.waitForFunction(() =>
      (window as unknown as { mamekit: { board: { snapshot(): { frame: number } } } }).mamekit.board.snapshot().frame > 700,
    undefined, { timeout: 90_000 });
    const left = await page.evaluate(async () => {
      dispatchEvent(new Event('pagehide'));
      // The save lands in IndexedDB; wait until it is there.
      for (let tries = 0; tries < 50; tries++) {
        const found = await new Promise<boolean>(resolve => {
          const open = indexedDB.open('mamekit-saves');
          open.onsuccess = () => {
            const db = open.result;
            const request = db.transaction('saves', 'readonly').objectStore('saves').getAll();
            request.onsuccess = () => resolve((request.result as { id: string }[]).some(record => record.id.startsWith('resume:')));
            request.onerror = () => resolve(false);
          };
          open.onerror = () => resolve(false);
        });
        if (found) return true;
        await new Promise(next => setTimeout(next, 100));
      }
      return false;
    });
    expect(left).toBe(true);
    await page.goto(`/app/g/${MACHINE}/`);
    const kept = page.locator('[data-owned-set]').first();
    await expect(kept).toBeVisible({ timeout: 30_000 });
    await kept.locator('[data-play]').click();
    await expect(page.getByText(/Back where you left off/)).toBeVisible({ timeout: 60_000 });
    expect(await page.evaluate(() =>
      (window as unknown as { mamekit: { board: { snapshot(): { frame: number } } } }).mamekit.board.snapshot().frame)).toBeGreaterThan(700);
  });

  // A `.wav` tape, read by MAME's own wavfile.cpp into the cassette image: the
  // title starts itself and the KERNAL finds the program on it.
  test('a .wav tape title starts itself and finds its program', async ({ page }) => {
    const family = join(repoRoot, '.data/roms', config.software?.dumpsKey ?? 'computers/c64');
    const set = join(family, 'c64_cass', 'midway.zip');
    const firmware = [join(family, 'bios', 'c64.zip')];
    test.skip(!shelves.some(shelf => shelf.kind === 'cassette' && shelf.extensions.includes('wav')) ||
      !existsSync(set) || !existsSync(firmware[0]!), 'no .wav tape shelf, or no local Midway Campaign set and firmware');
    const faults = watchFaults(page);
    await playLocalSet(page, set, firmware);
    await expect.poll(() => screenText(page), { timeout: 120_000 }).toContain('FOUND MIDWAY CAMPAIGN');
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });

  // A quickload has no transport to work: the device holds the file for its
  // own delay, writes it into memory, and only then is RUN typed.
  test('a quickload title goes into memory and starts with RUN', async ({ page }) => {
    const local = localTitle('quickload');
    test.skip(!local, 'no local quickload set and firmware under .data/roms');
    const faults = watchFaults(page);
    await playLocalSet(page, local!.set, local!.firmware);
    await expect(page.locator('[data-quickload-readout]')).toHaveText(/IN MEMORY/, { timeout: 60_000 });
    await page.waitForFunction(() =>
      !(window as unknown as { mamekit: { board: { quickloads(): { pending(): boolean }[] } } }).mamekit.board.quickloads()[0]!.pending(),
    undefined, { timeout: 60_000 });
    await expect.poll(() => screenText(page), { timeout: 30_000 }).toContain('RUN');
    expect(faults.errors.filter(error => !/404/.test(error))).toEqual([]);
  });

  // Most .prg files are in no software list: a bare one dropped in the room
  // lands on the quickload shelf, and RUN starts it.
  test('a bare .prg quickloads and runs', async ({ page }) => {
    const local = localTitle('quickload') ?? localTitle('cassette');
    test.skip(!local || !shelves.some(shelf => shelf.kind === 'quickload' && shelf.extensions.includes('prg')),
      'no quickload shelf that reads .prg, or no local firmware');
    // 10 PRINT"QUICK", tokenised, loading at $0801.
    const program = [0x01, 0x08, 0x0e, 0x08, 0x0a, 0x00, 0x99, 0x22, ...[...'QUICK'].map(c => c.charCodeAt(0)), 0x22, 0x00, 0x00, 0x00];
    const file = join(mkdtempSync(join(tmpdir(), 'mamekit-prg-')), 'quick.prg');
    writeFileSync(file, Uint8Array.from(program));
    const faults = watchFaults(page);
    await playLocalSet(page, file, local!.firmware.slice(0, 1));
    await expect(page.locator('[data-quickload-name]')).toHaveText('quick.prg', { timeout: 60_000 });
    // RUN fills its own 40-column row; the program prints on the next.
    await expect.poll(() => screenText(page), { timeout: 60_000 }).toMatch(/RUN\s+QUICK/);
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
