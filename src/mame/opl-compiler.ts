import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MameHardwareDefinition } from './hardware.ts';

const YMFM_ROOT = '3rdparty/ymfm/src';
const OPL_HEADER = `${YMFM_ROOT}/ymfm_opl.h`;
const OPL_SOURCE = `${YMFM_ROOT}/ymfm_opl.cpp`;
const FM_HEADER = `${YMFM_ROOT}/ymfm_fm.h`;

export interface GeneratedYm3526Plan {
  schemaVersion: 1;
  type: 'YM3526';
  className: string;
  channels: number;
  operators: number;
  registers: number;
  waveformLength: number;
  sampleRateDivider: number;
  operatorMap: [number, number][];
  operatorOffsets: number[];
  multiples: number[];
  sourceFiles: string[];
  source: { file: string; line: number };
}

/**
 * Lower the fixed YM3526/OPL geometry selected by ymfm's
 * `opl_registers_base<1>` specialization.
 */
export function compileYm3526(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedYm3526Plan {
  const header = readFileSync(join(mameSrc, OPL_HEADER), 'utf8');
  const source = readFileSync(join(mameSrc, OPL_SOURCE), 'utf8');
  const fmHeader = readFileSync(join(mameSrc, FM_HEADER), 'utf8');
  const fixed = /if\s*\(\s*Revision\s*<=\s*2\s*\)[\s\S]*?s_fixed_map\s*=\s*\{\s*\{([\s\S]*?)\}\s*\}/
    .exec(source)?.[1];
  const operatorMap = [...(fixed ?? '').matchAll(/operator_list\(\s*(\d+)\s*,\s*(\d+)\s*\)/g)]
    .map(match => [Number(match[1]), Number(match[2])] as [number, number]);
  const opl1Value = (name: string): number => {
    const match = new RegExp(
      `static\\s+constexpr\\s+uint32_t\\s+${name}\\s*=\\s*` +
      `IsOpl3Plus\\s*\\?\\s*(?:0x[\\da-f]+|\\d+)\\s*:\\s*(0x[\\da-f]+|\\d+)`,
      'i',
    ).exec(header);
    if (!match) throw new Error(`YM3526: ymfm is missing ${name}`);
    return Number(match[1]);
  };
  const waveformLength = Number(
    /WAVEFORM_LENGTH\s*=\s*(0x[\da-f]+|\d+)/i.exec(fmHeader)?.[1],
  );
  if (operatorMap.length !== 9 || !waveformLength) {
    throw new Error('YM3526: ymfm fixed operator map did not lower');
  }
  const channels = opl1Value('CHANNELS');
  const operators = channels * 2;
  const prescale = Number(
    /DEFAULT_PRESCALE\s*=\s*IsOpl4Plus\s*\?\s*\d+\s*:\s*\(IsOpl3Plus\s*\?\s*\d+\s*:\s*(\d+)\)/
      .exec(header)?.[1],
  );
  if (!prescale) throw new Error('YM3526: ymfm default prescale did not lower');
  return {
    schemaVersion: 1,
    type: 'YM3526',
    className: definition.className,
    channels,
    operators,
    registers: opl1Value('REGISTERS'),
    waveformLength,
    sampleRateDivider: prescale * operators,
    operatorMap,
    operatorOffsets: Array.from(
      { length: operators },
      (_, operator) => operator + 2 * Math.floor(operator / 6),
    ),
    // `((multiple & 0xe) | bitfield(0xc2aa, multiple))`, then x.1 -> x1.
    multiples: Array.from({ length: 16 }, (_, multiple) => {
      const encoded = (multiple & 0xe) | ((0xc2aa >>> multiple) & 1);
      return encoded === 0 ? 0.5 : encoded;
    }),
    sourceFiles: [definition.sourceFile, OPL_HEADER, OPL_SOURCE, FM_HEADER],
    source: {
      file: OPL_SOURCE,
      line: source.slice(0, source.indexOf('void opl_registers_base<Revision>::operator_map'))
        .split('\n').length,
    },
  };
}
