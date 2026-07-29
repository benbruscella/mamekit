import { compileNesHardware } from '../../mame/nes-compiler.ts';
import type { CapabilityExtraction, CapabilityInput, LoweredMethod } from '../contract.ts';
import {
  NES_COMPOSITION_ARTIFACT,
  NES_MAME_TYPES,
  NES_PLAN_ARTIFACT,
  NES_WORKLET_ARTIFACT,
} from './definition.ts';

export function extractNes(input: CapabilityInput): CapabilityExtraction | undefined {
  if (!NES_MAME_TYPES.every(type => input.entries.some(entry => entry.type === type))) {
    return undefined;
  }
  const { plan, artifacts } = compileNesHardware(input.mameSource);
  const method = (name: string, file: string): LoweredMethod => ({
    name,
    parameters: '',
    sourceFile: file,
    sourceLine: 1,
    body: '',
    program: { diagnostics: [] },
  });
  return {
    executableTypes: [...NES_MAME_TYPES],
    executable: Object.fromEntries(NES_MAME_TYPES.map(type => [
      type,
      { kind: 'composition' as const, artifact: NES_COMPOSITION_ARTIFACT },
    ])),
    artifacts: [
      { path: NES_PLAN_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      { path: 'nes/cart.ts', contents: artifacts.cart },
      { path: 'nes/ppu.ts', contents: artifacts.ppu },
      { path: 'nes/apu.ts', contents: artifacts.apu },
      { path: NES_WORKLET_ARTIFACT, contents: artifacts.worklet },
      { path: NES_COMPOSITION_ARTIFACT, contents: artifacts.board },
    ],
    entrySourceFiles: Object.fromEntries(NES_MAME_TYPES.map(type => [type, plan.sourceFiles])),
    entryMethods: {
      PPU_2C02: [
        method('read', 'src/devices/video/ppu2c0x.cpp'),
        method('write', 'src/devices/video/ppu2c0x.cpp'),
        method('render_scanline', 'src/devices/video/ppu2c0x.cpp'),
      ],
      NES_CART_SLOT: [
        method('call_load', 'src/devices/bus/nes/nes_slot.cpp'),
        method('read_h', 'src/devices/bus/nes/nes_slot.cpp'),
        method('write_h', 'src/devices/bus/nes/nes_slot.cpp'),
      ],
      NES_CONTROL_PORT: [
        method('read_bit0', 'src/devices/bus/nes_ctrl/ctrl.cpp'),
        method('write', 'src/devices/bus/nes_ctrl/ctrl.cpp'),
      ],
    },
  };
}
