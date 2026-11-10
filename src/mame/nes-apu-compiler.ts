// The RP2A03's internal APU composition, lowered from rp2a03.cpp: which sound
// device the CPU builds, the internal map that reaches it, and the CPU line and
// space its callbacks drive. The APU's sound is nes_apu.cpp compiled whole as
// a stream device; nothing here models it.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { GeneratedNesApuPlan } from '../ir/audio-protocol.ts';

const CPU_FILE = 'src/devices/cpu/m6502/rp2a03.cpp';
const CPU_HEADER = 'src/devices/cpu/m6502/rp2a03.h';
const APU_HEADER = 'src/devices/sound/nes_apu.h';

function lineAt(source: string, index: number): number {
  return source.slice(0, index).split('\n').length;
}

function body(source: string, signature: RegExp, what: string): { text: string; index: number } {
  const match = signature.exec(source);
  if (!match) throw new Error(`MAME RP2A03: ${what} is missing`);
  const open = source.indexOf('{', match.index + match[0].length - 1);
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}' && --depth === 0) return { text: source.slice(open + 1, index), index: open + 1 };
  }
  throw new Error(`MAME RP2A03: ${what} is unbalanced`);
}

/** A method's parameter names as nes_apu.h declares them: `write(offs_t offset, u8 data)`. */
function parameterList(header: string, method: string): string {
  const declared = new RegExp(`\\b${method}\\s*\\(([^)]*)\\)\\s*;`).exec(header);
  if (!declared) throw new Error(`MAME NES APU: ${method} is not declared`);
  return declared[1]!.trim();
}

const argumentNames = (parameters: string): string =>
  parameters.split(',').map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1] ?? '').filter(Boolean).join(', ');

