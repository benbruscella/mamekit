// A NETLIST_SOUND device's plan: which netlist it runs, the streams it takes,
// the stream it gives and the logic lines the driver writes, all read from the
// machine configuration statements that declare them.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

import { parseMemberTags } from '../kg/parse.ts';
import { splitMameArgs } from '../mame/ast.ts';
import { analogValue } from '../mame/audio-compiler.ts';
import { compileNetlist, type GeneratedNetlistPlan } from '../mame/netlist-compiler.ts';

/** One `NETLIST_LOGIC_INPUT`: the parameter it drives and what handlers call it. */
export interface GeneratedNetlistLogicInput {
  deviceTag: string;
  param: string;
  shift: number;
  /** The finder members handlers reach it through (`m_filter_ctl[3]`, `m_audio_BD`). */
  members: string[];
}

function statement(device: KGNode): string {
  return Array.isArray(device.props.config) ? device.props.config.map(String).join('\n') : '';
}

/** The arguments of `CALL(...)`, balanced, wherever it stands in the statement. */
function callArguments(source: string, call: string): string[] | undefined {
  const at = source.indexOf(`${call}(`);
  if (at < 0) return undefined;
  const open = at + call.length;
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '(') depth++;
    else if (source[index] === ')' && --depth === 0) {
      return splitMameArgs(source.slice(open + 1, index)).map(arg => arg.trim());
    }
  }
  return undefined;
}

const unquoted = (text: string | undefined): string => (text ?? '').replace(/^"|"$/g, '');

function multOffset(source: string): { mult: number; offset: number } {
  const args = callArguments(source, 'set_mult_offset');
  return args ? { mult: analogValue(args[0]!), offset: analogValue(args[1]!) } : { mult: 1, offset: 0 };
}

/** The file beside the driver that holds `NETLIST_START(name)`. */
function netlistSourceFile(mameSrc: string, driverFile: string, name: string): string | undefined {
  const directory = dirname(driverFile);
  if (!existsSync(join(mameSrc, directory))) return undefined;
  const start = new RegExp(`NETLIST_START\\s*\\(\\s*${name}\\s*\\)`);
  const file = readdirSync(join(mameSrc, directory))
    .filter(entry => /^nl_.*\.cpp$/.test(entry))
    .find(entry => start.test(readFileSync(join(mameSrc, directory, entry), 'utf8')));
  return file ? `${directory}/${file}` : undefined;
}

function driverMemberTags(graph: KnowledgeGraph, mameSrc: string): Record<string, string> {
  const driver = String(graph.meta.driverFile);
  return parseMemberTags([driver, driver.replace(/\.cpp$/, '.h')]
    .filter(file => existsSync(join(mameSrc, file)))
    .map(file => readFileSync(join(mameSrc, file), 'utf8'))
    .join('\n'));
}

/**
 * The finders a handler tests rather than calls through: the netlist itself and
 * the chips feeding it (`if (m_netlist != nullptr)`, `m_ay8910[which] != nullptr`).
 * Any other finder keeps its device reference, which `target()` needs.
 */
export function lowerNetlistFinders(graph: KnowledgeGraph, devices: readonly KGNode[], mameSrc: string): string[] {
  const tested = devices.filter(device => ['NETLIST_SOUND', 'AY8910', 'AY8912', 'YM2149'].includes(String(device.props.type)));
  const present = new Set(tested.map(device => String(device.props.tag)));
  return [...new Set([
    ...tested.flatMap(device => device.props.type === 'NETLIST_SOUND' && typeof device.props.member === 'string' ? [device.props.member] : []),
    ...Object.entries(driverMemberTags(graph, mameSrc))
      .filter(([member, tag]) => present.has(tag) && /\[\d+\]$/.test(member))
      .map(([member]) => member),
  ])];
}

export function lowerNetlistLogicInputs(graph: KnowledgeGraph, devices: readonly KGNode[], mameSrc: string): GeneratedNetlistLogicInput[] {
  const inputs = devices.filter(device => device.props.type === 'NETLIST_LOGIC_INPUT');
  if (!inputs.length) return [];
  const tags = driverMemberTags(graph, mameSrc);
  return inputs.map(device => {
    const tag = String(device.props.tag);
    const args = callArguments(statement(device), 'NETLIST_LOGIC_INPUT') ?? [];
    const finders = Object.entries(tags)
      .filter(([, candidate]) => candidate === tag)
      .map(([member]) => member);
    const member = typeof device.props.member === 'string' ? [device.props.member] : [];
    return {
      deviceTag: tag,
      param: unquoted(args[2]),
      shift: Number(args[3] ?? 0) || 0,
      members: [...new Set([...member, ...finders])],
    };
  });
}

/**
 * The netlist a chip's route lands in, compiled. A netlist holding a device the
 * compiler does not have answers undefined: the board then has no netlist plan
 * and says so at generation, rather than playing an approximation of it.
 */
export function lowerNetlistSound(
  graph: KnowledgeGraph,
  devices: readonly KGNode[],
  mameSrc: string,
  routeGain: number,
): { plan?: GeneratedNetlistPlan; error?: string } {
  const sound = devices.find(device => device.props.type === 'NETLIST_SOUND');
  if (!sound) return {};
  const source = callArguments(statement(sound), 'set_source')?.[0];
  const name = source
    ? callArguments(source, 'NETLIST_NAME')?.[0] ?? source.replace(/^netlist_/, '')
    : undefined;
  const file = name ? netlistSourceFile(mameSrc, String(graph.meta.driverFile), name) : undefined;
  if (!name || !file) return { error: `netlist ${source ?? '?'}: no source beside the driver` };
  const streamInputs = devices
    .filter(device => device.props.type === 'NETLIST_STREAM_INPUT')
    .map(device => {
      const text = statement(device);
      const args = callArguments(text, 'NETLIST_STREAM_INPUT') ?? [];
      return { channel: Number(args[2]), param: unquoted(args[3]), ...multOffset(text) };
    });
  const outputDevice = devices.find(device => device.props.type === 'NETLIST_STREAM_OUTPUT');
  if (!outputDevice) return { error: `netlist ${name}: no NETLIST_STREAM_OUTPUT` };
  const outputText = statement(outputDevice);
  const outputArgs = callArguments(outputText, 'NETLIST_STREAM_OUTPUT') ?? [];
  const { mult, offset } = multOffset(outputText);
  try {
    return {
      plan: compileNetlist(mameSrc, file, {
        source: name,
        streamInputs,
        output: { node: unquoted(outputArgs[3]), mult: mult * routeGain, offset: offset * routeGain },
        logicInputs: lowerNetlistLogicInputs(graph, devices, mameSrc)
          .map(input => ({ tag: input.deviceTag, param: input.param, value: 0 })),
      }),
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
