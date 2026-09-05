// GENERATED executable machine composition from src/mame/sega/system1.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'upndown');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_paletteram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                (runtime.calls["m_palette.set_pen_indirect"] ? runtime.calls["m_palette.set_pen_indirect"](offset, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset)) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_indirect?.(offset, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset)) ?? 0) : (runtime.calls["set_pen_indirect"]?.(offset, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset)) ?? 0));
            }
            function method_videoram_r(runtime, offset) {
                const members = runtime.members;
                const h_m_maincpu = members.m_maincpu ?? runtime.member("m_maincpu");
                if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    (runtime.overrides["videoram_wait_states"] ? runtime.overrides["videoram_wait_states"](h_m_maincpu) : method_videoram_wait_states(runtime, h_m_maincpu));
                }
                offset = ((offset) | (((4096) * ((((((members.m_videoram_bank ?? runtime.member("m_videoram_bank"))) >>> (1))) % (runtime.divide((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages")), 2)))))));
                return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
            }
            function method_videoram_wait_states(runtime, cpu) {
                const members = runtime.members;
                let cpu_cycles_per_fixst = ((32) >>> 0);
                let fixst_offset = ((runtime.divide(cpu_cycles_per_fixst, 2)) >>> 0);
                let total_cycles = (((runtime.calls["cpu.total_cycles"] ? runtime.calls["cpu.total_cycles"]() : (cpu) != null ? (typeof (runtime.dereference(cpu)).total_cycles === 'function' ? (runtime.dereference(cpu)).total_cycles() : typeof (runtime.dereference(cpu)).total_cycles === 'number' || typeof (runtime.dereference(cpu)).total_cycles === 'boolean' ? (runtime.dereference(cpu)).total_cycles : runtime.container(cpu, "total_cycles")) : (runtime.calls["total_cycles"]?.() ?? 0))) * (10));
                let cycles_until_next_fixst = ((((cpu_cycles_per_fixst) - (((((total_cycles) - (fixst_offset))) % (cpu_cycles_per_fixst))))) >>> 0);
                (runtime.calls["cpu.adjust_icount"] ? runtime.calls["cpu.adjust_icount"]((-runtime.divide(((cycles_until_next_fixst) + (5)), 10))) : (cpu) != null ? ((runtime.dereference(cpu)).adjust_icount?.((-runtime.divide(((cycles_until_next_fixst) + (5)), 10))) ?? 0) : (runtime.calls["adjust_icount"]?.((-runtime.divide(((cycles_until_next_fixst) + (5)), 10))) ?? 0));
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const h_m_maincpu = members.m_maincpu ?? runtime.member("m_maincpu");
                (runtime.overrides["videoram_wait_states"] ? runtime.overrides["videoram_wait_states"](h_m_maincpu) : method_videoram_wait_states(runtime, h_m_maincpu));
                offset = ((offset) | (((4096) * ((((((members.m_videoram_bank ?? runtime.member("m_videoram_bank"))) >>> (1))) % (runtime.divide((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages")), 2)))))));
                if ((((((((((((Number((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages"))) > Number(2)) ? 1 : 0)) && (((Number(offset) >= Number(1856)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) < Number(1864)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) % (2))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                }
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                ((runtime.dereference(runtime.readIndex((members.m_tilemap_page ?? runtime.member("m_tilemap_page")), runtime.divide(offset, 2048)))).mark_tile_dirty?.(runtime.divide(((offset) % (2048)), 2)) ?? 0);
            }
            function method_mixer_collision_r(runtime, offset) {
                const members = runtime.members;
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                return ((((runtime.readIndex((members.m_mix_collide ?? runtime.member("m_mix_collide")), ((offset) & (63)))) | (126))) | ((((members.m_mix_collide_summary ?? runtime.member("m_mix_collide_summary"))) << (7))));
            }
            function method_mixer_collision_w(runtime, offset, data) {
                const members = runtime.members;
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                runtime.writeIndex(runtime.writableMember("m_mix_collide"), ((offset) & (63)), 0);
            }
            function method_mixer_collision_reset_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                members.m_mix_collide_summary = ((0) & 0xff);
            }
            function method_sprite_collision_r(runtime, offset) {
                const members = runtime.members;
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                return ((((runtime.readIndex((members.m_sprite_collide ?? runtime.member("m_sprite_collide")), ((offset) & (1023)))) | (126))) | ((((members.m_sprite_collide_summary ?? runtime.member("m_sprite_collide_summary"))) << (7))));
            }
            function method_sprite_collision_w(runtime, offset, data) {
                const members = runtime.members;
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                runtime.writeIndex(runtime.writableMember("m_sprite_collide"), ((offset) & (1023)), 0);
            }
            function method_sprite_collision_reset_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                members.m_sprite_collide_summary = ((0) & 0xff);
            }
            function method_tile_get_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let rambase = (runtime.calls["tilemap.user_data"] ? runtime.calls["tilemap.user_data"]() : (tilemap) != null ? (typeof (runtime.dereference(tilemap)).user_data === 'function' ? (runtime.dereference(tilemap)).user_data() : typeof (runtime.dereference(tilemap)).user_data === 'number' || typeof (runtime.dereference(tilemap)).user_data === 'boolean' ? (runtime.dereference(tilemap)).user_data : runtime.container(tilemap, "user_data")) : (runtime.calls["user_data"]?.() ?? 0));
                let tiledata = ((((runtime.readIndex(rambase, runtime.add(((tile_index) * (2)), 0))) | (((runtime.readIndex(rambase, runtime.add(((tile_index) * (2)), 1))) << (8))))) >>> 0);
                let code = ((((((((tiledata) >>> (4))) & (2048))) | (((tiledata) & (2047))))) >>> 0);
                let color = ((((((tiledata) >>> (5))) & (255))) >>> 0);
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (runtime.calls["set"]?.(0, code, color, 0) ?? 0));
            }
            function method_adjust_cycles(runtime, data) {
                const members = runtime.members;
                members.m_adjust_cycles = ((((runtime.add((members.m_adjust_cycles ?? runtime.member("m_adjust_cycles")), 2)) % (5))) & 0xff);
                if (((Number((members.m_adjust_cycles ?? runtime.member("m_adjust_cycles"))) <= Number(1)) ? 1 : 0)) {
                    (runtime.calls["m_maincpu.adjust_icount"] ? runtime.calls["m_maincpu.adjust_icount"]((-1)) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).adjust_icount?.((-1)) ?? 0) : (runtime.calls["adjust_icount"]?.((-1)) ?? 0));
                }
            }
            function method_soundirq_gen(runtime, param) {
                const members = runtime.members;
                (runtime.calls["m_soundcpu.set_input_line"] ? runtime.calls["m_soundcpu.set_input_line"](0, 2) : (members.m_soundcpu) != null ? ((runtime.dereference(members.m_soundcpu)).set_input_line?.(0, 2) ?? 0) : (runtime.calls["set_input_line"]?.(0, 2) ?? 0));
            }
            function method_common_videomode_w(runtime, data) {
                const members = runtime.members;
                members.m_video_mode = ((data) & 0xff);
                (runtime.calls["flip_screen_set"] ? runtime.calls["flip_screen_set"](((data) & (128))) : runtime.macro("flip_screen_set", ((data) & (128))));
            }
            function method_videoram_bank_w(runtime, data) {
                const members = runtime.members;
                members.m_videoram_bank = ((data) & 0xff);
            }
            return {
                "paletteram_w": method_paletteram_w,
                "videoram_r": method_videoram_r,
                "videoram_wait_states": method_videoram_wait_states,
                "videoram_w": method_videoram_w,
                "mixer_collision_r": method_mixer_collision_r,
                "mixer_collision_w": method_mixer_collision_w,
                "mixer_collision_reset_w": method_mixer_collision_reset_w,
                "sprite_collision_r": method_sprite_collision_r,
                "sprite_collision_w": method_sprite_collision_w,
                "sprite_collision_reset_w": method_sprite_collision_reset_w,
                "tile_get_info": method_tile_get_info,
                "adjust_cycles": method_adjust_cycles,
                "soundirq_gen": method_soundirq_gen,
                "common_videomode_w": method_common_videomode_w,
                "videoram_bank_w": method_videoram_bank_w
            };
        })();
        return {
            "system1_state.paletteram_w": methods["paletteram_w"],
            "system1_state.videoram_r": methods["videoram_r"],
            "system1_state.videoram_wait_states": methods["videoram_wait_states"],
            "system1_state.videoram_w": methods["videoram_w"],
            "system1_state.mixer_collision_r": methods["mixer_collision_r"],
            "system1_state.mixer_collision_w": methods["mixer_collision_w"],
            "system1_state.mixer_collision_reset_w": methods["mixer_collision_reset_w"],
            "system1_state.sprite_collision_r": methods["sprite_collision_r"],
            "system1_state.sprite_collision_w": methods["sprite_collision_w"],
            "system1_state.sprite_collision_reset_w": methods["sprite_collision_reset_w"],
            "system1_state.tile_get_info": methods["tile_get_info"],
            "system1_state.adjust_cycles": methods["adjust_cycles"],
            "system1_state.soundirq_gen": methods["soundirq_gen"],
            "system1_state.common_videomode_w": methods["common_videomode_w"],
            "system1_state.videoram_bank_w": methods["videoram_bank_w"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
