import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr } from '../kg/parse.ts';
import type { GeneratedDevice } from '../ir/board.ts';

/** Lower MAME's configured RAM allocation to host-owned byte storage. */
export function lowerRamAllocation(
  props: Record<string, unknown>, mameSource: string,
): Pick<GeneratedDevice, 'memoryAllocations' | 'memberValues'> {
  const config = Array.isArray(props.config) ? props.config.map(String).join('\n') : '';
  const sizeText = /\.set_default_size\(\s*"([^"]+)"\s*\)/.exec(config)?.[1];
  if (!sizeText) return {};
  const source = readFileSync(join(mameSource, 'src/devices/machine/ram.cpp'), 'utf8');
  const allocation = /(m_\w+)\.reset\(std::malloc\((m_\w+)\)\)/.exec(source);
  const suffixes = /s_suffixes\[\]\s*=\s*\{([\s\S]*?)\n\s*\};/.exec(source)?.[1];
  const defaultFill = /m_default_value\(([^)]+)\)/.exec(source)?.[1];
  if (!allocation || !suffixes || !defaultFill) throw new Error('MAME RAM allocation source shape changed');
  const units = Object.fromEntries([...suffixes.matchAll(/\{\s*"([^"]*)"\s*,\s*([^}]+)\}/g)]
    .map(match => [match[1]!, evalExpr(match[2]!, {})]));
  const parsed = /^(\d+)\s*(\w*)$/.exec(sizeText.trim());
  const multiple = parsed && units[parsed[2]!.toLowerCase()];
  const bytes = parsed && multiple ? Number(parsed[1]) * multiple : 0;
  const fill = evalExpr(/\.set_default_value\(([^)]+)\)/.exec(config)?.[1] ?? defaultFill, {});
  if (!Number.isSafeInteger(bytes) || bytes <= 0 || fill === null) throw new Error(`unsupported RAM configuration ${sizeText}`);
  return {
    memberValues: { [allocation[2]!]: bytes },
    memoryAllocations: { [allocation[1]!]: { bytes, fill } },
  };
}