/** The composition of the CPU type's APU, from the class MAME defines it with. */
export function compileNesApu(mameSource: string, cpuType = 'RP2A03G'): GeneratedNesApuPlan {
  const cpu = readFileSync(join(mameSource, CPU_FILE), 'utf8');
  const cpuHeader = readFileSync(join(mameSource, CPU_HEADER), 'utf8');
  const apuHeader = readFileSync(join(mameSource, APU_HEADER), 'utf8');
  const cpuClass = new RegExp(`DEFINE_DEVICE_TYPE\\(\\s*${cpuType}\\s*,\\s*(\\w+)`).exec(cpu)?.[1];
  if (!cpuClass) throw new Error(`MAME RP2A03: no class for ${cpuType}`);
  // device_add_mconfig: `NES_APU(config, m_apu, DERIVED_CLOCK(1,1));` and its callbacks.
  const config = body(cpu, new RegExp(`void\\s+${cpuClass}::device_add_mconfig\\s*\\(`), `${cpuClass}::device_add_mconfig`).text;
  const built = /\b([A-Z][A-Z0-9_]*)\s*\(\s*config\s*,\s*(m_\w+)\s*,\s*DERIVED_CLOCK\s*\(\s*1\s*,\s*1\s*\)\s*\)/.exec(config);
  if (!built) throw new Error(`MAME RP2A03: ${cpuClass} builds no APU at its own clock`);
  const member = built[2]!;
  const tag = new RegExp(`\\b${member}\\s*\\(\\s*\\*this\\s*,\\s*"([^"]+)"`).exec(cpu)?.[1];
  if (!tag) throw new Error(`MAME RP2A03: ${member} has no tag`);
  const irqHandler = new RegExp(`${member}->irq\\(\\)\\.set\\(\\s*FUNC\\(\\s*\\w+::(\\w+)\\s*\\)\\s*\\)`).exec(config)?.[1];
  const memRead = new RegExp(`${member}->mem_read\\(\\)\\.set\\(\\s*FUNC\\(\\s*\\w+::(\\w+)\\s*\\)\\s*\\)`).exec(config)?.[1];
  if (!irqHandler || !memRead) throw new Error(`MAME RP2A03: ${cpuClass}'s APU callbacks no longer match`);
  // apu_irq: `set_input_line(RP2A03_APU_IRQ_LINE, ...)`, the enum naming the core's line.
  const irqBody = body(cpu, new RegExp(`void\\s+\\w+::${irqHandler}\\s*\\(`), irqHandler).text;
  const irqName = /set_input_line\s*\(\s*(\w+)/.exec(irqBody)?.[1];
  const irqLine = irqName ? new RegExp(`\\b${irqName}\\s*=\\s*m6502_device::(\\w+)`).exec(cpuHeader)?.[1] : undefined;
  if (!irqLine) throw new Error(`MAME RP2A03: ${irqHandler} raises no core line`);
  // apu_read_mem: `return m_mintf->m_program.read_interruptible(offset);`.
  const readBody = body(cpu, new RegExp(`\\w+\\s+\\w+::${memRead}\\s*\\(`), memRead).text;
  if (!/m_program\s*\.\s*read/.test(readBody)) throw new Error(`MAME RP2A03: ${memRead} reads no program space`);
  // The internal map, each range a handler on the CPU class with MAME's own body.
  const map = body(cpu, /void\s+rp2a03_device::rp2a03_map\s*\(/, 'rp2a03_map');
  const ranges: GeneratedNesApuPlan['internalMap']['ranges'] = [];
  const at = (start: number) => {
    let range = ranges.find(candidate => candidate.start === start);
    return range;
  };
  for (const entry of map.text.matchAll(/map\(\s*(0x[\da-f]+)\s*,\s*(0x[\da-f]+)\s*\)\s*\.\s*(\w+)\(([\s\S]*?)\);\s*$/gim)) {
    const start = Number(entry[1]);
    const end = Number(entry[2]);
    const accessor = entry[3]!;
    const args = entry[4]!;
    const source = { file: CPU_FILE, line: lineAt(cpu, map.index + entry.index!) };
    let read: { method: string; parameters: string; body: string } | undefined;
    let write: typeof read;
    const target = /^\s*(m_\w+)\s*,\s*FUNC\(\s*\w+::(\w+)\s*\)\s*$/.exec(args);
    if (target && target[1] === member && (accessor === 'r' || accessor === 'w')) {
      const parameters = parameterList(apuHeader, target[2]!);
      const call = `${member}->${target[2]}(${argumentNames(parameters)})`;
      const handler = { method: `__map_${start.toString(16)}_${accessor}`, parameters, body: accessor === 'r' ? `return ${call};` : `${call};` };
      if (accessor === 'r') read = handler; else write = handler;
    } else if (accessor === 'lw8') {
      const lambda = /NAME\(\s*\[this\]\s*\(([^)]*)\)\s*\{([\s\S]*)\}\s*\)\s*$/.exec(args);
      if (!lambda) throw new Error(`MAME RP2A03: map ${entry[1]} lambda no longer matches`);
      write = { method: `__map_${start.toString(16)}_lw8`, parameters: lambda[1]!.trim(), body: lambda[2]!.trim() };
    } else {
      throw new Error(`MAME RP2A03: map ${entry[1]} .${accessor} is not lowered`);
    }
    const existing = at(start);
    if (existing) Object.assign(existing, read ? { read } : {}, write ? { write } : {});
    else ranges.push({ start, end, ...(read ? { read } : {}), ...(write ? { write } : {}), source });
  }
  if (!ranges.length) throw new Error('MAME RP2A03: rp2a03_map maps nothing');
  return {
    schemaVersion: 2,
    type: built[1]!,
    tag,
    member,
    cpuClass: 'rp2a03_device',
    irqLine,
    memReadSpace: 'program',
    internalMap: { ranges: ranges.sort((left, right) => left.start - right.start) },
    sourceFiles: [CPU_FILE, CPU_HEADER, APU_HEADER],
  };
}
