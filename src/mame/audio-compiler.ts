// Audio facts the generator lowers from MAME source beside the compiled sound
// devices: the speaker's default highpass (sound.cpp's audio effect chain) and
// rescap.h's component values, which netlists and filter devices are written in.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr } from '../kg/parse.ts';
import type { GeneratedSpeakerFilterPlan } from '../ir/audio-protocol.ts';

export function compileMameSpeakerFilter(
  mameSrc: string,
): GeneratedSpeakerFilterPlan {
  const cppFile = 'src/emu/audio_effects/filter.cpp';
  const headerFile = 'src/emu/audio_effects/filter.h';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const frequencyMatch =
    /m_fh\s*=\s*d\s*\?\s*d->fh\(\)\s*:\s*([0-9.]+)\s*;/.exec(cpp);
  const qMatch =
    /DEFAULT_Q\s*=\s*([0-9.]+)f?\s*;/.exec(header);
  const enabledByDefault =
    /m_highpass_active\s*=\s*d\s*\?\s*d->highpass_active\(\)\s*:\s*true\s*;/.test(cpp);
  if (!frequencyMatch || !qMatch || !enabledByDefault) {
    throw new Error('unsupported MAME default speaker filter');
  }
  return {
    type: 'highpass',
    frequency: Number(frequencyMatch[1]),
    q: Number(qMatch[1]),
    source: {
      file: cppFile,
      line: cpp.slice(0, frequencyMatch.index).split('\n').length,
    },
  };
}

/**
 * Evaluate a MAME analogue component expression: RES_K(150), CAP_P(470) and
 * the rest of rescap.h, in ohms and farads.
 */
export function analogValue(expression: string): number {
  let normalized = expression.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').trim()
    // C's `5.` is 5.0; evalExpr only reads a fraction with its digits.
    .replace(/(\d)\.(?![\d\w])/g, '$1');
  const units: [RegExp, number][] = [
    [/RES_K\(([^()]+)\)/g, 1e3],
    [/RES_M\(([^()]+)\)/g, 1e6],
    [/CAP_U\(([^()]+)\)/g, 1e-6],
    [/CAP_N\(([^()]+)\)/g, 1e-9],
    [/CAP_P\(([^()]+)\)/g, 1e-12],
  ];
  for (const [pattern, scale] of units) {
    // evalExpr reads C-style literals and has no exponent form, so a scale
    // that only spells out in exponent notation (nano- and picofarads) has to
    // become an exact integer divisor instead. Left as `1e-12` it stopped the
    // number parser dead and every picofarad in the source evaluated to NaN.
    const factor = String(scale).includes('e')
      ? `/${Math.round(1 / scale)}`
      : `*${scale}`;
    normalized = normalized.replace(pattern, `(($1)${factor})`);
  }
  return evalExpr(normalized) ?? Number.NaN;
}
