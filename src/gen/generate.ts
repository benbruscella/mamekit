// Orchestrate lowering, executable emission, reports and exhibit packaging.
import { existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { KnowledgeGraph } from '../kg/types.ts';
import type { BoardConfig } from '../ir/host-config.ts';
import type { GeneratedDiscreteDacPlan, GeneratedDiscreteEffectsPlan } from '../ir/audio-protocol.ts';
import { lowerMachine } from './lower-machine.ts';
import { writeExhibit } from './exhibit.ts';
import { emitGeneratedMachine } from './emit-machine.ts';
import { buildRuntimeReport, runtimeReportMarkdown, type RuntimeConfigShape } from './runtime-report.ts';
import { romsDir } from '../paths.ts';

export { buildApp } from './app-build.ts';
export { sixButtonKeys, inputKeys, inputLabel, inputPlayer, isKeyboardPlayerInput,
  joystickWays, keypadKeys, portCodeKeys, computerKeyboardKeys, fieldConditionHolds } from './input-bindings.ts';
export { sourceNvramInitializers, handlerOwnsSharedRam, sourceHandlerDataWidth } from './lower-machine.ts';

export interface GenerateOptions {
  mameSrc: string;
  outDir: string;
  game: string;
  /** Full driver graph, for clone-family ROM alternates. */
  fullGraph?: KnowledgeGraph;
}

const projectRoot = resolve(import.meta.dirname, '../..');

export async function generate(graph: KnowledgeGraph, opts: GenerateOptions): Promise<void> {
  const data = await lowerMachine(graph, opts);
  const { config, family, sound, compiledVideo, nesApu, inputChangedHandlers } = data;
  emitGeneratedMachine(graph, opts.game, family, opts.outDir,
    config.board as unknown as BoardConfig, compiledVideo, nesApu,
    'discreteDac' in sound ? sound.discreteDac as GeneratedDiscreteDacPlan
      : 'discreteEffects' in sound ? sound.discreteEffects as GeneratedDiscreteEffectsPlan
        : undefined,
    inputChangedHandlers);
  writeFileSync(join(opts.outDir, 'config.json'), JSON.stringify(config, null, 2));
  const report = buildRuntimeReport(graph, config as unknown as RuntimeConfigShape);
  writeFileSync(join(opts.outDir, 'runtime-report.json'), JSON.stringify(report, null, 2));
  writeFileSync(join(opts.outDir, 'runtime-report.md'), runtimeReportMarkdown(report));
  writeExhibit(data, opts);
  console.log(`\ngenerated ${join(opts.outDir, 'config.json')} (+ meta.json, dossier, runtime report)`);
  if (!existsSync(join(romsDir(projectRoot), `${opts.game}.zip`))) {
    console.log(`note: put ${opts.game}.zip in ${romsDir(projectRoot)}/ to auto-load ROMs (or drop the zip onto the page)`);
  }
}
