// GENERATED executable machine composition from src/mame/atari/a2600.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'a2600');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_draw_sprite_helper(runtime, p, col, gfx, GRP, COLUP, REFP) {
                const members = runtime.members;
                let i = 0;
                let j = 0;
                let k = 0;
                if (((REFP) & (8))) {
                    GRP = ((((((GRP) >>> (0)) & 1) << 7 | (((GRP) >>> (1)) & 1) << 6 | (((GRP) >>> (2)) & 1) << 5 | (((GRP) >>> (3)) & 1) << 4 | (((GRP) >>> (4)) & 1) << 3 | (((GRP) >>> (5)) & 1) << 2 | (((GRP) >>> (6)) & 1) << 1 | (((GRP) >>> (7)) & 1) << 0)) & 0xff);
                }
                for (i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
                    let start_pos = runtime.readIndex(gfx.start_drawing, i);
                    for (j = runtime.readIndex(gfx.start_pixel, i); ((Number(j) < Number(8)) ? 1 : 0); j = ((j) + (1))) {
                        for (k = 0; ((Number(k) < Number(runtime.readIndex(gfx.size, i))) ? 1 : 0); k = ((k) + (1))) {
                            if (((GRP) & (((128) >>> (j))))) {
                                if ((((((Number(start_pos) < Number(160)) ? 1 : 0)) || (((runtime.readIndex(gfx.skipclip, i)) ? 0 : 1))) ? 1 : 0)) {
                                    runtime.writeIndex(p, ((start_pos) % (160)), ((COLUP) >>> (1)));
                                    runtime.writeIndex(col, ((start_pos) % (160)), ((COLUP) >>> (1)));
                                }
                            }
                            start_pos = ((start_pos) + (1));
                        }
                    }
                }
            }
            function method_collision_check(runtime, p1, p2, x1, x2) {
                const members = runtime.members;
                let i = 0;
                for (i = x1; ((Number(i) < Number(x2)) ? 1 : 0); i = ((i) + (1))) {
                    if ((((((Number(runtime.readIndex(p1, i)) !== Number(255)) ? 1 : 0)) && (((Number(runtime.readIndex(p2, i)) !== Number(255)) ? 1 : 0))) ? 1 : 0)) {
                        return 1;
                    }
                }
                return 0;
            }
            function method_RSYNC_w(runtime) {
                const members = runtime.members;
            }
            function method_a2600_read_input_port(runtime, offset) {
                const members = runtime.members;
                switch (offset) {
                    case 0:
                        {
                            return (runtime.calls["m_joy1.read_pot_x"] ? runtime.calls["m_joy1.read_pot_x"]() : (members.m_joy1) != null ? (typeof (runtime.dereference(members.m_joy1)).read_pot_x === 'function' ? (runtime.dereference(members.m_joy1)).read_pot_x() : typeof (runtime.dereference(members.m_joy1)).read_pot_x === 'number' || typeof (runtime.dereference(members.m_joy1)).read_pot_x === 'boolean' ? (runtime.dereference(members.m_joy1)).read_pot_x : runtime.container(members.m_joy1, "read_pot_x")) : (runtime.calls["read_pot_x"]?.() ?? 0));
                        }
                    case 1:
                        {
                            return (runtime.calls["m_joy1.read_pot_y"] ? runtime.calls["m_joy1.read_pot_y"]() : (members.m_joy1) != null ? (typeof (runtime.dereference(members.m_joy1)).read_pot_y === 'function' ? (runtime.dereference(members.m_joy1)).read_pot_y() : typeof (runtime.dereference(members.m_joy1)).read_pot_y === 'number' || typeof (runtime.dereference(members.m_joy1)).read_pot_y === 'boolean' ? (runtime.dereference(members.m_joy1)).read_pot_y : runtime.container(members.m_joy1, "read_pot_y")) : (runtime.calls["read_pot_y"]?.() ?? 0));
                        }
                    case 2:
                        {
                            return (runtime.calls["m_joy2.read_pot_x"] ? runtime.calls["m_joy2.read_pot_x"]() : (members.m_joy2) != null ? (typeof (runtime.dereference(members.m_joy2)).read_pot_x === 'function' ? (runtime.dereference(members.m_joy2)).read_pot_x() : typeof (runtime.dereference(members.m_joy2)).read_pot_x === 'number' || typeof (runtime.dereference(members.m_joy2)).read_pot_x === 'boolean' ? (runtime.dereference(members.m_joy2)).read_pot_x : runtime.container(members.m_joy2, "read_pot_x")) : (runtime.calls["read_pot_x"]?.() ?? 0));
                        }
                    case 3:
                        {
                            return (runtime.calls["m_joy2.read_pot_y"] ? runtime.calls["m_joy2.read_pot_y"]() : (members.m_joy2) != null ? (typeof (runtime.dereference(members.m_joy2)).read_pot_y === 'function' ? (runtime.dereference(members.m_joy2)).read_pot_y() : typeof (runtime.dereference(members.m_joy2)).read_pot_y === 'number' || typeof (runtime.dereference(members.m_joy2)).read_pot_y === 'boolean' ? (runtime.dereference(members.m_joy2)).read_pot_y : runtime.container(members.m_joy2, "read_pot_y")) : (runtime.calls["read_pot_y"]?.() ?? 0));
                        }
                    case 4:
                        {
                            return (((((runtime.calls["m_joy1.read_joy"] ? runtime.calls["m_joy1.read_joy"]() : (members.m_joy1) != null ? (typeof (runtime.dereference(members.m_joy1)).read_joy === 'function' ? (runtime.dereference(members.m_joy1)).read_joy() : typeof (runtime.dereference(members.m_joy1)).read_joy === 'number' || typeof (runtime.dereference(members.m_joy1)).read_joy === 'boolean' ? (runtime.dereference(members.m_joy1)).read_joy : runtime.container(members.m_joy1, "read_joy")) : (runtime.calls["read_joy"]?.() ?? 0))) & (32))) ? (255) : (127));
                        }
                    case 5:
                        {
                            return (((((runtime.calls["m_joy2.read_joy"] ? runtime.calls["m_joy2.read_joy"]() : (members.m_joy2) != null ? (typeof (runtime.dereference(members.m_joy2)).read_joy === 'function' ? (runtime.dereference(members.m_joy2)).read_joy() : typeof (runtime.dereference(members.m_joy2)).read_joy === 'number' || typeof (runtime.dereference(members.m_joy2)).read_joy === 'boolean' ? (runtime.dereference(members.m_joy2)).read_joy : runtime.container(members.m_joy2, "read_joy")) : (runtime.calls["read_joy"]?.() ?? 0))) & (32))) ? (255) : (127));
                        }
                }
                return 255;
            }
            function method_switch_A_r(runtime) {
                const members = runtime.members;
                let val = ((0) & 0xff);
                val = ((((val) | ((((((runtime.calls["m_joy1.read_joy"] ? runtime.calls["m_joy1.read_joy"]() : (members.m_joy1) != null ? (typeof (runtime.dereference(members.m_joy1)).read_joy === 'function' ? (runtime.dereference(members.m_joy1)).read_joy() : typeof (runtime.dereference(members.m_joy1)).read_joy === 'number' || typeof (runtime.dereference(members.m_joy1)).read_joy === 'boolean' ? (runtime.dereference(members.m_joy1)).read_joy : runtime.container(members.m_joy1, "read_joy")) : (runtime.calls["read_joy"]?.() ?? 0))) & (15))) << (4))))) & 0xff);
                val = ((((val) | ((((runtime.calls["m_joy2.read_joy"] ? runtime.calls["m_joy2.read_joy"]() : (members.m_joy2) != null ? (typeof (runtime.dereference(members.m_joy2)).read_joy === 'function' ? (runtime.dereference(members.m_joy2)).read_joy() : typeof (runtime.dereference(members.m_joy2)).read_joy === 'number' || typeof (runtime.dereference(members.m_joy2)).read_joy === 'boolean' ? (runtime.dereference(members.m_joy2)).read_joy : runtime.container(members.m_joy2, "read_joy")) : (runtime.calls["read_joy"]?.() ?? 0))) & (15))))) & 0xff);
                return val;
            }
            function method_switch_A_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_joy1.joy_w"] ? runtime.calls["m_joy1.joy_w"](((data) >>> (4))) : (members.m_joy1) != null ? ((runtime.dereference(members.m_joy1)).joy_w?.(((data) >>> (4))) ?? 0) : (runtime.calls["joy_w"]?.(((data) >>> (4))) ?? 0));
                (runtime.calls["m_joy2.joy_w"] ? runtime.calls["m_joy2.joy_w"](((data) & (15))) : (members.m_joy2) != null ? ((runtime.dereference(members.m_joy2)).joy_w?.(((data) & (15))) ?? 0) : (runtime.calls["joy_w"]?.(((data) & (15))) ?? 0));
            }
            function method_switch_B_w(runtime, data) {
                const members = runtime.members;
            }
            function method_irq_callback(runtime, state) {
                const members = runtime.members;
            }
            return {
                "draw_sprite_helper": method_draw_sprite_helper,
                "collision_check": method_collision_check,
                "RSYNC_w": method_RSYNC_w,
                "a2600_read_input_port": method_a2600_read_input_port,
                "switch_A_r": method_switch_A_r,
                "switch_A_w": method_switch_A_w,
                "switch_B_w": method_switch_B_w,
                "irq_callback": method_irq_callback
            };
        })();
        return {
            "a2600_state.a2600_read_input_port": methods["a2600_read_input_port"],
            "a2600_state.switch_A_r": methods["switch_A_r"],
            "a2600_state.switch_A_w": methods["switch_A_w"],
            "a2600_state.switch_B_w": methods["switch_B_w"],
            "a2600_state.irq_callback": methods["irq_callback"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
