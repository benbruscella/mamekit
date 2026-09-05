// GENERATED executable machine composition from src/mame/konami/gyruss.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gyruss');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_sh_irqtrigger_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](0, 2) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 2) ?? 0) : (runtime.calls["set_input_line"]?.(0, 2) ?? 0));
            }
            function method_scanline_r(runtime) {
                const members = runtime.members;
                return (runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0));
            }
            function method_slave_irq_mask_w(runtime, data) {
                const members = runtime.members;
                members.m_slave_irq_mask = ((((data) & (1))) & 0xff);
                if ((((members.m_slave_irq_mask ?? runtime.member("m_slave_irq_mask"))) ? 0 : 1)) {
                    (runtime.calls["m_subcpu.set_input_line"] ? runtime.calls["m_subcpu.set_input_line"](0, 0) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
                }
            }
            function method_spriteram_w(runtime, offset, data) {
                const members = runtime.members;
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data);
            }
            function method_i8039_irq_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_audiocpu_2.set_input_line"] ? runtime.calls["m_audiocpu_2.set_input_line"](0, 1) : (members.m_audiocpu_2) != null ? ((runtime.dereference(members.m_audiocpu_2)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const h_m_colorram = members.m_colorram ?? runtime.member("m_colorram");
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                let code = ((((((runtime.readIndex(h_m_colorram, tile_index)) & (32))) << (3))) | (runtime.readIndex(h_m_videoram, tile_index)));
                let color = ((runtime.readIndex(h_m_colorram, tile_index)) & (15));
                let flags = (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((runtime.readIndex(h_m_colorram, tile_index)) >>> (6))) : runtime.macro("TILE_FLIPYX", ((runtime.readIndex(h_m_colorram, tile_index)) >>> (6))));
                tileinfo.group = ((((runtime.readIndex(h_m_colorram, tile_index)) & (16))) ? (0) : (1));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](2, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(2, code, color, flags) ?? 0) : (runtime.calls["set"]?.(2, code, color, flags) ?? 0));
            }
            function method_dac_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_discrete.write"] ? runtime.calls["m_discrete.write"]((runtime.calls["NODE"] ? runtime.calls["NODE"](16) : runtime.macro("NODE", 16)), data) : (members.m_discrete) != null ? ((runtime.dereference(members.m_discrete)).write?.((runtime.calls["NODE"] ? runtime.calls["NODE"](16) : runtime.macro("NODE", 16)), data) ?? 0) : (runtime.calls["write"]?.((runtime.calls["NODE"] ? runtime.calls["NODE"](16) : runtime.macro("NODE", 16)), data) ?? 0));
            }
            function method_irq_clear_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_audiocpu_2.set_input_line"] ? runtime.calls["m_audiocpu_2.set_input_line"](0, 0) : (members.m_audiocpu_2) != null ? ((runtime.dereference(members.m_audiocpu_2)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
            }
            function method_master_nmi_mask_w(runtime, state) {
                const members = runtime.members;
                members.m_master_nmi_mask = ((state) & 0xff);
                if ((((members.m_master_nmi_mask ?? runtime.member("m_master_nmi_mask"))) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 0) ?? 0));
                }
            }
            function method_flipscreen_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen = ((state) ? 1 : 0);
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                for (let offs = 188; ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (4))) {
                    let x = runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs);
                    let y = ((241) - (runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((offs) + (3)))));
                    let gfx_bank = ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((offs) + (1)))) & (1));
                    let code = ((((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((offs) + (2)))) & (32))) << (2))) | (((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((offs) + (1)))) >>> (1))));
                    let color = ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((offs) + (2)))) & (15));
                    let flip_x = (((~runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((offs) + (2))))) & (64));
                    let flip_y = ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((offs) + (2)))) & (128));
                    ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](gfx_bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(gfx_bank) ?? 0) : (runtime.calls["gfx"]?.(gfx_bank) ?? 0)))).transpen?.(bitmap, cliprect, code, color, flip_x, flip_y, x, y, 0) ?? 0);
                }
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                if ((((state) && ((members.m_master_nmi_mask ?? runtime.member("m_master_nmi_mask")))) ? 1 : 0)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 1) ?? 0));
                }
                if ((((state) && ((members.m_slave_irq_mask ?? runtime.member("m_slave_irq_mask")))) ? 1 : 0)) {
                    (runtime.calls["m_subcpu.set_input_line"] ? runtime.calls["m_subcpu.set_input_line"](0, 1) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
                }
            }
            function method_filter_w_0(runtime, data) {
                const members = runtime.members;
                0;
                for (let i = 0; ((Number(i) < Number(3)) ? 1 : 0); i = ((i) + (1))) {
                    (runtime.calls["m_discrete.write"] ? runtime.calls["m_discrete.write"]((runtime.calls["NODE"] ? runtime.calls["NODE"](runtime.add(((((3) * (0))) + (i)), 21)) : runtime.macro("NODE", runtime.add(((((3) * (0))) + (i)), 21))), ((data) & (3))) : (members.m_discrete) != null ? ((runtime.dereference(members.m_discrete)).write?.((runtime.calls["NODE"] ? runtime.calls["NODE"](runtime.add(((((3) * (0))) + (i)), 21)) : runtime.macro("NODE", runtime.add(((((3) * (0))) + (i)), 21))), ((data) & (3))) ?? 0) : (runtime.calls["write"]?.((runtime.calls["NODE"] ? runtime.calls["NODE"](runtime.add(((((3) * (0))) + (i)), 21)) : runtime.macro("NODE", runtime.add(((((3) * (0))) + (i)), 21))), ((data) & (3))) ?? 0));
                    data = ((((data) >>> (2))) & 0xff);
                }
            }
            function method_filter_w_1(runtime, data) {
                const members = runtime.members;
                0;
                for (let i = 0; ((Number(i) < Number(3)) ? 1 : 0); i = ((i) + (1))) {
                    (runtime.calls["m_discrete.write"] ? runtime.calls["m_discrete.write"]((runtime.calls["NODE"] ? runtime.calls["NODE"](runtime.add(((((3) * (1))) + (i)), 21)) : runtime.macro("NODE", runtime.add(((((3) * (1))) + (i)), 21))), ((data) & (3))) : (members.m_discrete) != null ? ((runtime.dereference(members.m_discrete)).write?.((runtime.calls["NODE"] ? runtime.calls["NODE"](runtime.add(((((3) * (1))) + (i)), 21)) : runtime.macro("NODE", runtime.add(((((3) * (1))) + (i)), 21))), ((data) & (3))) ?? 0) : (runtime.calls["write"]?.((runtime.calls["NODE"] ? runtime.calls["NODE"](runtime.add(((((3) * (1))) + (i)), 21)) : runtime.macro("NODE", runtime.add(((((3) * (1))) + (i)), 21))), ((data) & (3))) ?? 0));
                    data = ((((data) >>> (2))) & 0xff);
                }
            }
            function method_porta_r(runtime) {
                const members = runtime.members;
                return ([0, 1, 2, 3, 4, 9, 10, 11, 10, 13][(((((runtime.divide((runtime.calls["m_audiocpu.total_cycles"] ? runtime.calls["m_audiocpu.total_cycles"]() : (members.m_audiocpu) != null ? (typeof (runtime.dereference(members.m_audiocpu)).total_cycles === 'function' ? (runtime.dereference(members.m_audiocpu)).total_cycles() : typeof (runtime.dereference(members.m_audiocpu)).total_cycles === 'number' || typeof (runtime.dereference(members.m_audiocpu)).total_cycles === 'boolean' ? (runtime.dereference(members.m_audiocpu)).total_cycles : runtime.container(members.m_audiocpu, "total_cycles")) : (runtime.calls["total_cycles"]?.() ?? 0)), 1024)) % (10))) % 10) + 10) % 10] ?? 0);
            }
            return {
                "sh_irqtrigger_w": method_sh_irqtrigger_w,
                "scanline_r": method_scanline_r,
                "slave_irq_mask_w": method_slave_irq_mask_w,
                "spriteram_w": method_spriteram_w,
                "i8039_irq_w": method_i8039_irq_w,
                "get_tile_info": method_get_tile_info,
                "dac_w": method_dac_w,
                "irq_clear_w": method_irq_clear_w,
                "master_nmi_mask_w": method_master_nmi_mask_w,
                "flipscreen_w": method_flipscreen_w,
                "draw_sprites": method_draw_sprites,
                "vblank_irq": method_vblank_irq,
                "filter_w_0": method_filter_w_0,
                "filter_w_1": method_filter_w_1,
                "porta_r": method_porta_r
            };
        })();
        return {
            "gyruss_state.sh_irqtrigger_w": methods["sh_irqtrigger_w"],
            "gyruss_state.scanline_r": methods["scanline_r"],
            "gyruss_state.slave_irq_mask_w": methods["slave_irq_mask_w"],
            "gyruss_state.spriteram_w": methods["spriteram_w"],
            "gyruss_state.i8039_irq_w": methods["i8039_irq_w"],
            "gyruss_state.get_tile_info": methods["get_tile_info"],
            "gyruss_state.dac_w": methods["dac_w"],
            "gyruss_state.irq_clear_w": methods["irq_clear_w"],
            "gyruss_state.master_nmi_mask_w": methods["master_nmi_mask_w"],
            "gyruss_state.flipscreen_w": methods["flipscreen_w"],
            "gyruss_state.draw_sprites": methods["draw_sprites"],
            "gyruss_state.vblank_irq": methods["vblank_irq"],
            "gyruss_state.filter_w_0": methods["filter_w_0"],
            "gyruss_state.filter_w_1": methods["filter_w_1"],
            "gyruss_state.porta_r": methods["porta_r"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
