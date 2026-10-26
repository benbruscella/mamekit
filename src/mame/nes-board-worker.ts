// One worker's share of the NES cartridge boards, for compileCartridgeBoards
// in src/hardware/nes/extract.ts: `node nes-board-worker.ts <job.json> <out.json>`.
// It lives with the compiler, not the capability package: the app build
// ships src/hardware's runtime files, and this is not one.

import { readFileSync, writeFileSync } from 'node:fs';
import { compileCartridgeBoard } from '../hardware/nes/extract.ts';

const [jobFile, outFile] = process.argv.slice(2);
if (!jobFile || !outFile) throw new Error('usage: nes-board-worker.ts <job.json> <out.json>');
const job = JSON.parse(readFileSync(jobFile, 'utf8')) as { mameSource: string; hotMethods: string[]; types: string[] };
writeFileSync(outFile, JSON.stringify(job.types.map(type =>
  [type, compileCartridgeBoard(job.mameSource, type, job.hotMethods)])));
