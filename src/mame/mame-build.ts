// MAME's build-time source generators, run the way MAME's own build runs them.
//
// Not everything MAME compiles is in its source tree. scripts/src/cpu.lua
// declares custom build tasks that turn an instruction list into C++ with a
// Python script -- `m6809make.py m6809.lst > m6809.hxx` -- and the core then
// does `#include "cpu/m6809/m6809.hxx"` from MAME's GEN_DIR. A compiler that
// reads only the tree sees an include that resolves nowhere, and a 6809 whose
// execute_one has no instructions in it, with no diagnostic to say so.
//
// This reads those tasks from the build scripts and runs them exactly as
// written (same script, same arguments, same redirection) into a
// content-addressed directory under .cache. The key is a hash of the task and
// of every file it reads, so an output can never be stale, and a missing one
// is simply produced again: nothing about it depends on a cache being warm.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

/** One `custombuildtask` entry: `{ input, output, { dependencies }, { echo, command } }`. */
export interface MameBuildTask {
  /** The file the task transforms, relative to the MAME checkout (`$(<)`). */
  input: string;
  /** Where MAME's build writes the result, relative to GEN_DIR (`$(@)`). */
  output: string;
  /** `$(1)`, `$(2)`, ...: the script first, then the files it also reads. */
  dependencies: string[];
  /** The command after `PYTHON ..`, with MAME's `$(n)`/`$(<)`/`$(@)` placeholders. */
  command: string;
  /** The build script that declares the task. */
  script: string;
}

const TASKS = new Map<string, MameBuildTask[]>();

/** Every Python source-generation task the MAME build scripts declare. */
export function mameBuildTasks(mameSrc: string): MameBuildTask[] {
  let tasks = TASKS.get(mameSrc);
  if (tasks) return tasks;
  tasks = [];
  const scripts = join(mameSrc, 'scripts/src');
  for (const name of existsSync(scripts) ? readdirSync(scripts).filter(file => file.endsWith('.lua')).sort() : []) {
    const script = `scripts/src/${name}`;
    const source = readFileSync(join(mameSrc, script), 'utf8');
    const entry = /\{\s*MAME_DIR\s*\.\.\s*"([^"]+)"\s*,\s*GEN_DIR\s*\.\.\s*"([^"]+)"\s*,\s*\{([^{}]*)\}\s*,\s*\{\s*"@echo[^"]*"\s*,\s*PYTHON\s*\.\.\s*"([^"]*)"\s*\}\s*\}/g;
    for (const match of source.matchAll(entry)) {
      tasks.push({
        input: match[1]!,
        output: match[2]!,
        dependencies: [...match[3]!.matchAll(/MAME_DIR\s*\.\.\s*"([^"]+)"/g)].map(dependency => dependency[1]!),
        command: match[4]!.trim(),
        script,
      });
    }
  }
  TASKS.set(mameSrc, tasks);
  return tasks;
}

const generatedRoot = resolve(import.meta.dirname, '../../.cache/mame-generated');
const PYTHON = process.env.PYTHON ?? 'python3';

/**
 * The generated file an `#include` names when MAME's build makes it rather
 * than the tree holding it: `cpu/m6809/m6809.hxx` is GEN_DIR's
 * `emu/cpu/m6809/m6809.hxx`. Runs the task on first use; undefined when no
 * task produces the file.
 */
export function generatedInclude(mameSrc: string, include: string): string | undefined {
  const task = mameBuildTasks(mameSrc).find(candidate =>
    candidate.output === `emu/${include}` || candidate.output === include);
  return task ? runMameBuildTask(mameSrc, task) : undefined;
}

/** The task's output, produced if it is not there yet. Returns its absolute path. */
export function runMameBuildTask(mameSrc: string, task: MameBuildTask): string {
  const hash = createHash('sha256');
  hash.update(JSON.stringify(task));
  for (const file of [task.input, ...task.dependencies]) {
    hash.update('\0');
    hash.update(readFileSync(join(mameSrc, file)));
  }
  const directory = join(generatedRoot, hash.digest('hex').slice(0, 16));
  const output = join(directory, task.output);
  if (existsSync(output)) return output;

  mkdirSync(dirname(output), { recursive: true });
  // Its own partial file per process: generators run in parallel, and two
  // that shared one renamed it from under each other (CI: "z80.hxx wrote
  // nothing"). The rename into place is atomic, so the last writer wins
  // with the same bytes.
  const partial = `${output}.${process.pid}.partial`;
  const placeholders = (token: string): string => token
    .replace(/\$\((\d+)\)/g, (_whole, index: string) => join(mameSrc, task.dependencies[Number(index) - 1] ?? ''))
    .replace(/\$\(<\)/g, join(mameSrc, task.input))
    .replace(/\$\(@\)/g, partial);
  const tokens = task.command.split(/\s+/).filter(Boolean);
  const redirect = tokens.indexOf('>');
  const args = (redirect >= 0 ? tokens.slice(0, redirect) : tokens).map(placeholders);
  try {
    const stdout = execFileSync(PYTHON, args, {
      cwd: mameSrc,
      encoding: 'utf8',
      maxBuffer: 256 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (redirect >= 0) writeFileSync(partial, stdout);
  } catch (error) {
    const detail = (error as { stderr?: string }).stderr?.trim() || (error as Error).message;
    throw new Error(`MAME build task for ${task.output} (${task.script}) failed: ${PYTHON} ${args.join(' ')}\n${detail}`);
  }
  if (!existsSync(partial)) {
    throw new Error(`MAME build task for ${task.output} (${task.script}) wrote nothing`);
  }
  renameSync(partial, output);
  return output;
}
