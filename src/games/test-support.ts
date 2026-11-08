import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { buildGraph, gameSubgraph } from '../kg/build.ts';
import type { KnowledgeGraph } from '../kg/types.ts';
import type { CompiledMameVideo, PaletteCallback } from '../mame/video-compiler.ts';
import type { GameTestContract, MachineTargetDefinition } from './types.ts';
import { validateGameContract } from './contract-validation.ts';

export function mameSourceRoot(): string {
  return resolve(process.env.MAME_SRC ?? '../mame');
}

export function gameSourceGraph(
  contract: Pick<GameTestContract, 'game' | 'driver' | 'machine'> | MachineTargetDefinition,
): KnowledgeGraph {
  const mameSrc = mameSourceRoot();
  const driver = join(mameSrc, contract.driver);
  assert.ok(existsSync(driver), `${contract.game}: MAME driver is missing: ${driver}`);
  const graph = gameSubgraph(buildGraph(mameSrc, driver), contract.game);
  const game = graph.nodes.find(node =>
    node.label === 'Game' && node.props.name === contract.game);
  assert.ok(game, `${contract.game}: source graph has no Game node`);
  const machine = graph.nodes.find(node =>
    node.label === 'MachineConfig' &&
    node.props.cls === contract.machine.className &&
    node.props.name === contract.machine.name);
  assert.ok(machine, `${contract.game}: source graph has no selected MachineConfig`);
  assert.equal(graph.meta.driverFile, contract.driver);
  return graph;
}

export function assertGameContract(contract: GameTestContract): void {
  validateGameContract(contract, 'accepted');
}

/**
 * The machine's palette is its own palette_device init callback, which the
 * board runs at the palette's device_start (execution.paletteInits): no plan
 * read out of the callback's text stands in for it.
 */
export function assertPaletteCallback(
  video: CompiledMameVideo | undefined,
  ...expected: Omit<PaletteCallback, 'member'>[]
): void {
  assert.ok(video, 'the video source must lower');
  assert.equal(video.plan.palette, undefined, 'no plan stands in for the palette callback');
  assert.deepEqual(video.paletteCallbacks?.map(({ member: _, ...callback }) => callback), expected);
}
