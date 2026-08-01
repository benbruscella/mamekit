import { pathToFileURL } from 'node:url';
import { runGameAcceptance } from './acceptance-harness.ts';
import { loadGameContracts } from './contracts.ts';

export async function verifySupportedGames(): Promise<void> {
  for (const contract of await loadGameContracts()) {
    await runGameAcceptance(contract);
    console.log(`${contract.game}: ROM/input/video/audio/timing contract passed`);
  }
}

async function verifyGame(game: string): Promise<void> {
  const contract = (await loadGameContracts()).find(candidate => candidate.game === game);
  if (!contract) throw new Error(`unknown supported game: ${game}`);
  await runGameAcceptance(contract);
  console.log(`${contract.game}: ROM/input/video/audio/timing contract passed`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const game = process.argv[2];
  if (game === '--list') {
    for (const contract of await loadGameContracts()) console.log(contract.game);
  } else if (game) await verifyGame(game);
  else await verifySupportedGames();
}
