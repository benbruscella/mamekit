import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr } from '../kg/parse.ts';
import type { GeneratedDevice } from '../ir/board.ts';
import { executeGeneratedProgram } from '../ir/execute.ts';
import { compileMameHandler } from './handler-ir.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';

/** Lower MAME's configured RAM allocation to host-owned byte storage. */
export function lowerRamAllocation(
  props: Record<string, unknown>, mameSource: string,
): Pick<GeneratedDevice, 'memoryAllocations' | 'memberValues'> {
  const config = Array.isArray(props.config) ? props.config.map(String).join('\n') : '';
  // A derived config patches the base's size (`m_ram->set_default_size("128K")`
  // after the 48K Spectrum's own declaration), so the last call is the one.
  const sizeText = [...config.matchAll(/\.set_default_size\(\s*"([^"]+)"\s*\)|->\s*set_default_size\(\s*"([^"]+)"\s*\)/g)]
    .map(match => match[1] ?? match[2]).at(-1);
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
  const fillText = [...config.matchAll(/(?:\.|->)\s*set_default_value\(([^)]+)\)/g)].at(-1)?.[1];
  const fill = evalExpr(fillText ?? defaultFill, {});
  if (!Number.isSafeInteger(bytes) || bytes <= 0 || fill === null) throw new Error(`unsupported RAM configuration ${sizeText}`);
  return {
    memberValues: { [allocation[2]!]: bytes },
    memoryAllocations: { [allocation[1]!]: { bytes, fill } },
  };
}

/**
 * What a driver's machine_start leaves in one of its RAM devices before the
 * first instruction, as `[byte, count]` runs; undefined when it leaves the
 * device's own fill. MAME's C64 lays its 64K out in alternating 64-byte runs
 * of $00 and $FF, and a game that reads memory it never wrote hears it:
 * Cauldron copies its first SID frame out of untouched RAM.
 *
 * The function is interpreted, not pattern-matched. The device's pointer and
 * size are live and every other call answers nothing, so all that survives is
 * what the start writes into that memory -- and a start that never writes
 * through `<member>->pointer()` is not run at all.
 */
export function ramPowerOn(
  startBody: string, member: string, bytes: number, fill: number,
): [number, number][] | undefined {
  if (!new RegExp(`\\b${member}\\s*->\\s*pointer\\s*\\(`).test(startBody)) return undefined;
  const program = compileMameHandler(normalizeMameExecutionSource(startBody));
  const memory = new Uint8Array(bytes).fill(fill);
  const live: Record<string, unknown> = {
    [`${member}.pointer`]: () => memory,
    [`${member}.size`]: () => bytes,
  };
  executeGeneratedProgram(program, {
    members: { [member]: { pointer: () => memory, size: () => bytes } },
    calls: new Proxy(live, { get: (target, name) => target[name as string] ?? (() => 0) }) as never,
  });
  if (memory.every(value => value === fill)) return undefined;
  const runs: [number, number][] = [];
  for (const value of memory) {
    const last = runs.at(-1);
    if (last && last[0] === value) last[1]++;
    else runs.push([value, 1]);
  }
  return runs;
}

/**
 * What a driver's machine_start leaves in one of its shared RAM blocks at
 * power-on, run with only that member live as the share's bytes. The NES
 * fills its 2 KB with alternating 0x00 and 0xff ("for software that depends
 * on its contents at boot up"), and a zeroed RAM read differently from MAME's
 * wherever a game never wrote. Undefined when the function never indexes the
 * member, or leaves it zero.
 */
export function sharePowerOn(startBody: string, member: string, bytes: number): number[] | undefined {
  if (!new RegExp(`\\b${member}\\s*\\[`).test(startBody)) return undefined;
  const program = compileMameHandler(normalizeMameExecutionSource(startBody));
  if (program.diagnostics.length) return undefined;
  const memory = new Uint8Array(bytes);
  try {
    executeGeneratedProgram(program, {
      members: { [member]: memory },
      calls: new Proxy({}, { get: () => () => 0 }) as never,
    });
  } catch {
    return undefined;
  }
  return memory.some(value => value !== 0) ? [...memory] : undefined;
}
