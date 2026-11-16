// Machine-local settings: where this one machine keeps MAME and its sets.
//
// Where the MAME source checkout, the MAME binary and the ROM and sample sets
// live is a fact about one person's machine, not about the project, so none
// of it is written into the repository. It is read from a git-ignored `.env`
// at the repository root; `.env.example` lists every variable.
//
//   MAME_SRC          the MAME source checkout, at the release tag
//   MAME_BIN          the MAME binary of the same release
//   MAMEKIT_ROMS      ROM sets, when not `.data/roms`
//   MAMEKIT_SAMPLES   sample sets, when not `.data/samples`
//
// A variable already set in the environment wins over the file (Node's
// `process.loadEnvFile` never replaces one), so CI and one-off runs keep
// working. Every entry point imports this module first; a process it spawns
// inherits the result.
//
// Tooling layer only: nothing under src/runtime or src/ir may import this.

import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** `<repo>/.env`. */
export const LOCAL_ENV_FILE = join(projectRoot, '.env');

/** The variables `.env` may set, and what each must point at. */
export const LOCAL_VARIABLES = {
  MAME_SRC: 'the MAME source checkout, at the release tag (the directory holding makefile and src/mame)',
  MAME_BIN: 'the MAME binary of the same release as MAME_SRC',
  MAMEKIT_ROMS: 'the directory of ROM sets (default .data/roms)',
  MAMEKIT_SAMPLES: 'the directory of sample sets (default .data/samples)',
} as const;

export type LocalVariable = keyof typeof LOCAL_VARIABLES;

let loaded = false;

/** Reads `.env` into `process.env` once; a variable already set is kept. */
export function loadLocalEnv(): void {
  if (loaded) return;
  loaded = true;
  if (existsSync(LOCAL_ENV_FILE)) process.loadEnvFile(LOCAL_ENV_FILE);
}

/**
 * The message for a variable that is missing or points at the wrong thing:
 * which variable, what it should point at, and where it belongs.
 */
export function localVariableProblem(name: LocalVariable, problem: string): string {
  return `${problem}: set ${name} to ${LOCAL_VARIABLES[name]}, in ${LOCAL_ENV_FILE} ` +
    '(see .env.example) or in the environment';
}

loadLocalEnv();
