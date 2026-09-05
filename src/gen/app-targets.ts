import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { generatedGameOutputs, gameDataPath } from './output-layout.ts';

/** Compile every generated board, but expose only the publication subset. */
export function stageGeneratedBoards(
  outRoot: string,
  srcDir: string,
  published?: ReadonlySet<string>,
): { binding: string; dataPath: string }[] {
  const entries: { binding: string; dataPath: string }[] = [];
  for (const { category, game, dir } of generatedGameOutputs(outRoot)) {
    const generated = join(dir, 'generated');
    if (!existsSync(join(generated, 'board.ts'))) continue;
    const dataPath = gameDataPath(category, game);
    const staged = join(srcDir, dataPath, 'generated');
    mkdirSync(staged, { recursive: true });
    cpSync(generated, staged, { recursive: true });
    if (!published || published.has(game)) entries.push({ binding: `board_${entries.length}`, dataPath });
  }
  return entries;
}
