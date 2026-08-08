import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { M68705_ARTIFACT, M68705_MAME_TYPES } from './definition.ts';

/**
 * The 68705 is a firmware-executing runtime core rather than handler IR. Keep
 * it in the same capability closure as generated devices so parent protection
 * interfaces become executable only when their real MCU child is present.
 */
export function extractM68705(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  const present = M68705_MAME_TYPES.filter(type =>
    input.entries.some(entry => entry.type === type));
  if (!present.length) return undefined;
  return {
    executableTypes: [...present],
    executable: Object.fromEntries(present.map(type => [
      type,
      // The executable is linked by the generated board runtime rather than a
      // generated per-device module, so keep the app registry from importing
      // a non-existent devices/m68705p5.ts artifact.
      { kind: 'composition' as const, artifact: M68705_ARTIFACT },
    ])),
    artifacts: [{
      path: M68705_ARTIFACT,
      contents: JSON.stringify({
        schemaVersion: 1,
        type: 'M68705P5',
        runtime: 'src/runtime/generated-m68705.ts',
        execution: 'firmware',
      }, null, 2),
    }],
  };
}
