import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { runGameAcceptance } from './acceptance-harness.ts';
import type { GameTestContract } from './types.ts';

// Synthetic generated-module fixture: exercise the actual recording loader
// without needing a proprietary ROM or adding a candidate to the real catalog.
const root = mkdtempSync(join(tmpdir(), 'mamekit-candidate-recording-'));
const outRoot = join(root, 'isolated');
const write = (path: string, value: string | Uint8Array) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, value);
};
try {
  const zip = new Uint8Array(22);
  new DataView(zip.buffer).setUint32(0, 0x06054b50, true);
  write(join(root, '.data/roms/arcade/fixture.zip'), zip);
  write(join(outRoot, 'app/registry.js'), 'export function registerGeneratedMachines() {}');
  write(join(outRoot, 'runtime/core/generated-board.js'), `
    const boards = new Map();
    export function registerGeneratedBoard(game, factory) { boards.set(game, factory); }
    export function createBoard(config, ...args) {
      if (!boards.has(config.game)) throw new Error('not in public registry');
      return boards.get(config.game)(config, ...args);
    }
  `);
  write(join(outRoot, 'games/arcade/fixture/generated/board.js'), `
    export default { machine: { game: 'fixture' }, createBoard(config, regions, input, sinks) {
      let frame = 0;
      return { fbWidth: 1, fbHeight: 1,
        frame(pixels) { pixels[0] = ++frame; sinks.soundWrite(0, frame & 255); },
        snapshot() { return { frame, cpus: [] }; }, reset() { frame = 0; }
      };
    }};
  `);
  write(join(outRoot, 'runtime/generated/audio/dac-worklet.js'), `
    export class GeneratedDacMixer {}
    export class GeneratedDacFrameRenderer { render() { return Float32Array.of(0.25); } }
  `);
  write(join(outRoot, 'games/arcade/fixture/config.json'), JSON.stringify({
    game: 'fixture', sound: { kind: 'dac' }, roms: [], bindings: [], dipDefaults: [], ports: [],
    board: { cpus: [], screen: { refresh: 60 } },
  }));
  const contract: GameTestContract = {
    game: 'fixture', category: 'arcade', driver: 'src/mame/fixture.cpp',
    machine: { className: 'fixture_state', name: 'fixture' }, screen: { width: 1, height: 1 },
    romEnvironment: 'MAMEKIT_FIXTURE_ROM', soundKind: 'dac',
    frames: 130, checkpoints: [1, 60, 130], minimumFps: 1, actions: [],
  };
  await assert.rejects(runGameAcceptance(contract, root, { recording: true, outRoot }), /not in public registry/);
  const golden = await runGameAcceptance(contract, root, { recording: true, registerCandidate: true, outRoot });
  assert.equal(Object.keys(golden.checkpoints).length, 3);
  assert.equal(golden.audio.writes, 130);
  assert.equal(golden.audio.rms, 0.25);
  await assert.rejects(runGameAcceptance(contract, root, { registerCandidate: true, outRoot }),
    /only allowed during offline recording/);
} finally {
  rmSync(root, { recursive: true, force: true });
}
console.log('candidate-acceptance.spec: unpublished candidate records through isolated generated modules');
