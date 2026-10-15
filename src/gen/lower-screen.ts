

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

import { gfxRenderScale } from '../mame/video-compiler.ts';

import type { GenerateOptions } from './generate.ts';

import { Graph } from '../kg/query.ts';
import { screenOwnerUpdatesPartially } from './machine-source.ts';

export function lowerScreen(devices: KGNode[], g: Graph, machine: KGNode, graph: KnowledgeGraph, game: KGNode, opts: GenerateOptions) {
  // --- screen ------------------------------------------------------------------
  // MAME models a machine's picture with a video-output device. Raster and LCD
  // panels are SCREEN; a vector display is VECTOR, its own device since the
  // screen_device split. Arcade SCREENs use set_raw; consoles (nes.cpp) use the
  // set_refresh_hz/set_size/set_visarea trio instead; a VECTOR carries no raster
  // geometry at all -- only a frame period and a visible rectangle in beam
  // coordinates -- so its visible rectangle is the whole raster.
  const screenDev = devices.find(d => d.props.type === 'SCREEN')
    ?? devices.find(d => d.props.type === 'VECTOR');
  // A derived config may resize a screen its base created. MCR3 is the case:
  // `mcrmono` builds a 32*16-wide screen and `mcrscroll` patches it down to
  // 30*16 for Spy Hunter, so reading the creating config alone gave a 512-wide
  // picture where MAME's own -listxml reports 480. Walk the selected machine's
  // CALLS chain most-derived first and take the first patch that resizes it.
  if (screenDev) {
    const screenTag = String(screenDev.props.tag ?? '');
    const chain: KGNode[] = [];
    const seen = new Set<string>();
    const walk = (id: string): void => {
      if (seen.has(id)) return;
      seen.add(id);
      const node = g.node(id);
      if (node?.label === 'MachineConfig') chain.push(node);
      for (const called of g.out(id, 'CALLS')) walk(called.node.id);
    };
    walk(machine.id);
    for (const config of chain) {
      const patches = (config.props.devicePatches as string[] | undefined) ?? [];
      const lines = patches
        .map(raw => JSON.parse(raw) as { tag: string; config: string[] })
        .filter(patch => patch.tag === screenTag)
        .flatMap(patch => patch.config);
      const size = lines
        .map(line => /->set_size\s*\(([^,]+),([^)]+)\)/.exec(line))
        .find((match): match is RegExpExecArray => Boolean(match));
      const visarea = lines
        .map(line => /->set_visarea\s*\(([^,]+),([^,]+),([^,]+),([^)]+)\)/.exec(line))
        .find((match): match is RegExpExecArray => Boolean(match));
      // MAME writes these in beam arithmetic (`30*16-1`), never with a named
      // constant, so plain integer arithmetic settles them.
      const numbers = (match: RegExpExecArray | undefined): number[] | undefined => {
        if (!match) return undefined;
        const values = match.slice(1).map(value => {
          const text = value.trim();
          if (!/^[-+*/()\s\d]+$/.test(text)) return null;
          const result = Number(Function(`"use strict";return (${text});`)());
          return Number.isFinite(result) ? result : null;
        });
        return values.every((value): value is number => value !== null) ? values : undefined;
      };
      const sized = numbers(size);
      const visible = numbers(visarea);
      if (sized) screenDev.props.screenSize = sized;
      if (visible) screenDev.props.screenVisarea = visible;
      if (sized || visible) break;
    }
  }
  // A machine built around a video-display processor leaves its SCREEN bare
  // (coleco.cpp: `SCREEN(config, "screen")`). The graph has already asked the
  // device that claimed it, so the geometry arrives here like any other.
  const raw = screenDev?.props.screenRaw as number[] | undefined;
  let pixclock: number, htotal: number, hbend: number, hbstart: number, vtotal: number, vbend: number, vbstart: number;
  if (raw) {
    [pixclock, htotal, hbend, hbstart, vtotal, vbend, vbstart] = raw;
    // `set_raw` sets the visible rectangle as well as the timing, and a later
    // `set_visarea` replaces only the rectangle -- which is also what MAME's
    // vblank is timed from. Bump 'n' Jump inherits BurgerTime's 240-wide raw
    // screen and widens it to 256 in its own config.
    const patched = screenDev?.props.screenVisarea as number[] | undefined;
    if (patched) {
      const [x0, x1, y0, y1] = patched as [number, number, number, number];
      hbend = x0; hbstart = x1 + 1;
      vbend = y0; vbstart = y1 + 1;
    }
  } else if (screenDev?.props.screenRefreshHz && screenDev.props.screenVisarea) {
    const [x0, x1, y0, y1] = screenDev.props.screenVisarea as number[];
    // A vector device has no blanking interval, so the visible rectangle bounds
    // the raster: hbstart/vbstart land on htotal/vtotal and no line is blanked.
    const [w, h] = (screenDev.props.screenSize as number[] | undefined)
      ?? [x1 + 1, y1 + 1];
    hbend = x0; hbstart = x1 + 1;
    vbend = y0; vbstart = y1 + 1;
    htotal = w; vtotal = h;
    pixclock = Number(screenDev.props.screenRefreshHz) * htotal * vtotal;
  } else {
    throw new Error('screen raw params missing');
  }

  // the galaxian driver renders horizontally pre-scaled (GFXDECODE_SCALE
  // xscale 3, h params scaled to match); divide back to native pixels
  let xscale = gfxRenderScale(graph, machine.id);
  if (xscale === 1) {
    const screenCallback = graph.nodes.find(node =>
      node.label === 'Callback' && node.props.signal === 'set_screen_update');
    const screenHandler = graph.nodes.find(node =>
      node.label === 'Handler' &&
      node.props.ownerClass === screenCallback?.props.targetClass &&
      node.props.method === screenCallback?.props.targetMethod);
    const body = String(screenHandler?.props.sourceBody ?? '');
    const values = Object.fromEntries(
      (Array.isArray(screenHandler?.props.sourceConstants)
        ? screenHandler.props.sourceConstants
        : [])
        .map(value => /^([^=]+)=(-?(?:\d+(?:\.\d+)?|Infinity))$/.exec(String(value)))
        .filter((match): match is RegExpExecArray => Boolean(match))
        .map(match => [match[1], Number(match[2])]),
    );
    for (const [name, value] of Object.entries(values)) {
      if (
        value > 1 &&
        body.includes(`cliprect.min_x / ${name}`) &&
        body.includes(`x * ${name}`)
      ) {
        xscale = Math.max(xscale, value);
      }
    }
  }

  const monitor = String(game.props.monitor);
  const screen = {
    width: (hbstart - hbend) / xscale,
    height: vbstart - vbend,
    xOffset: hbend / xscale,
    yOffset: vbend,
    refresh: pixclock / (htotal * vtotal),
    // The whole raster, not the visible part. MAME's `screen().width()` is
    // this, and a device that allocates its own bitmap from it addresses that
    // bitmap in raster coordinates -- the TIA composites its scanlines from
    // column 34, which is inside the horizontal blank.
    htotal: htotal / xscale,
    vtotal,
    vbstart,
    vbend,
    updateMode: (screenDev?.props.screenVideoAttributes as string[] | undefined)
      ?.includes('VIDEO_UPDATE_SCANLINE')
      ? 'scanline' as const
      : graph.nodes.some(node =>
          node.label === 'Handler' &&
          String(node.props.sourceBody ?? '').includes('update_partial('))
        || screenOwnerUpdatesPartially(opts.mameSrc, graph)
        ? 'partial' as const
        : 'frame' as const,
    rotate: monitor === 'ROT90' ? 90 : monitor === 'ROT270' ? 270 : monitor === 'ROT180' ? 180 : 0,
  };

  return { screen };
}
