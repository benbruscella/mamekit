import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { KnowledgeGraph } from '../kg/types.ts';
import type { RuntimeReport } from './runtime-report.ts';

export interface CapabilityGapReport {
  schemaVersion: 1;
  game: string;
  hardware: { tag: string; type: string; clock?: number }[];
  addressSpaces: {
    owner: string;
    name: string;
    width?: number;
    shift?: number;
    endianness?: string;
    ranges: number;
  }[];
  screens: { tag: string; owner?: string; callback?: string; raw?: string }[];
  media: { kind: 'software-list'; tag: string; list: string }[];
  firmware: { region: string; romSet?: string; loads: number }[];
  inputs: { ports: number; fields: number; keyboardFields: number };
  peripheralMachines: { device: string; type: string; reason: string }[];
  sourceTemplates: { owner: string; method: string; parameters: string }[];
  generationGaps: string[];
  sharedGapCapabilities: { capability: string; games: string[] }[];
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value ? value : undefined;
}

export function buildCapabilityGapReport(
  graph: KnowledgeGraph,
  runtime?: RuntimeReport,
  peers: CapabilityGapReport[] = [],
): CapabilityGapReport {
  const game = String(graph.nodes.find(node => node.label === 'Game')?.props.name ?? 'unknown');
  const rangesByMap = new Map<string, number>();
  for (const edge of graph.edges.filter(edge => edge.rel === 'HAS_RANGE')) {
    rangesByMap.set(edge.from, (rangesByMap.get(edge.from) ?? 0) + 1);
  }
  const ownerByMap = new Map<string, string>();
  for (const edge of graph.edges.filter(edge => edge.rel === 'HAS_MAP')) {
    const owner = graph.nodes.find(node => node.id === edge.from);
    ownerByMap.set(edge.to, String(owner?.props.tag ?? owner?.id ?? edge.from));
  }
  const generationGaps = [...new Set(runtime?.generationGaps ?? [])].sort();
  const peerGames = new Map<string, Set<string>>();
  for (const peer of peers) {
    for (const gap of peer.generationGaps) {
      const games = peerGames.get(gap) ?? new Set<string>();
      games.add(peer.game);
      peerGames.set(gap, games);
    }
  }
  return {
    schemaVersion: 1,
    game,
    hardware: graph.nodes.filter(node => node.label === 'Device').map(node => ({
      tag: String(node.props.tag),
      type: String(node.props.type),
      ...(typeof node.props.clock === 'number' ? { clock: node.props.clock } : {}),
    })).sort((a, b) => a.tag.localeCompare(b.tag)),
    addressSpaces: graph.nodes.filter(node => node.label === 'AddressMap').map(node => ({
      owner: ownerByMap.get(node.id) ?? String(node.props.cls ?? 'unknown'),
      name: String(node.props.name),
      ...(typeof node.props.dataWidth === 'number' ? { width: node.props.dataWidth } : {}),
      ...(typeof node.props.addressShift === 'number' ? { shift: node.props.addressShift } : {}),
      ...(text(node.props.endianness) ? { endianness: text(node.props.endianness)! } : {}),
      ranges: rangesByMap.get(node.id) ?? 0,
    })).sort((a, b) => `${a.owner}:${a.name}`.localeCompare(`${b.owner}:${b.name}`)),
    screens: graph.nodes.filter(node =>
      node.label === 'Device' && String(node.props.type).includes('SCREEN')).map(node => ({
        tag: String(node.props.tag),
        ...(text(node.props.ownerTag) ? { owner: text(node.props.ownerTag) } : {}),
        ...(text(node.props.screenUpdate) ? { callback: text(node.props.screenUpdate) } : {}),
        ...(text(node.props.screenRawExpr) ? { raw: text(node.props.screenRawExpr) } : {}),
      })),
    media: graph.nodes.filter(node => node.label === 'SoftwareList').map(node => ({
      kind: 'software-list' as const,
      tag: String(node.props.tag),
      list: String(node.props.list ?? node.props.name ?? ''),
    })),
    firmware: graph.nodes.filter(node => node.label === 'RomRegion').map(node => ({
      region: String(node.props.tag),
      ...(text(node.props.romSet) ? { romSet: text(node.props.romSet) } : {}),
      loads: graph.edges.filter(edge => edge.from === node.id && edge.rel === 'LOADS').length,
    })),
    inputs: {
      ports: graph.nodes.filter(node => node.label === 'Port').length,
      fields: graph.nodes.filter(node => node.label === 'PortField').length,
      keyboardFields: graph.nodes.filter(node =>
        node.label === 'PortField' && /KEYBOARD|KEYPAD|CHAR/i.test(String(node.props.type ?? node.props.kind ?? '')),
      ).length,
    },
    peripheralMachines: graph.nodes.filter(node =>
      node.label === 'Device' && /FLOPPY|CASSETTE|QUICKLOAD|SERIAL|IEC|DRIVE/i.test(String(node.props.type)),
    ).map(node => ({
      device: String(node.props.tag),
      type: String(node.props.type),
      reason: 'media or bus device may require an independently executable peripheral capability',
    })),
    sourceTemplates: graph.nodes.filter(node =>
      node.label === 'Handler' && /(?:^|,)\s*(?:unsigned|int|size_t|bool)\s+\w+/.test(String(node.props.sourceParameters ?? '')),
    ).map(node => ({
      owner: String(node.props.ownerClass),
      method: String(node.props.method),
      parameters: String(node.props.sourceParameters),
    })),
    generationGaps,
    sharedGapCapabilities: generationGaps.flatMap(capability => {
      const games = [...(peerGames.get(capability) ?? [])].filter(peer => peer !== game).sort();
      return games.length ? [{ capability, games }] : [];
    }),
  };
}

export function capabilityGapMarkdown(report: CapabilityGapReport): string {
  const lines = [
    `# ${report.game} capability gap`, '',
    `- Hardware devices: ${report.hardware.length}`,
    `- Address spaces: ${report.addressSpaces.length}`,
    `- Screens: ${report.screens.length}`,
    `- Software lists: ${report.media.length}`,
    `- Firmware regions: ${report.firmware.length}`,
    `- Input fields: ${report.inputs.fields} (${report.inputs.keyboardFields} keyboard)`,
    `- Peripheral candidates: ${report.peripheralMachines.length}`,
    `- Runtime generation gaps: ${report.generationGaps.length}`, '',
    '## Generation gaps', '',
    ...(report.generationGaps.length ? report.generationGaps.map(gap => `- ${gap}`) : ['- None reported']),
  ];
  if (report.sharedGapCapabilities.length) {
    lines.push('', '## Shared opportunities', '');
    for (const shared of report.sharedGapCapabilities) {
      lines.push(`- ${shared.capability} — also needed by ${shared.games.join(', ')}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

export function writeCapabilityGapReport(
  outputDir: string,
  graph: KnowledgeGraph,
  peers: CapabilityGapReport[] = [],
): CapabilityGapReport {
  const runtimePath = join(outputDir, 'runtime-report.json');
  const runtime = existsSync(runtimePath)
    ? JSON.parse(readFileSync(runtimePath, 'utf8')) as RuntimeReport
    : undefined;
  const report = buildCapabilityGapReport(graph, runtime, peers);
  writeFileSync(join(outputDir, 'capability-gap.json'), JSON.stringify(report, null, 2));
  writeFileSync(join(outputDir, 'CAPABILITY_GAP.md'), capabilityGapMarkdown(report));
  return report;
}
