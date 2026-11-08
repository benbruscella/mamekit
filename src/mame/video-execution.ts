import type { BoardIr } from '../ir/board.ts';
import { hasDeviceType } from '../ir/source-shape.ts';

import type { GeneratedVideoExecution } from '../ir/video-execution.ts';

/** Resolve renderer bindings once; the browser only consumes these typed facts. */
export function lowerVideoExecution(machine: BoardIr): GeneratedVideoExecution {
  const handlers = machine.handlers ?? [];
  const key = (handler: typeof handlers[number] | undefined) => handler
    ? `${handler.ownerClass}.${handler.method}` : undefined;
  const bitmaps = new Map<string, number>();
  for (const handler of handlers) {
    for (const match of (handler.body ?? '').matchAll(/\b(m_\w*bitmap\w*)\s*(?:\[\s*(\d+)\s*\])?/g)) {
      bitmaps.set(match[1]!, Math.max(bitmaps.get(match[1]!) ?? 0,
        match[2] ? Number(match[2]) + 1 : 0));
    }
    // A member the driver allocates or registers as a bitmap is one, whatever
    // it is called: Venture's `m_motion_object_1_vid.allocate(16, 16)`.
    for (const match of (handler.body ?? '').matchAll(
      /\b(m_\w+)\s*\.\s*allocate\s*\(|register_screen_bitmap\s*\(\s*(m_\w+)\s*\)/g,
    )) {
      const member = match[1] ?? match[2]!;
      if (!bitmaps.has(member)) bitmaps.set(member, 0);
    }
  }
  return {
    bitmapMembers: [...bitmaps].map(([member, count]) => ({ member, count })),
  };
}
