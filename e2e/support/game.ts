// Driving a generated machine through the real app.
//
// Everything here goes through what a visitor touches: the game's own page,
// its ROM picker, its canvas, its AudioWorklet and window keyboard events.
// Nothing imports a generated module directly — that is the Node acceptance
// harness's job, and duplicating it here would test the wrong path.

import type { Page } from '@playwright/test';
import type { GameAction, GameCheckpoint, GameContract } from './contracts.ts';
import { romFiles } from './contracts.ts';

/** Console/page errors collected for the lifetime of one game page. */
export interface PageFaults {
  errors: string[];
}

/** Collect console and uncaught errors for the lifetime of one game page. */
export function watchFaults(page: Page): PageFaults {
  const faults: PageFaults = { errors: [] };
  page.on('console', message => {
    if (message.type() === 'error') faults.errors.push(message.text());
  });
  page.on('pageerror', error => faults.errors.push(String(error)));
  return faults;
}

export interface ReplayPlan {
  actions: GameAction[];
  checkpoints: number[];
  frames: number;
}

export interface ReplayResult {
  checkpoints: Record<string, GameCheckpoint>;
  regions: Record<string, string>;
  /** emulated frames per second while the canvas was being driven flat out */
  fps: number;
}

/**
 * Load a machine the way the app does, feeding its ROM picker from the local
 * dump tree. `qa` parks the wall-clock run loop so the caller owns frame
 * advancement; without it the page runs exactly as it does for a visitor.
 */
export async function bootGame(
  page: Page,
  contract: GameContract,
  options: { qa?: boolean } = {},
): Promise<PageFaults> {
  const faults = watchFaults(page);
  await page.goto(`/app/g/${contract.game}/${options.qa ? '?qa=1' : ''}`);

  // The picker only exists once the drop screen is up; clicking the overlay is
  // the same gesture a visitor makes.
  await page.locator('[data-dropzone]').waitFor({ state: 'visible' });
  const chooser = page.waitForEvent('filechooser');
  await page.locator('[data-overlay]').click();
  await (await chooser).setFiles(romFiles(contract));

  // The drop screen holds its per-chip verdict on screen before booting.
  await page.waitForFunction(
    () => Boolean((window as unknown as { mamekit?: unknown }).mamekit),
    undefined,
    { timeout: 60_000 },
  );
  return faults;
}

/**
 * Replay a contract's input schedule against the page's own canvas and report
 * the same hashes the Node contract records, so the two can be compared
 * directly instead of through a second set of baselines.
 */
