/**
 * Presenting a vector display: MAMEKIT's own drawing of the beam list.
 *
 * MAME's `vector_device` is not hardware. Its screen_update hands each point
 * to the render system, which draws the lines: presentation, which MAMEKIT
 * owns (ARCHITECTURE.md section 8). What the generators put in the list is
 * generated (the DVG and AVG compile whole and write it through
 * vectorDisplay in generated-board.ts). This draws that list, the same way
 * for every vector board.
 */

import type { GeneratedRectangle } from './rectangle.ts';

interface DirectTarget {
  direct?: { pixels: Uint32Array; width: number; height: number };
  fill?(value: number): void;
}

/**
 * vector_device::screen_update as presentation: each point with an intensity
 * draws a line from the one before it, its 16.16 beam coordinates scaled
 * by the visible area's size onto the target, additively, its colour scaled by the
 * intensity MAME hands the render container as alpha. `points` holds x, y,
 * rgb and intensity per point.
 */
export function presentVectorDisplay(
  points: readonly number[],
  screen: { visible_area(): GeneratedRectangle },
  bitmap: unknown,
): number | undefined {
  const target = (bitmap as DirectTarget).direct;
  if (!target) return undefined;
  target.pixels.fill(0xff000000);
  // MAME's own arithmetic: xscale is 1 / (65536 * width) and xoffs is
  // visarea.min_x unscaled, subtracted from the 16.16 beam coordinate as
  // written, so the beam spans the render target from coordinate 0, not from
  // the visible corner. Subtracting min_x in 16.16 moved Asteroids' whole
  // picture (visarea from 522,394) off the top-left, the ship with it.
  const area = screen.visible_area();
  const xScale = target.width / (65536 * area.width());
  const yScale = target.height / (65536 * area.height());
  let lastX = 0;
  let lastY = 0;
  for (let index = 0; index + 3 < points.length; index += 4) {
    const x = Math.round((points[index]! - area.min_x) * xScale);
    const y = Math.round((points[index + 1]! - area.min_y) * yScale);
    const intensity = points[index + 3]!;
    if (intensity !== 0) {
      drawAdditiveLine(target.pixels, target.width, target.height, lastX, lastY, x, y, intensity, points[index + 2]!);
    }
    lastX = x;
    lastY = y;
  }
  return 0;
}

function drawAdditiveLine(
  pixels: Uint32Array,
  width: number,
  height: number,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  intensity: number,
  /** The beam's colour in canvas order; white when absent. */
  color = 0xffffffff,
): void {
  const redScale = (color & 0xff) / 255;
  const greenScale = ((color >>> 8) & 0xff) / 255;
  const blueScale = ((color >>> 16) & 0xff) / 255;
  const add = (x: number, y: number, level: number): void => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const index = y * width + x;
    const previous = pixels[index] ?? 0xff000000;
    const red = Math.min(255, (previous & 0xff) + Math.round(level * redScale));
    const green = Math.min(255, ((previous >>> 8) & 0xff) + Math.round(level * greenScale));
    const blue = Math.min(255, ((previous >>> 16) & 0xff) + Math.round(level * blueScale));
    pixels[index] = (0xff000000 | (blue << 16) | (green << 8) | red) >>> 0;
  };
  let x = fromX;
  let y = fromY;
  const deltaX = Math.abs(toX - fromX);
  const deltaY = Math.abs(toY - fromY);
  const stepX = fromX < toX ? 1 : -1;
  const stepY = fromY < toY ? 1 : -1;
  let error = deltaX - deltaY;
  const glow = Math.max(1, intensity >>> 3);
  for (;;) {
    add(x, y, intensity);
    add(x - 1, y, glow);
    add(x + 1, y, glow);
    add(x, y - 1, glow);
    add(x, y + 1, glow);
    if (x === toX && y === toY) break;
    const twice = error * 2;
    if (twice > -deltaY) {
      error -= deltaY;
      x += stepX;
    }
    if (twice < deltaX) {
      error += deltaX;
      y += stepY;
    }
  }
}
