import { naturalKeyboardAlternates } from './natural-keyboard.ts';
import { lowerTopology } from './lower-topology.ts';
import { lowerScreen } from './lower-screen.ts';
import { lowerSound } from './lower-sound.ts';
import { lowerRoms } from './lower-roms.ts';
import { lowerInputs } from './lower-inputs.ts';
import { lowerMedia } from './lower-media.ts';

import { basename } from 'node:path';

import type { KnowledgeGraph } from '../kg/types.ts';

import { compileMameVideo } from '../mame/video-compiler.ts';

import { compileSegaZ80RomTransform } from '../mame/sega-z80-compiler.ts';
import { compileDriverRomTransforms } from '../mame/driver-rom-compiler.ts';
import { compileDriverInitProgram } from '../mame/driver-init-compiler.ts';
import { hiscoreTable } from '../mame/hiscore-dat.ts';

import type { GenerateOptions } from './generate.ts';

import { Graph } from '../kg/query.ts';
import { sourceNvramInitializers } from './machine-source.ts';
export { sourceNvramInitializers, handlerOwnsSharedRam, sourceHandlerDataWidth } from './machine-source.ts';

export async function lowerMachine(graph: KnowledgeGraph, opts: GenerateOptions) {
  const g = new Graph(graph);
  const game = g.node(`game:${opts.game}`);
  if (!game) throw new Error(`game:${opts.game} missing from graph`);

  const machine = g.out(game.id, 'USES_MACHINE')[0]?.node;
  const romset = g.out(game.id, 'USES_ROMSET')[0]?.node;
  const inputs = g.out(game.id, 'USES_INPUTS')[0]?.node;
  if (!machine || !romset || !inputs) {
    throw new Error(`graph incomplete for ${opts.game}: machine=${!!machine} romset=${!!romset} inputs=${!!inputs}`);
  }

  // Board family selects the runtime board module. It defaults to the driver
  // file stem, but a single driver file can host several distinct boards
  // (galaga.cpp defines both galaga and digdug, with different maps/video/I/O).
  // A machine whose board differs from its file's default is remapped by name.
  const FAMILY_BY_MACHINE: Record<string, string> = {
    digdug: 'digdug',
    // MAME files the Game Boy under gb.cpp beside the Color, the Super Game
    // Boy and the Mega Duck. The console's own name is what the cartridge
    // tables and the hardware package are keyed on.
    gameboy: 'gameboy',
  };
  const family = FAMILY_BY_MACHINE[String(machine.props.name)]
    ?? basename(String(graph.meta.driverFile)).replace(/\.cpp$/, '');

  const { devices, byTag, cpus, kind, softlistNodes, category, cpuDevs, dataPath, bankDevices, ranges, io } = lowerTopology(game, g, machine, opts, family);

  const { screen } = lowerScreen(devices, g, machine, graph, game, opts);

  const { clocks, sound, nesApu } = lowerSound(byTag, devices, graph, opts, g, romset, cpus);

  const { roms } = lowerRoms(opts, g, romset, devices, graph);

  const { customs, inputLatches, bindings, dipDefaults, portSpecs, inputChangedHandlers } = lowerInputs(g, inputs, graph, opts, devices);
  // MAME's natural keyboard types through the keys' own PORT_CHARs; what it
  // types another way is MAME's charinfo table, kept to what these keys reach.
  const alternates = naturalKeyboardAlternates(opts.mameSrc, bindings);

  const { title, cart, software, cartEntries } = lowerMedia(game, kind, opts, devices, softlistNodes, category, family, g);

  // driver-init ROM byte patches (rocnrope's one-instruction fix), applied by
  // the shell after region assembly
  const romPatches = Array.isArray(game.props.romPatches)
    ? game.props.romPatches.map(s => {
        const [region, offset, value] = String(s).split(':');
        return { region, offset: Number(offset), value: Number(value) };
      })
    : undefined;
  const romTransforms = Array.isArray(game.props.romTransforms)
    ? game.props.romTransforms.map(value =>
        JSON.parse(String(value)) as Record<string, unknown>)
    : [];
  romTransforms.push(...compileDriverRomTransforms(
    opts.mameSrc,
    String(graph.meta.driverFile),
    String(game.props.cls),
    Object.fromEntries(roms.map(region => [region.region, region.size])),
    String(game.props.init ?? ''),
  ) as unknown as Record<string, unknown>[]);
  // Declarative transforms are the preferred lowering, so the executable init
  // program is only reached when nothing declarative was recovered from the
  // same function — otherwise the two would both rewrite the same region.
  if (!romPatches && !romTransforms.length) {
    const initProgram = compileDriverInitProgram(
      opts.mameSrc,
      String(graph.meta.driverFile),
      String(game.props.cls),
      String(game.props.init ?? ''),
    );
    if (initProgram) romTransforms.push(initProgram as unknown as Record<string, unknown>);
  }
  for (const [index, device] of cpuDevs.entries()) {
    const cpu = cpus[index]!;
    if (!cpu.opcode) continue;
    const transform = compileSegaZ80RomTransform(
      opts.mameSrc,
      String(device.props.type),
      String(cpu.region),
      String((cpu.opcode as { region: string }).region),
    );
    if (transform) romTransforms.push(transform as unknown as Record<string, unknown>);
  }
  const initialShares = sourceNvramInitializers(devices, opts.mameSrc);
  // The bytes the game keeps its high-score table in, from MAME's own
  // hiscore plugin data; the shell runs the plugin's logic against them
  // (runtime/machine-memory.ts). Absent when the file has no entry.
  const hiscore = hiscoreTable(opts.mameSrc, opts.game);

  const compiledVideo = compileMameVideo(graph, opts.mameSrc, machine.id, opts.game);
  if (compiledVideo?.plan.updateMode) {
    screen.updateMode = compiledVideo.plan.updateMode;
  }
  // Packed-framebuffer drivers can expose a raw pixel-clock width that is a
  // multiple of the actual RAM raster (Tutankham uses GALAXIAN_XSCALE=3 but
  // has no GFX decode entry from which the screen pass can discover it).  The
  // bitmap layout is source-proven geometry, so use it to remove that clock
  // multiplier before the shell rotates and presents the native framebuffer.
  const packedBitmap = compiledVideo?.plan.bitmap;
  if (packedBitmap) {
    const packedWidth = packedBitmap.xOffset +
      packedBitmap.bytesPerRow * (8 / (packedBitmap.bitsPerPixel ?? 1));
    if (
      Number.isInteger(packedWidth) &&
      packedWidth > 0 &&
      screen.width > packedWidth &&
      screen.width % packedWidth === 0
    ) {
      const rawScale = screen.width / packedWidth;
      screen.width = packedWidth;
      screen.xOffset /= rawScale;
    }
  }
  const config = {
    game: opts.game,
    title,
    family,
    ...(kind ? { kind } : {}),
    dataPath,
    board: {
      family,
      cpus,
      ...(bankDevices.length ? { bankDevices } : {}),
      ranges,
      ...(io ? { io } : {}),
      ...(initialShares.length ? { initialShares } : {}),
      ...(customs.length ? { customs } : {}),
      ...(inputLatches.length ? { inputLatches } : {}),
      screen,
      clocks,
      videoMode: compiledVideo?.plan.bitmap
        ? 'bitmap'
        : compiledVideo?.plan.vector
          ? 'vector'
          : 'handler',
    },
    sound,
    roms,
    ...(romPatches ? { romPatches } : {}),
    ...(romTransforms.length ? { romTransforms } : {}),
    ...(hiscore ? { hiscore } : {}),
    ...(cart ? { cart } : {}),
    ...(software ? { software } : {}),
    bindings,
    ...(alternates ? { naturalKeyboard: { alternates } } : {}),
    dipDefaults,
    ports: portSpecs,
    // no romUrl: ROMs are never fetched — the shell only accepts user drops
    // (console carts are remembered per-browser in IndexedDB via
    // runtime/cartstore.ts, by explicit user approval 2026-07-07; arcade
    // sets likewise via runtime/romstore.ts, approved 2026-09-09, #132)
    runtimeUrl: '../runtime/generated/audio/',
    menuUrl: './',
  };

  return { config, graph, game, title, family, kind, cpus, sound, screen, roms,
    bindings, dipDefaults, cart, cartEntries, software, compiledVideo, nesApu, inputChangedHandlers };
}