export async function replayContract(page: Page, plan: ReplayPlan): Promise<ReplayResult> {
  return page.evaluate(async (input: ReplayPlan) => {
    const mamekit = (window as unknown as {
      mamekit: {
        board: { snapshot(): Record<string, unknown> & { frame: number }; reset(): void };
        regions: Record<string, Uint8Array>;
        framebuffer: Uint32Array;
        step(count: number): void;
        qaDrive: boolean;
      };
    }).mamekit;
    if (!mamekit.qaDrive) throw new Error('replay needs the ?qa=1 drive mode');

    // The page's own zip module, so the checkpoint hash is computed by the
    // same crc32 the Node contract uses. Held in a variable because the URL is
    // resolved by the browser, not by the type checker.
    const zipModule = '/runtime/core/zip.js';
    const { crc32 } = await import(zipModule) as { crc32(bytes: Uint8Array): number };
    const hash = (bytes: Uint8Array): string => crc32(bytes).toString(16).padStart(8, '0');

    // Same stable serialisation the Node contract hashes, so a state hash
    // means the same thing on both sides.
    const stableJson = (value: unknown): string => {
      if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
      if (value && typeof value === 'object') {
        return `{${Object.entries(value)
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`)
          .join(',')}}`;
      }
      return JSON.stringify(value);
    };
    const stateHash = (snapshot: Record<string, unknown>): string => hash(
      new TextEncoder().encode(stableJson({
        cpus: snapshot.cpus,
        credits: snapshot.credits ?? null,
        generatedDevices: snapshot.generatedDevices ?? null,
      })),
    );

    // Untrusted synthetic events carry the same `code` the shell binds on, and
    // are what the Node harness dispatches too.
    const key = (type: 'keydown' | 'keyup', code: string): void => {
      const event = new Event(type, { cancelable: true });
      Object.defineProperties(event, { code: { value: code }, repeat: { value: false } });
      window.dispatchEvent(event);
    };

    const checkpoints: Record<string, { video: string; state: string }> = {};
    const pending = [...input.checkpoints].sort((left, right) => left - right);
    let next = 0;
    const frame = (): number => mamekit.board.snapshot().frame;
    // Advance in chunks that stop exactly on each checkpoint. The shell blits
    // once per chunk, which is the only difference from a visitor's loop.
    const runTo = (target: number): void => {
      while (frame() < target) {
        const stop = next < pending.length && pending[next]! < target ? pending[next]! : target;
        mamekit.step(stop - frame());
        if (next < pending.length && frame() === pending[next]) {
          const snapshot = mamekit.board.snapshot();
          checkpoints[String(snapshot.frame)] = {
            video: hash(new Uint8Array(mamekit.framebuffer.buffer)),
            state: stateHash(snapshot),
          };
          next++;
        }
      }
    };

    const startedAt = performance.now();
    for (const action of input.actions) {
      runTo(action.atFrame);
      if (action.reset) {
        mamekit.board.reset();
        continue;
      }
      key('keydown', action.code!);
      runTo(frame() + (action.heldFrames ?? 0));
      key('keyup', action.code!);
      runTo(frame() + (action.releasedFrames ?? 0));
    }
    runTo(input.frames);
    const seconds = (performance.now() - startedAt) / 1000;

    return {
      checkpoints,
      regions: Object.fromEntries(
        Object.entries(mamekit.regions)
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([name, bytes]) => [name, hash(bytes)]),
      ),
      fps: input.frames / seconds,
    };
  }, plan);
}

/**
 * Start tracking the loudest moment reaching the speakers, measured on the
 * app's own AudioWorklet graph. Silence there is the failure the Node audio
 * probe cannot see: it renders the DSP offline and never touches this wiring.
 *
 * Tracking runs for the whole session rather than a fixed window on purpose.
 * A window has to guess when a machine makes noise, and machines disagree:
 * Space Invaders is silent until play starts, Commando plays attract music and
 * then opens a level quietly. Guessing wrong reports a healthy machine as
 * mute. Peak-over-everything answers the question actually being asked — did
 * this machine ever make a sound — and a machine whose audio path is broken
 * still reads exactly 0 throughout.
 */
export async function trackAudioPeak(page: Page): Promise<void> {
  await page.evaluate(() => {
    const audio = (window as unknown as {
      mamekit: { audio: { monitor(): AnalyserNode | null } };
    }).mamekit.audio;
    const analyser = audio.monitor();
    if (!analyser) throw new Error('audio never started');
    const samples = new Float32Array(analyser.fftSize);
    const store = window as unknown as { __qaAudioPeak: number };
    store.__qaAudioPeak = 0;
    setInterval(() => {
      analyser.getFloatTimeDomainData(samples);
      let sum = 0;
      for (const sample of samples) sum += sample * sample;
      store.__qaAudioPeak = Math.max(store.__qaAudioPeak, Math.sqrt(sum / samples.length));
    }, 50);
  });
}

/** The loudest RMS seen since trackAudioPeak(). */
export async function audioPeak(page: Page): Promise<number> {
  return page.evaluate(() => (window as unknown as { __qaAudioPeak: number }).__qaAudioPeak);
}

/**
 * The presented screen as a PNG, read back from the canvas the shell blits to.
 *
 * Deliberately the backing store rather than an element screenshot: the canvas
 * is CSS-scaled to fit the window (and the cabinet bezel's CRT cut-out), so a
 * rendered screenshot is a fraction of a pixel different between a headed and
 * a headless window. The backing store is the rotated, presented frame at
 * native resolution, which is what QA is actually asking about.
 */
export async function screenPng(page: Page): Promise<Buffer> {
  const dataUrl = await page.locator('[data-screen]').evaluate(
    canvas => (canvas as HTMLCanvasElement).toDataURL('image/png'),
  );
  return Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64');
}

/**
 * Wall-clock seconds this machine needs to reach a given emulated frame, at
 * the screen refresh the generated board actually runs at (Space Invaders is
 * 59.54 Hz, not 60).
 */
export async function secondsToFrame(page: Page, frame: number): Promise<number> {
  const refresh = await page.evaluate(() => (window as unknown as {
    mamekit: { config: { board: { screen: { refresh: number } } } };
  }).mamekit.config.board.screen.refresh);
  return frame / refresh;
}

/** The keys the generated bindings assign to one MAME input, e.g. IPT_COIN1. */
export async function keysFor(page: Page, label: string): Promise<string[]> {
  return page.evaluate((wanted: string) => {
    const bindings = (window as unknown as {
      mamekit: { config: { bindings: { label: string; keys: string[] }[] } };
    }).mamekit.config.bindings;
    return bindings.filter(binding => binding.label === wanted).flatMap(binding => binding.keys);
  }, label);
}
