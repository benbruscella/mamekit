// GENERATED executable machine composition from src/mame/capcom/cps1.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'sf2');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_irqack_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 0) ?? 0) : 0);
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](2, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(2, 0) ?? 0) : 0);
                }
                return (__l["m68000_base_device::autovector"] ? __l["m68000_base_device::autovector"](((offset) + (1))) : runtime.macro("m68000_base_device::autovector", ((offset) + (1))));
            }
            function method_cps1_dsw_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_io_in = members.m_io_in ?? runtime.member("m_io_in");
                const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
                let $in = ((255) | 0);
                switch (offset) {
                    case 0:
                        {
                            $in = (((__l["m_io_in[0].read"] ? __l["m_io_in[0].read"]() : (runtime.readIndex(h_m_io_in, 0)) != null ? (typeof (runtime.dereference(runtime.readIndex(h_m_io_in, 0))).read === 'function' ? (runtime.dereference(runtime.readIndex(h_m_io_in, 0))).read() : typeof (runtime.dereference(runtime.readIndex(h_m_io_in, 0))).read === 'number' || typeof (runtime.dereference(runtime.readIndex(h_m_io_in, 0))).read === 'boolean' ? (runtime.dereference(runtime.readIndex(h_m_io_in, 0))).read : runtime.container(runtime.readIndex(h_m_io_in, 0), "read")) : (__l["read"]?.() ?? 0))) | 0);
                            break;
                        }
                    case 1:
                    case 2:
                    case 3:
                        {
                            $in = ((((runtime.dereference(runtime.readIndex(h_m_dsw, ((offset) - (1))))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, ((offset) - (1))), "read"))) | 0);
                            break;
                        }
                }
                return (((($in) << (8))) | (255));
            }
            function method_cps1_cps_a_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((runtime.combineData(runtime.addressOf((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), offset), data, mem_mask)) & 0xffff);
                if (((Number(offset) === Number(5)) ? 1 : 0)) {
                    (runtime.overrides["cps1_build_palette"] ? runtime.overrides["cps1_build_palette"]((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](5, (members.m_palette_align ?? runtime.member("m_palette_align"))) : method_cps1_base(runtime, 5, (members.m_palette_align ?? runtime.member("m_palette_align"))))) : method_cps1_build_palette(runtime, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](5, (members.m_palette_align ?? runtime.member("m_palette_align"))) : method_cps1_base(runtime, 5, (members.m_palette_align ?? runtime.member("m_palette_align"))))));
                }
            }
            function method_cps1_build_palette(runtime, palette_base) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_game_config = members.m_game_config ?? runtime.member("m_game_config");
                let palette_ram = palette_base;
                let ctrl = ((runtime.readIndex((members.m_cps_b_regs ?? runtime.member("m_cps_b_regs")), runtime.divide(h_m_game_config.palette_control, 2))) & 0xffff);
                for (let page = ((0) | 0); ((Number(page) < Number(6)) ? 1 : 0); page = ((((page) + (1))) | 0)) {
                    if ((((ctrl) >>> (page)) & 1)) {
                        for (let offset = ((0) | 0); ((Number(offset) < Number(512)) ? 1 : 0); offset = ((((offset) + (1))) | 0)) {
                            let palette = ((runtime.dereference((() => { const previous = palette_ram; palette_ram = ({ ...(palette_ram), offset: ((palette_ram).offset + (1)) }); return previous; })())) & 0xffff);
                            let bright = ((runtime.add(15, ((((palette) >>> (12))) << (1)))) | 0);
                            let r = ((runtime.divide(((((((((palette) >>> (8))) & (15))) * (17))) * (bright)), 45)) | 0);
                            let g = ((runtime.divide(((((((((palette) >>> (4))) & (15))) * (17))) * (bright)), 45)) | 0);
                            let b = ((runtime.divide(((((((((palette) >>> (0))) & (15))) * (17))) * (bright)), 45)) | 0);
                            (__l["m_palette.set_pen_color"] ? __l["m_palette.set_pen_color"](((((512) * (page))) + (offset)), (__l["rgb_t"] ? __l["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(((((512) * (page))) + (offset)), (__l["rgb_t"] ? __l["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b))) ?? 0) : 0);
                        }
                    }
                    else {
                        if ((runtime.same(palette_ram, palette_base) ? 0 : 1)) {
                            palette_ram = ({ ...(palette_ram), offset: ((palette_ram).offset + (512)) });
                        }
                    }
                }
            }
            function method_cps1_base(runtime, offset, boundary) {
                const members = runtime.members;
                const h_m_gfxram = members.m_gfxram ?? runtime.member("m_gfxram");
                let base = ((((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), offset)) * (256))) | 0);
                base = ((runtime.andAssign(base, (~((boundary) - (1))))) | 0);
                return runtime.addressOf(h_m_gfxram, runtime.divide(((base) & (262143)), 2));
            }
            function method_cps1_gfxram_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_gfxram = members.m_gfxram ?? runtime.member("m_gfxram");
                let page = ((((((offset) >>> (7))) & (960))) | 0);
                runtime.combineData(runtime.addressOf(h_m_gfxram, offset), data, mem_mask);
                if (((Number(page) === Number(((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 1)) & (960)))) ? 1 : 0)) {
                    (__l["m_bg_tilemap[0].mark_tile_dirty"] ? __l["m_bg_tilemap[0].mark_tile_dirty"](((runtime.divide(offset, 2)) & (4095))) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0))).mark_tile_dirty?.(((runtime.divide(offset, 2)) & (4095))) ?? 0) : (__l["mark_tile_dirty"]?.(((runtime.divide(offset, 2)) & (4095))) ?? 0));
                }
                if (((Number(page) === Number(((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 2)) & (960)))) ? 1 : 0)) {
                    (__l["m_bg_tilemap[1].mark_tile_dirty"] ? __l["m_bg_tilemap[1].mark_tile_dirty"](((runtime.divide(offset, 2)) & (4095))) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1))).mark_tile_dirty?.(((runtime.divide(offset, 2)) & (4095))) ?? 0) : (__l["mark_tile_dirty"]?.(((runtime.divide(offset, 2)) & (4095))) ?? 0));
                }
                if (((Number(page) === Number(((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 3)) & (960)))) ? 1 : 0)) {
                    (__l["m_bg_tilemap[2].mark_tile_dirty"] ? __l["m_bg_tilemap[2].mark_tile_dirty"](((runtime.divide(offset, 2)) & (4095))) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2))).mark_tile_dirty?.(((runtime.divide(offset, 2)) & (4095))) ?? 0) : (__l["mark_tile_dirty"]?.(((runtime.divide(offset, 2)) & (4095))) ?? 0));
                }
            }
            function method_cps1_snd_bankswitch_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_audiobank.set_entry"] ? __l["m_audiobank.set_entry"]((((data) >>> (0)) & 1)) : (members.m_audiobank) != null ? ((runtime.dereference(members.m_audiobank)).set_entry?.((((data) >>> (0)) & 1)) ?? 0) : (__l["set_entry"]?.((((data) >>> (0)) & 1)) ?? 0));
            }
            function method_cps1_oki_pin7_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_oki.set_pin7"] ? __l["m_oki.set_pin7"]((((data) >>> (0)) & 1)) : (members.m_oki) != null ? ((runtime.dereference(members.m_oki)).set_pin7?.((((data) >>> (0)) & 1)) ?? 0) : 0);
            }
            function method_get_tile0_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_empty_tile = members.m_empty_tile ?? runtime.member("m_empty_tile");
                let code = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0), ((2) * (tile_index)))) | 0);
                let attr = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0), runtime.add(((2) * (tile_index)), 1))) & 0xffff);
                code = (((runtime.overrides["gfxrom_bank_mapper"] ? runtime.overrides["gfxrom_bank_mapper"](2, code) : method_gfxrom_bank_mapper(runtime, 2, code))) | 0);
                let gfxset = (((((tile_index) >>> (5)) & 1)) & 0xff);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](gfxset, code, runtime.add(((attr) & (31)), 32), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(gfxset, code, runtime.add(((attr) & (31)), 32), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) ?? 0) : (__l["set"]?.(gfxset, code, runtime.add(((attr) & (31)), 32), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) ?? 0));
                tileinfo.group = ((((attr) & (384))) >>> (7));
                if (((Number(code) === Number(-1)) ? 1 : 0)) {
                    tileinfo.pen_data = h_m_empty_tile;
                }
            }
            function method_gfxrom_bank_mapper(runtime, type, code) {
                const members = runtime.members;
                const h_m_game_config = members.m_game_config ?? runtime.member("m_game_config");
                let range = h_m_game_config.bank_mapper;
                let shift = ((0) | 0);
                0;
                switch (type) {
                    case 1:
                        {
                            shift = ((1) | 0);
                            break;
                        }
                    case 2:
                        {
                            shift = ((0) | 0);
                            break;
                        }
                    case 4:
                        {
                            shift = ((1) | 0);
                            break;
                        }
                    case 8:
                        {
                            shift = ((3) | 0);
                            break;
                        }
                }
                code = ((((code) << (shift))) | 0);
                while (range.type) {
                    if ((((((Number(code) >= Number(range.start)) ? 1 : 0)) && (((Number(code) <= Number(range.end)) ? 1 : 0))) ? 1 : 0)) {
                        if (((range.type) & (type))) {
                            let base = ((0) | 0);
                            for (let i = ((0) | 0); ((Number(i) < Number(range.bank)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                base = ((((base) + (runtime.readIndex(h_m_game_config.bank_sizes, i)))) | 0);
                            }
                            return ((((base) + (((code) & (((runtime.readIndex(h_m_game_config.bank_sizes, range.bank)) - (1))))))) >>> (shift));
                        }
                    }
                    range = ({ ...(range), offset: ((range).offset + (1)) });
                }
                return -1;
            }
            function method_tilemap0_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                return runtime.add(runtime.add(((row) & (31)), ((((col) & (63))) << (5))), ((((row) & (32))) << (6)));
            }
            function method_get_tile1_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_empty_tile = members.m_empty_tile ?? runtime.member("m_empty_tile");
                let code = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1), ((2) * (tile_index)))) | 0);
                let attr = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1), runtime.add(((2) * (tile_index)), 1))) & 0xffff);
                code = (((runtime.overrides["gfxrom_bank_mapper"] ? runtime.overrides["gfxrom_bank_mapper"](4, code) : method_gfxrom_bank_mapper(runtime, 4, code))) | 0);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](2, code, runtime.add(((attr) & (31)), 64), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(2, code, runtime.add(((attr) & (31)), 64), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) ?? 0) : (__l["set"]?.(2, code, runtime.add(((attr) & (31)), 64), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) ?? 0));
                tileinfo.group = ((((attr) & (384))) >>> (7));
                if (((Number(code) === Number(-1)) ? 1 : 0)) {
                    tileinfo.pen_data = h_m_empty_tile;
                }
            }
            function method_tilemap1_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                return runtime.add(runtime.add(((row) & (15)), ((((col) & (63))) << (4))), ((((row) & (48))) << (6)));
            }
            function method_get_tile2_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_empty_tile = members.m_empty_tile ?? runtime.member("m_empty_tile");
                let code = ((((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 2), ((2) * (tile_index)))) & (16383))) | 0);
                let attr = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 2), runtime.add(((2) * (tile_index)), 1))) & 0xffff);
                code = (((runtime.overrides["gfxrom_bank_mapper"] ? runtime.overrides["gfxrom_bank_mapper"](8, code) : method_gfxrom_bank_mapper(runtime, 8, code))) | 0);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](3, code, runtime.add(((attr) & (31)), 96), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(3, code, runtime.add(((attr) & (31)), 96), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) ?? 0) : (__l["set"]?.(3, code, runtime.add(((attr) & (31)), 96), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((attr) & (96))) >>> (5))))) ?? 0));
                tileinfo.group = ((((attr) & (384))) >>> (7));
                if (((Number(code) === Number(-1)) ? 1 : 0)) {
                    tileinfo.pen_data = h_m_empty_tile;
                }
            }
            function method_tilemap2_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                return runtime.add(runtime.add(((row) & (7)), ((((col) & (63))) << (3))), ((((row) & (56))) << (6)));
            }
            function method_cps1_interrupt(runtime, device) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                ((runtime.dereference((__l["device.execute"] ? __l["device.execute"]() : (device) != null ? (typeof (runtime.dereference(device)).execute === 'function' ? (runtime.dereference(device)).execute() : typeof (runtime.dereference(device)).execute === 'number' || typeof (runtime.dereference(device)).execute === 'boolean' ? (runtime.dereference(device)).execute : runtime.container(device, "execute")) : (__l["execute"]?.() ?? 0)))).set_input_line?.(1, 1) ?? 0);
            }
            function method_cps1_get_video_base(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_game_config = members.m_game_config ?? runtime.member("m_game_config");
                let scroll1xoff = ((0) | 0);
                let scroll2xoff = ((0) | 0);
                let scroll3xoff = ((0) | 0);
                if (((Number(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0)) !== Number((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](1, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 1, (members.m_scroll_size ?? runtime.member("m_scroll_size")))))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_scroll"), 0, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](1, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 1, (members.m_scroll_size ?? runtime.member("m_scroll_size")))));
                    (__l["m_bg_tilemap[0].mark_all_dirty"] ? __l["m_bg_tilemap[0].mark_all_dirty"]() : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0)) != null ? (typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0))).mark_all_dirty === 'function' ? (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0))).mark_all_dirty() : typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0))).mark_all_dirty === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0))).mark_all_dirty === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0))).mark_all_dirty : runtime.container(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0), "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
                }
                if (((Number(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1)) !== Number((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](2, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 2, (members.m_scroll_size ?? runtime.member("m_scroll_size")))))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_scroll"), 1, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](2, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 2, (members.m_scroll_size ?? runtime.member("m_scroll_size")))));
                    (__l["m_bg_tilemap[1].mark_all_dirty"] ? __l["m_bg_tilemap[1].mark_all_dirty"]() : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1)) != null ? (typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1))).mark_all_dirty === 'function' ? (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1))).mark_all_dirty() : typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1))).mark_all_dirty === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1))).mark_all_dirty === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1))).mark_all_dirty : runtime.container(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1), "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
                }
                if (((Number(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 2)) !== Number((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](3, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 3, (members.m_scroll_size ?? runtime.member("m_scroll_size")))))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_scroll"), 2, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](3, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 3, (members.m_scroll_size ?? runtime.member("m_scroll_size")))));
                    (__l["m_bg_tilemap[2].mark_all_dirty"] ? __l["m_bg_tilemap[2].mark_all_dirty"]() : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2)) != null ? (typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2))).mark_all_dirty === 'function' ? (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2))).mark_all_dirty() : typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2))).mark_all_dirty === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2))).mark_all_dirty === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2))).mark_all_dirty : runtime.container(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2), "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
                }
                let kludge = ((((h_m_game_config.bootleg_kludge) & (15))) & 0xff);
                if (((Number(kludge) === Number(1)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 0, 37120);
                    scroll1xoff = ((-12) | 0);
                    scroll2xoff = ((-14) | 0);
                    scroll3xoff = ((-16) | 0);
                }
                else {
                    if (((Number(kludge) === Number(14)) ? 1 : 0)) {
                        scroll1xoff = ((65466) | 0);
                        scroll2xoff = ((65472) | 0);
                        scroll3xoff = ((65466) | 0);
                    }
                    else {
                        if (((Number(kludge) === Number(15)) ? 1 : 0)) {
                            scroll1xoff = ((65472) | 0);
                            scroll2xoff = ((65472) | 0);
                            scroll3xoff = ((65472) | 0);
                        }
                        else {
                            if (((Number(kludge) === Number(2)) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 0, 37120);
                                scroll1xoff = ((-16) | 0);
                                scroll2xoff = ((-16) | 0);
                                scroll3xoff = ((-16) | 0);
                            }
                            else {
                                if (((Number(kludge) === Number(3)) ? 1 : 0)) {
                                    scroll1xoff = ((-8) | 0);
                                    scroll2xoff = ((-11) | 0);
                                    scroll3xoff = ((-12) | 0);
                                }
                                else {
                                    if (((Number(h_m_game_config.bootleg_kludge) === Number(136)) ? 1 : 0)) {
                                        scroll1xoff = ((4) | 0);
                                        scroll2xoff = ((6) | 0);
                                        scroll3xoff = ((10) | 0);
                                        runtime.writeIndex(runtime.writableMember("m_cps_b_regs"), runtime.divide(48, 2), 63);
                                        runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 17, 62);
                                        runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 2, 37056);
                                        runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 3, 37120);
                                        runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 5, 37184);
                                    }
                                }
                            }
                        }
                    }
                }
                members.m_obj = (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](0, (members.m_obj_size ?? runtime.member("m_obj_size"))) : method_cps1_base(runtime, 0, (members.m_obj_size ?? runtime.member("m_obj_size"))));
                members.m_other = (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](4, (members.m_other_size ?? runtime.member("m_other_size"))) : method_cps1_base(runtime, 4, (members.m_other_size ?? runtime.member("m_other_size"))));
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 0, ((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 6)) + (scroll1xoff)));
                runtime.writeIndex(runtime.writableMember("m_scrolly"), 0, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 7));
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 1, ((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 8)) + (scroll2xoff)));
                runtime.writeIndex(runtime.writableMember("m_scrolly"), 1, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 9));
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 2, ((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 10)) + (scroll3xoff)));
                runtime.writeIndex(runtime.writableMember("m_scrolly"), 2, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 11));
                runtime.writeIndex(runtime.writableMember("m_starsx"), 0, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 12));
                runtime.writeIndex(runtime.writableMember("m_starsy"), 0, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 13));
                runtime.writeIndex(runtime.writableMember("m_starsx"), 1, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 14));
                runtime.writeIndex(runtime.writableMember("m_starsy"), 1, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 15));
                let layercontrol = ((runtime.readIndex((members.m_cps_b_regs ?? runtime.member("m_cps_b_regs")), runtime.divide(h_m_game_config.layer_control, 2))) & 0xffff);
                let videocontrol = ((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 17)) & 0xffff);
                (__l["m_bg_tilemap[0].enable"] ? __l["m_bg_tilemap[0].enable"](((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 0)))) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0))).enable?.(((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 0)))) ?? 0) : (__l["enable"]?.(((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 0)))) ?? 0));
                (__l["m_bg_tilemap[1].enable"] ? __l["m_bg_tilemap[1].enable"]((((((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 1)))) && ((((videocontrol) >>> (2)) & 1))) ? 1 : 0)) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1))).enable?.((((((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 1)))) && ((((videocontrol) >>> (2)) & 1))) ? 1 : 0)) ?? 0) : (__l["enable"]?.((((((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 1)))) && ((((videocontrol) >>> (2)) & 1))) ? 1 : 0)) ?? 0));
                (__l["m_bg_tilemap[2].enable"] ? __l["m_bg_tilemap[2].enable"]((((((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 2)))) && ((((videocontrol) >>> (3)) & 1))) ? 1 : 0)) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2))).enable?.((((((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 2)))) && ((((videocontrol) >>> (3)) & 1))) ? 1 : 0)) ?? 0) : (__l["enable"]?.((((((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 2)))) && ((((videocontrol) >>> (3)) & 1))) ? 1 : 0)) ?? 0));
                runtime.writeIndex(runtime.writableMember("m_stars_enabled"), 0, ((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 3))));
                runtime.writeIndex(runtime.writableMember("m_stars_enabled"), 1, ((layercontrol) & (runtime.readIndex(h_m_game_config.layer_enable_mask, 4))));
            }
            function method_find_last_sprite(runtime) {
                const members = runtime.members;
                const h_m_game_config = members.m_game_config ?? runtime.member("m_game_config");
                let offset = ((0) | 0);
                while (((Number(offset) < Number(runtime.divide((members.m_obj_size ?? runtime.member("m_obj_size")), 2))) ? 1 : 0)) {
                    if (((Number((((h_m_game_config.bootleg_kludge) >>> (0)) & ((1 << (4)) - 1))) === Number(3)) ? 1 : 0)) {
                        let marker = ((runtime.readIndex((members.m_buffered_obj ?? runtime.member("m_buffered_obj")), ((offset) + (1)))) | 0);
                        if (((Number(marker) >= Number(32768)) ? 1 : 0)) {
                            members.m_last_sprite_offset = ((((offset) - (4))) | 0);
                            return;
                        }
                    }
                    else {
                        let marker = ((runtime.readIndex((members.m_buffered_obj ?? runtime.member("m_buffered_obj")), ((offset) + (3)))) | 0);
                        if (((Number(((marker) & (65280))) === Number(65280)) ? 1 : 0)) {
                            members.m_last_sprite_offset = ((((offset) - (4))) | 0);
                            return;
                        }
                    }
                    offset = ((((offset) + (4))) | 0);
                }
                members.m_last_sprite_offset = ((((runtime.divide((members.m_obj_size ?? runtime.member("m_obj_size")), 2)) - (4))) | 0);
            }
            function method_cps1_update_transmasks(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_game_config = members.m_game_config ?? runtime.member("m_game_config");
                for (let i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let mask = ((0) >>> 0);
                    if (((Number(runtime.readIndex(h_m_game_config.priority, i)) !== Number(-1)) ? 1 : 0)) {
                        mask = ((((runtime.readIndex((members.m_cps_b_regs ?? runtime.member("m_cps_b_regs")), runtime.divide(runtime.readIndex(h_m_game_config.priority, i), 2))) ^ (65535))) >>> 0);
                    }
                    else {
                        mask = ((65535) >>> 0);
                    }
                    (__l["m_bg_tilemap[0].set_transmask"] ? __l["m_bg_tilemap[0].set_transmask"](i, mask, 32768) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0))).set_transmask?.(i, mask, 32768) ?? 0) : (__l["set_transmask"]?.(i, mask, 32768) ?? 0));
                    (__l["m_bg_tilemap[1].set_transmask"] ? __l["m_bg_tilemap[1].set_transmask"](i, mask, 32768) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1))).set_transmask?.(i, mask, 32768) ?? 0) : (__l["set_transmask"]?.(i, mask, 32768) ?? 0));
                    (__l["m_bg_tilemap[2].set_transmask"] ? __l["m_bg_tilemap[2].set_transmask"](i, mask, 32768) : (runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2)) != null ? ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2))).set_transmask?.(i, mask, 32768) ?? 0) : (__l["set_transmask"]?.(i, mask, 32768) ?? 0));
                }
            }
            function method_cps1_render_layer(runtime, screen, bitmap, cliprect, layer, primask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                switch (layer) {
                    case 0:
                        {
                            (__l["cps1_render_sprites"] ? __l["cps1_render_sprites"](screen, bitmap, cliprect) : runtime.macro("cps1_render_sprites", screen, bitmap, cliprect));
                            break;
                        }
                    case 1:
                    case 2:
                    case 3:
                        {
                            ((runtime.dereference(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), ((layer) - (1))))).draw?.(screen, bitmap, cliprect, 32, primask) ?? 0);
                            break;
                        }
                }
            }
            function method_screen_vblank_cps1(runtime, state) {
                const members = runtime.members;
                if (state) {
                    (runtime.overrides["cps1_get_video_base"] ? runtime.overrides["cps1_get_video_base"]() : method_cps1_get_video_base(runtime));
                }
            }
            function method_cps1_objram_latch(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (state) {
                    (__l["memcpy"] ? __l["memcpy"]((__l["m_buffered_obj.get"] ? __l["m_buffered_obj.get"]() : (members.m_buffered_obj) != null ? (typeof (runtime.dereference(members.m_buffered_obj)).get === 'function' ? (runtime.dereference(members.m_buffered_obj)).get() : typeof (runtime.dereference(members.m_buffered_obj)).get === 'number' || typeof (runtime.dereference(members.m_buffered_obj)).get === 'boolean' ? (runtime.dereference(members.m_buffered_obj)).get : runtime.container(members.m_buffered_obj, "get")) : (__l["get"]?.() ?? 0)), (members.m_obj ?? runtime.member("m_obj")), (members.m_obj_size ?? runtime.member("m_obj_size"))) : runtime.macro("memcpy", (__l["m_buffered_obj.get"] ? __l["m_buffered_obj.get"]() : (members.m_buffered_obj) != null ? (typeof (runtime.dereference(members.m_buffered_obj)).get === 'function' ? (runtime.dereference(members.m_buffered_obj)).get() : typeof (runtime.dereference(members.m_buffered_obj)).get === 'number' || typeof (runtime.dereference(members.m_buffered_obj)).get === 'boolean' ? (runtime.dereference(members.m_buffered_obj)).get : runtime.container(members.m_buffered_obj, "get")) : (__l["get"]?.() ?? 0)), (members.m_obj ?? runtime.member("m_obj")), (members.m_obj_size ?? runtime.member("m_obj_size"))));
                }
            }
            return {
                "irqack_r": method_irqack_r,
                "cps1_dsw_r": method_cps1_dsw_r,
                "cps1_cps_a_w": method_cps1_cps_a_w,
                "cps1_build_palette": method_cps1_build_palette,
                "cps1_base": method_cps1_base,
                "cps1_gfxram_w": method_cps1_gfxram_w,
                "cps1_snd_bankswitch_w": method_cps1_snd_bankswitch_w,
                "cps1_oki_pin7_w": method_cps1_oki_pin7_w,
                "get_tile0_info": method_get_tile0_info,
                "gfxrom_bank_mapper": method_gfxrom_bank_mapper,
                "tilemap0_scan": method_tilemap0_scan,
                "get_tile1_info": method_get_tile1_info,
                "tilemap1_scan": method_tilemap1_scan,
                "get_tile2_info": method_get_tile2_info,
                "tilemap2_scan": method_tilemap2_scan,
                "cps1_interrupt": method_cps1_interrupt,
                "cps1_get_video_base": method_cps1_get_video_base,
                "find_last_sprite": method_find_last_sprite,
                "cps1_update_transmasks": method_cps1_update_transmasks,
                "cps1_render_layer": method_cps1_render_layer,
                "screen_vblank_cps1": method_screen_vblank_cps1,
                "cps1_objram_latch": method_cps1_objram_latch
            };
        })();
        return {
            "cps_state.irqack_r": methods["irqack_r"],
            "cps_state.cps1_dsw_r": methods["cps1_dsw_r"],
            "cps_state.cps1_cps_a_w": methods["cps1_cps_a_w"],
            "cps_state.cps1_build_palette": methods["cps1_build_palette"],
            "cps_state.cps1_base": methods["cps1_base"],
            "cps_state.cps1_gfxram_w": methods["cps1_gfxram_w"],
            "cps_state.cps1_snd_bankswitch_w": methods["cps1_snd_bankswitch_w"],
            "cps_state.cps1_oki_pin7_w": methods["cps1_oki_pin7_w"],
            "cps_state.get_tile0_info": methods["get_tile0_info"],
            "cps_state.gfxrom_bank_mapper": methods["gfxrom_bank_mapper"],
            "cps_state.tilemap0_scan": methods["tilemap0_scan"],
            "cps_state.get_tile1_info": methods["get_tile1_info"],
            "cps_state.tilemap1_scan": methods["tilemap1_scan"],
            "cps_state.get_tile2_info": methods["get_tile2_info"],
            "cps_state.tilemap2_scan": methods["tilemap2_scan"],
            "cps_state.cps1_interrupt": methods["cps1_interrupt"],
            "cps_state.cps1_get_video_base": methods["cps1_get_video_base"],
            "cps_state.find_last_sprite": methods["find_last_sprite"],
            "cps_state.cps1_update_transmasks": methods["cps1_update_transmasks"],
            "cps_state.cps1_render_layer": methods["cps1_render_layer"],
            "cps_state.screen_vblank_cps1": methods["screen_vblank_cps1"],
            "cps_state.cps1_objram_latch": methods["cps1_objram_latch"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "cps1_render_sprites", "device.execute", "enable", "execute", "get", "m68000_base_device::autovector", "m_audiobank.set_entry", "m_bg_tilemap[0].enable", "m_bg_tilemap[0].mark_all_dirty", "m_bg_tilemap[0].mark_tile_dirty", "m_bg_tilemap[0].set_transmask", "m_bg_tilemap[1].enable", "m_bg_tilemap[1].mark_all_dirty", "m_bg_tilemap[1].mark_tile_dirty", "m_bg_tilemap[1].set_transmask", "m_bg_tilemap[2].enable", "m_bg_tilemap[2].mark_all_dirty", "m_bg_tilemap[2].mark_tile_dirty", "m_bg_tilemap[2].set_transmask", "m_buffered_obj.get", "m_io_in[0].read", "m_maincpu.set_input_line", "m_oki.set_pin7", "m_palette.set_pen_color", "machine", "machine().side_effects_disabled", "mark_all_dirty", "mark_tile_dirty", "memcpy", "read", "rgb_t", "set", "set_entry", "set_transmask", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
