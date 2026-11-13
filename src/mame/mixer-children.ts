// A device's mixer children, read from its MAME source.
//
// A device_mixer_interface device mixes what its own children route into it
// (`m_apu->add_route(ALL_OUTPUTS, *this, 1.0, 0)` in the RP2A03's
// device_add_mconfig), and its owner routes the mix on (`maincpu.add_route(
// ALL_OUTPUTS, "mono", 0.90)`). The child is built by the device itself, below
// its tag (`maincpu:nesapu`), so the board's sound plan names it there and
// gives it the device's own route at the child's gain.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MameAstIndex, parseMameAst } from './ast.ts';
import { indexMameHardware } from './hardware.ts';

export interface MixerChild {
  /** The child's finder member (`m_apu`). */
  member: string;
  /** Its MAME device type (`NES_APU`). */
  type: string;
  /** Its tag below the device, as the finder names it (`nesapu`). */
  tag: string;
  /** The route's gain into the device. */
  gain: number;
}

const CACHE = new Map<string, MixerChild[]>();

/** The children `type`'s device_add_mconfig routes into the device itself. */
export function mixerChildren(mameSrc: string, type: string): MixerChild[] {
  const key = `${mameSrc}\0${type}`;
  const cached = CACHE.get(key);
  if (cached) return cached;
  const found = readMixerChildren(mameSrc, type);
  CACHE.set(key, found);
  return found;
}

function readMixerChildren(mameSrc: string, type: string): MixerChild[] {
  const definition = indexMameHardware(mameSrc).get(type);
  if (!definition) return [];
  const files = [definition.sourceFile, definition.sourceFile.replace(/\.cpp$/, '.h')]
    .filter(file => existsSync(join(mameSrc, file)));
  const sources = files.map(file => ({ file, source: readFileSync(join(mameSrc, file), 'utf8') }));
  const ast = new MameAstIndex(parseMameAst(sources));
  const mconfig = ast.findFunctionInHierarchy(definition.className, 'device_add_mconfig')?.body;
  if (!mconfig) return [];
  const all = sources.map(({ source }) => source).join('\n');
  const children: MixerChild[] = [];
  for (const created of mconfig.matchAll(/\b([A-Z][A-Z0-9_]{2,})\s*\(\s*config\s*,\s*(m_\w+)\b/g)) {
    const [, childType, member] = created;
    const route = new RegExp(String.raw`\b${member}\s*->\s*add_route\s*\(\s*\w+\s*,\s*\*\s*this\s*,\s*([\d.]+)`).exec(mconfig);
    if (!route) continue;
    const tag = new RegExp(String.raw`\b${member}\s*\(\s*\*\s*this\s*,\s*"([^"]+)"`).exec(all)?.[1];
    if (!tag) continue;
    children.push({ member: member!, type: childType!, tag, gain: Number(route[1]) });
  }
  return children;
}
