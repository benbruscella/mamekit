import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import type { KnowledgeGraph } from '../kg/types.ts';
import { gameCategory } from '../gen/output-layout.ts';
import type { ShellConfig } from '../runtime/shell.ts';
import { gameRegistration } from './discovery.ts';
import type {
  GameSoundKind,
  MachineTargetContract,
  MediaCapability,
} from './types.ts';
import { validateGameContract } from './contract-validation.ts';

const SOUND_KINDS = new Set<GameSoundKind>([
  'wsg', 'ay8910', 'dac', 'discrete', 'sn76489', 'pokey', 'ym2203',
  'ym2151', 'samples', 'berzerk', 'exidy', 'none',
]);

function mediaFor(
  category: ReturnType<typeof gameCategory>,
  graph: KnowledgeGraph,
): MediaCapability[] {
  const softwareLists = graph.nodes
    .filter(node => node.label === 'SoftwareList')
    .map(node => String(node.props.name ?? ''));
  const lists = (pattern: RegExp) => softwareLists.filter(name => pattern.test(name));
  if (category === 'arcade') return [{ kind: 'romset', status: 'candidate' }];
  if (category === 'consoles') return [
    { kind: 'bios', status: 'planned' },
    { kind: 'cartridge', status: 'candidate', ...(lists(/cart/i).length ? { softwareLists: lists(/cart/i) } : {}) },
  ];
  return [
    { kind: 'bios', status: 'candidate' },
    { kind: 'cartridge', status: 'planned', ...(lists(/cart/i).length ? { softwareLists: lists(/cart/i) } : {}) },
    { kind: 'quickload', status: 'planned', ...(lists(/qui(?:k|ck)|prg/i).length ? { softwareLists: lists(/qui(?:k|ck)|prg/i) } : {}) },
    { kind: 'cassette', status: 'planned', ...(lists(/cass|tape/i).length ? { softwareLists: lists(/cass|tape/i) } : {}) },
    { kind: 'floppy', status: 'planned', ...(lists(/flop|disk/i).length ? { softwareLists: lists(/flop|disk/i) } : {}) },
  ];
}

export function deriveCandidateContract(
  graph: KnowledgeGraph,
  config: ShellConfig,
): MachineTargetContract {
  const game = graph.nodes.find(node => node.label === 'Game' && node.props.name === config.game);
  if (!game) throw new Error(`${config.game}: generated graph has no Game node`);
  const machineEdge = graph.edges.find(edge => edge.from === game.id && edge.rel === 'USES_MACHINE');
  const machine = machineEdge && graph.nodes.find(node => node.id === machineEdge.to);
  if (!machine || machine.label !== 'MachineConfig') {
    throw new Error(`${config.game}: generated graph has no selected MachineConfig`);
  }
  const soundKind = String(config.sound.kind) as GameSoundKind;
  if (!SOUND_KINDS.has(soundKind)) {
    throw new Error(`${config.game}: sound kind "${soundKind}" has no acceptance contract type`);
  }
  const category = gameCategory(game.props.kind);
  const contract: MachineTargetContract = {
    target: {
      game: config.game,
      category,
      driver: String(game.props.sourceFile),
      machine: {
        className: String(machine.props.cls),
        name: String(machine.props.name),
      },
      screen: {
        width: config.board.screen.width,
        height: config.board.screen.height,
      },
      soundKind,
      media: mediaFor(category, graph),
    },
    scenarios: [{
      id: 'gameplay',
      kind: 'gameplay',
      romEnvironment: `MAMEKIT_${config.game.toUpperCase()}_ROM`,
      frames: 1200,
      minimumFps: 10,
      checkpoints: [1, 60, 180, 300, 600, 900, 1200],
      // Input readiness is machine software state. The scaffold deliberately
      // invents no universal coin/start timing; play-testing must add it.
      actions: [],
    }],
  };
  validateGameContract({ ...contract.target, ...contract.scenarios[0] }, 'candidate');
  return contract;
}

function identifier(game: string): string {
  return /^[A-Za-z_$][\w$]*$/.test(game) ? game : `_${game}`;
}

export function renderCandidateModule(contract: MachineTargetContract): string {
  const game = contract.target.game;
  const local = identifier(game);
  const value = JSON.stringify(contract, null, 2)
    .replace(/"([^"\\]+)":/g, (_, key: string) => /^[A-Za-z_$][\w$]*$/.test(key) ? `${key}:` : `"${key}":`)
    .replace(/"/g, "'");
  const declaration = `export const ${local} = ${value} satisfies MachineTargetContract;`;
  return `import type { MachineTargetContract } from '../types.ts';\n\n${declaration}\n` +
    (local === game ? '' : `export { ${local} as '${game}' };\n`);
}

export function renderCandidateSpec(game: string): string {
  const local = identifier(game);
  return `import { ${local} } from './${game}.game.ts';\n` +
    `import { gameSourceGraph } from '../test-support.ts';\n\n` +
    `gameSourceGraph(${local}.target);\n` +
    `console.log('${game}.game.spec: source machine graph passed');\n`;
}

export function writeCandidateScaffold(
  projectRoot: string,
  contract: MachineTargetContract,
): { modulePath: string; specPath: string } {
  const game = contract.target.game;
  if (gameRegistration(game, join(projectRoot, 'src/games'))) {
    throw new Error(`${game}: a game registration already exists`);
  }
  const dir = join(projectRoot, 'src/games/candidates');
  mkdirSync(dir, { recursive: true });
  const modulePath = join(dir, `${game}.game.ts`);
  const specPath = join(dir, `${game}.game.spec.ts`);
  if (existsSync(modulePath) || existsSync(specPath)) {
    throw new Error(`${game}: candidate scaffold would overwrite an existing file`);
  }
  writeFileSync(modulePath, renderCandidateModule(contract));
  writeFileSync(specPath, renderCandidateSpec(game));
  return { modulePath, specPath };
}

export function promoteCandidate(projectRoot: string, game: string): void {
  const registration = gameRegistration(game, join(projectRoot, 'src/games'));
  if (!registration || registration.lifecycle !== 'candidate') {
    throw new Error(`${game}: no candidate registration exists`);
  }
  const source = readFileSync(registration.modulePath, 'utf8');
  if (!/\bgolden\s*:/.test(source)) {
    throw new Error(`${game}: candidate has no reviewed golden`);
  }
  const gamesDir = join(projectRoot, 'src/games');
  renameSync(registration.modulePath, join(gamesDir, basename(registration.modulePath)));
  renameSync(registration.specPath, join(gamesDir, basename(registration.specPath)));
}
