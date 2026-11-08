import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { deviceDefinitionsFromSource } from '../mame/hardware.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { galaxian } from './galaxian.game.ts';
import { assertGameContract, assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(galaxian);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(galaxian);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === galaxian.machine.className &&
  node.props.name === galaxian.machine.name);
assert.ok(machine);

const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, 'Galaxian MAME video source must lower to executable video IR');
assert.deepEqual(video.plan.renderScale, { x: 3, y: 1 });
assert.equal(video.plan.initialState.m_irq_line, -1);
assert.deepEqual(video.plan.tilemaps.map(tilemap => ({
  mapper: tilemap.mapper,
  scrollColumns: tilemap.scrollColumns,
  transparentPen: tilemap.transparentPen,
})), [{ mapper: 'TILEMAP_SCAN_ROWS', scrollColumns: 32, transparentPen: 0 }]);
assertPaletteCallback(video, { handler: 'galaxian_state.galaxian_palette', entries: 32 });
assert.deepEqual(video.plan.delegates, {
  m_draw_bullet_ptr: 'galaxian_state.galaxian_draw_bullet',
  m_draw_background_ptr: 'galaxian_state.galaxian_draw_background',
  m_extend_tile_info_ptr: 'galaxian_state.empty_extend_tile_info',
  m_extend_sprite_info_ptr: 'galaxian_state.empty_extend_sprite_info',
});
// The starfield is MAME's own: video_start's stars_init clocks the 17-bit
// LFSR into m_stars, and the screen update draws each row through
// stars_draw_row, both as written.
assert.equal(video.plan.initialState.m_stars, undefined, 'no precomputed star table stands in for stars_init');
assert.ok(video.handlers.some(handler => handler.method === 'stars_draw_row' && !handler.program?.diagnostics.length));
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

const audioFile = 'src/mame/galaxian/galaxian_a.cpp';
const audioText = readFileSync(join(mameSrc, audioFile), 'utf8');
const definition = deviceDefinitionsFromSource(audioFile, audioText)
  .find(candidate => candidate.type === 'GALAXIAN_SOUND');
assert.ok(definition);
// The sound board is its MAME class compiled whole, holding the DISCRETE
// its latches write; the board's table is the DISCRETE's configuration.
const sound = compileMameDevice(mameSrc, definition);
assert.equal(sound.summary.diagnostics, 0);
assert.deepEqual(sound.children?.map(child => child.type), ['DISCRETE']);

console.log('galaxian.spec: source-derived tilemap, starfield and compiled sound board passed');
