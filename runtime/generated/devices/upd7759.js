import deviceData from './upd7759.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_internal_start_w(runtime, state) {
        const members = runtime.members;
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        let oldstart = (((members.m_start ?? runtime.member("m_start"))) & 0xff);
        members.m_start = ((((Number(state) !== Number(0)) ? 1 : 0)) & 0xff);
        0;
        if (((((((((((((((Number((members.m_state ?? runtime.member("m_state"))) === Number(0)) ? 1 : 0)) && (((Number((members.m_mode ?? runtime.member("m_mode"))) === Number(1)) ? 1 : 0))) ? 1 : 0)) && (oldstart)) ? 1 : 0)) && ((((members.m_start ?? runtime.member("m_start"))) ? 0 : 1))) ? 1 : 0)) && ((members.m_reset ?? runtime.member("m_reset")))) ? 1 : 0)) {
            members.m_state = ((2) << 24 >> 24);
        }
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
    }
    function method_internal_reset_w(runtime, param) {
        const members = runtime.members;
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        let oldreset = (((members.m_reset ?? runtime.member("m_reset"))) & 0xff);
        members.m_reset = ((((Number(param) !== Number(0)) ? 1 : 0)) & 0xff);
        if ((((oldreset) && ((((members.m_reset ?? runtime.member("m_reset"))) ? 0 : 1))) ? 1 : 0)) {
            method_device_reset(runtime);
        }
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        method_upd775x_device__device_reset(runtime);
        ((runtime.dereference(members.m_timer)).adjust?.(Infinity) ?? 0);
        if ((members.m_drq ?? runtime.member("m_drq"))) {
            members.m_drq = ((0) & 0xff);
            runtime.invoke("m_drqcallback", (members.m_drq ?? runtime.member("m_drq")));
        }
    }
    function method_upd775x_device__device_reset(runtime) {
        const members = runtime.members;
        members.m_pos = ((0) >>> 0);
        members.m_state = ((0) << 24 >> 24);
        members.m_clocks_left = ((0) | 0);
        members.m_nibbles_left = ((0) & 0xffff);
        members.m_repeat_count = ((0) & 0xff);
        members.m_post_drq_state = ((0) << 24 >> 24);
        members.m_post_drq_clocks = ((0) | 0);
        members.m_req_sample = ((0) & 0xff);
        members.m_last_sample = ((0) & 0xff);
        members.m_block_header = ((0) & 0xff);
        members.m_sample_rate = ((0) & 0xff);
        members.m_first_valid_header = ((0) & 0xff);
        members.m_offset = ((0) >>> 0);
        members.m_repeat_offset = ((0) >>> 0);
        members.m_adpcm_state = ((0) << 24 >> 24);
        members.m_adpcm_data = ((0) & 0xff);
        members.m_sample = ((0) << 16 >> 16);
        members.m_mode = ((1) | 0);
    }
    function method_internal_port_w(runtime, param) {
        const members = runtime.members;
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        members.m_fifo_in = ((param) & 0xff);
    }
    function method_drq_update(runtime, param) {
        const members = runtime.members;
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        let olddrq = (((members.m_drq ?? runtime.member("m_drq"))) & 0xff);
        let old_state = (members.m_state ?? runtime.member("m_state"));
        method_advance_state(runtime);
        0;
        if (((Number(olddrq) !== Number((members.m_drq ?? runtime.member("m_drq")))) ? 1 : 0)) {
            0;
            runtime.invoke("m_drqcallback", (members.m_drq ?? runtime.member("m_drq")));
        }
        if ((((((Number((members.m_state ?? runtime.member("m_state"))) !== Number(0)) ? 1 : 0)) || (((Number(old_state) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
            ((runtime.dereference(members.m_timer)).adjust?.((((members.m_clock_period ?? runtime.member("m_clock_period"))) * ((members.m_clocks_left ?? runtime.member("m_clocks_left"))))) ?? 0);
        }
    }
    function method_advance_state(runtime) {
        const members = runtime.members;
        switch ((members.m_state ?? runtime.member("m_state"))) {
            case 0:
                {
                    members.m_clocks_left = ((4) | 0);
                    break;
                }
            case 1:
                {
                    members.m_drq = ((0) & 0xff);
                    members.m_clocks_left = (((members.m_post_drq_clocks ?? runtime.member("m_post_drq_clocks"))) | 0);
                    members.m_state = (((members.m_post_drq_state ?? runtime.member("m_post_drq_state"))) << 24 >> 24);
                    break;
                }
            case 2:
                {
                    members.m_req_sample = ((((((Number((members.m_mode ?? runtime.member("m_mode"))) === Number(1)) ? 1 : 0)) ? ((members.m_fifo_in ?? runtime.member("m_fifo_in"))) : (16))) & 0xff);
                    0;
                    members.m_clocks_left = ((((70) + ((members.m_start_delay ?? runtime.member("m_start_delay"))))) | 0);
                    members.m_state = ((3) << 24 >> 24);
                    break;
                }
            case 3:
                {
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((44) | 0);
                    members.m_state = ((4) << 24 >> 24);
                    break;
                }
            case 4:
                {
                    members.m_last_sample = ((((((Number((members.m_mode ?? runtime.member("m_mode"))) === Number(1)) ? 1 : 0)) ? ((runtime.calls["read_byte"] ? runtime.calls["read_byte"](0) : runtime.macro("read_byte", 0))) : ((members.m_fifo_in ?? runtime.member("m_fifo_in"))))) & 0xff);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((28) | 0);
                    members.m_state = ((((((Number((members.m_req_sample ?? runtime.member("m_req_sample"))) > Number((members.m_last_sample ?? runtime.member("m_last_sample")))) ? 1 : 0)) ? (0) : (5))) << 24 >> 24);
                    break;
                }
            case 5:
                {
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((32) | 0);
                    members.m_state = ((6) << 24 >> 24);
                    break;
                }
            case 6:
                {
                    members.m_offset = ((((((((Number((members.m_mode ?? runtime.member("m_mode"))) === Number(1)) ? 1 : 0)) ? ((runtime.calls["read_byte"] ? runtime.calls["read_byte"](runtime.add((((members.m_req_sample ?? runtime.member("m_req_sample"))) * (2)), 5)) : runtime.macro("read_byte", runtime.add((((members.m_req_sample ?? runtime.member("m_req_sample"))) * (2)), 5)))) : ((members.m_fifo_in ?? runtime.member("m_fifo_in"))))) << (((8) + ((members.m_sample_offset_shift ?? runtime.member("m_sample_offset_shift"))))))) >>> 0);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((44) | 0);
                    members.m_state = ((7) << 24 >> 24);
                    break;
                }
            case 7:
                {
                    members.m_offset = ((((members.m_offset) | (((((((Number((members.m_mode ?? runtime.member("m_mode"))) === Number(1)) ? 1 : 0)) ? ((runtime.calls["read_byte"] ? runtime.calls["read_byte"](runtime.add((((members.m_req_sample ?? runtime.member("m_req_sample"))) * (2)), 6)) : runtime.macro("read_byte", runtime.add((((members.m_req_sample ?? runtime.member("m_req_sample"))) * (2)), 6)))) : ((members.m_fifo_in ?? runtime.member("m_fifo_in"))))) << ((members.m_sample_offset_shift ?? runtime.member("m_sample_offset_shift"))))))) >>> 0);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((36) | 0);
                    members.m_state = ((8) << 24 >> 24);
                    break;
                }
            case 8:
                {
                    members.m_offset = ((((members.m_offset) + (1))) >>> 0);
                    members.m_first_valid_header = ((0) & 0xff);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((36) | 0);
                    members.m_state = ((9) << 24 >> 24);
                    break;
                }
            case 9:
                {
                    if ((members.m_repeat_count ?? runtime.member("m_repeat_count"))) {
                        members.m_repeat_count = ((((members.m_repeat_count) - (1))) & 0xff);
                        members.m_offset = (((members.m_repeat_offset ?? runtime.member("m_repeat_offset"))) >>> 0);
                    }
                    members.m_block_header = ((((((Number((members.m_mode ?? runtime.member("m_mode"))) === Number(1)) ? 1 : 0)) ? ((runtime.calls["read_byte"] ? runtime.calls["read_byte"]((() => { const previous = members.m_offset; members.m_offset = ((((members.m_offset) + (1))) >>> 0); return previous; })()) : runtime.macro("read_byte", (() => { const previous = members.m_offset; members.m_offset = ((((members.m_offset) + (1))) >>> 0); return previous; })()))) : ((members.m_fifo_in ?? runtime.member("m_fifo_in"))))) & 0xff);
                    0;
                    members.m_drq = ((1) & 0xff);
                    switch ((((members.m_block_header ?? runtime.member("m_block_header"))) & (192))) {
                        case 0:
                            {
                                members.m_clocks_left = ((((1024) * (runtime.add((((members.m_block_header ?? runtime.member("m_block_header"))) & (63)), 1)))) | 0);
                                members.m_state = (((((((((Number((members.m_block_header ?? runtime.member("m_block_header"))) === Number(0)) ? 1 : 0)) && ((members.m_first_valid_header ?? runtime.member("m_first_valid_header")))) ? 1 : 0)) ? (0) : (9))) << 24 >> 24);
                                members.m_sample = ((0) << 16 >> 16);
                                members.m_adpcm_state = ((0) << 24 >> 24);
                                break;
                            }
                        case 64:
                            {
                                members.m_sample_rate = ((runtime.add((((members.m_block_header ?? runtime.member("m_block_header"))) & (63)), 1)) & 0xff);
                                members.m_nibbles_left = ((256) & 0xffff);
                                members.m_clocks_left = ((36) | 0);
                                members.m_state = ((11) << 24 >> 24);
                                break;
                            }
                        case 128:
                            {
                                members.m_sample_rate = ((runtime.add((((members.m_block_header ?? runtime.member("m_block_header"))) & (63)), 1)) & 0xff);
                                members.m_clocks_left = ((36) | 0);
                                members.m_state = ((10) << 24 >> 24);
                                break;
                            }
                        case 192:
                            {
                                members.m_repeat_count = ((runtime.add((((members.m_block_header ?? runtime.member("m_block_header"))) & (7)), 1)) & 0xff);
                                members.m_repeat_offset = (((members.m_offset ?? runtime.member("m_offset"))) >>> 0);
                                members.m_clocks_left = ((36) | 0);
                                members.m_state = ((9) << 24 >> 24);
                                break;
                            }
                    }
                    if (((Number((members.m_block_header ?? runtime.member("m_block_header"))) !== Number(0)) ? 1 : 0)) {
                        members.m_first_valid_header = ((1) & 0xff);
                    }
                    break;
                }
            case 10:
                {
                    members.m_nibbles_left = ((runtime.add(((((Number((members.m_mode ?? runtime.member("m_mode"))) === Number(1)) ? 1 : 0)) ? ((runtime.calls["read_byte"] ? runtime.calls["read_byte"]((() => { const previous = members.m_offset; members.m_offset = ((((members.m_offset) + (1))) >>> 0); return previous; })()) : runtime.macro("read_byte", (() => { const previous = members.m_offset; members.m_offset = ((((members.m_offset) + (1))) >>> 0); return previous; })()))) : ((members.m_fifo_in ?? runtime.member("m_fifo_in")))), 1)) & 0xffff);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((36) | 0);
                    members.m_state = ((11) << 24 >> 24);
                    break;
                }
            case 11:
                {
                    members.m_adpcm_data = ((((((Number((members.m_mode ?? runtime.member("m_mode"))) === Number(1)) ? 1 : 0)) ? ((runtime.calls["read_byte"] ? runtime.calls["read_byte"]((() => { const previous = members.m_offset; members.m_offset = ((((members.m_offset) + (1))) >>> 0); return previous; })()) : runtime.macro("read_byte", (() => { const previous = members.m_offset; members.m_offset = ((((members.m_offset) + (1))) >>> 0); return previous; })()))) : ((members.m_fifo_in ?? runtime.member("m_fifo_in"))))) & 0xff);
                    method_update_adpcm(runtime, (((members.m_adpcm_data ?? runtime.member("m_adpcm_data"))) >>> (4)));
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = (((((members.m_sample_rate ?? runtime.member("m_sample_rate"))) * (4))) | 0);
                    if (((Number((members.m_nibbles_left = ((((members.m_nibbles_left) - (1))) & 0xffff))) === Number(0)) ? 1 : 0)) {
                        members.m_state = ((9) << 24 >> 24);
                    }
                    else {
                        members.m_state = ((12) << 24 >> 24);
                    }
                    break;
                }
            case 12:
                {
                    method_update_adpcm(runtime, (((members.m_adpcm_data ?? runtime.member("m_adpcm_data"))) & (15)));
                    members.m_clocks_left = (((((members.m_sample_rate ?? runtime.member("m_sample_rate"))) * (4))) | 0);
                    if (((Number((members.m_nibbles_left = ((((members.m_nibbles_left) - (1))) & 0xffff))) === Number(0)) ? 1 : 0)) {
                        members.m_state = ((9) << 24 >> 24);
                    }
                    else {
                        members.m_state = ((11) << 24 >> 24);
                    }
                    break;
                }
        }
        if ((members.m_drq ?? runtime.member("m_drq"))) {
            members.m_post_drq_state = (((members.m_state ?? runtime.member("m_state"))) << 24 >> 24);
            members.m_post_drq_clocks = (((((members.m_clocks_left ?? runtime.member("m_clocks_left"))) - (21))) | 0);
            members.m_state = ((1) << 24 >> 24);
            members.m_clocks_left = ((21) | 0);
        }
    }
    function method_update_adpcm(runtime, data) {
        const members = runtime.members;
        members.m_sample = ((((members.m_sample) + (([0, 0, 1, 2, 3, 5, 7, 10, 0, 0, (-1), (-2), (-3), (-5), (-7), (-10), 0, 1, 2, 3, 4, 6, 8, 13, 0, (-1), (-2), (-3), (-4), (-6), (-8), (-13), 0, 1, 2, 4, 5, 7, 10, 15, 0, (-1), (-2), (-4), (-5), (-7), (-10), (-15), 0, 1, 3, 4, 6, 9, 13, 19, 0, (-1), (-3), (-4), (-6), (-9), (-13), (-19), 0, 2, 3, 5, 8, 11, 15, 23, 0, (-2), (-3), (-5), (-8), (-11), (-15), (-23), 0, 2, 4, 7, 10, 14, 19, 29, 0, (-2), (-4), (-7), (-10), (-14), (-19), (-29), 0, 3, 5, 8, 12, 16, 22, 33, 0, (-3), (-5), (-8), (-12), (-16), (-22), (-33), 1, 4, 7, 10, 15, 20, 29, 43, (-1), (-4), (-7), (-10), (-15), (-20), (-29), (-43), 1, 4, 8, 13, 18, 25, 35, 53, (-1), (-4), (-8), (-13), (-18), (-25), (-35), (-53), 1, 6, 10, 16, 22, 31, 43, 64, (-1), (-6), (-10), (-16), (-22), (-31), (-43), (-64), 2, 7, 12, 19, 27, 37, 51, 76, (-2), (-7), (-12), (-19), (-27), (-37), (-51), (-76), 2, 9, 16, 24, 34, 46, 64, 96, (-2), (-9), (-16), (-24), (-34), (-46), (-64), (-96), 3, 11, 19, 29, 41, 57, 79, 117, (-3), (-11), (-19), (-29), (-41), (-57), (-79), (-117), 4, 13, 24, 36, 50, 69, 96, 143, (-4), (-13), (-24), (-36), (-50), (-69), (-96), (-143), 4, 16, 29, 44, 62, 85, 118, 175, (-4), (-16), (-29), (-44), (-62), (-85), (-118), (-175), 6, 20, 36, 54, 76, 104, 144, 214, (-6), (-20), (-36), (-54), (-76), (-104), (-144), (-214)][((((((((members.m_adpcm_state ?? runtime.member("m_adpcm_state"))) * (16))) + (data))) % 256) + 256) % 256] ?? 0)))) << 16 >> 16);
        members.m_adpcm_state = ((((members.m_adpcm_state) + (([(-1), (-1), 0, 0, 1, 2, 2, 3, (-1), (-1), 0, 0, 1, 2, 2, 3][(((data) % 16) + 16) % 16] ?? 0)))) << 24 >> 24);
        if (((Number((members.m_adpcm_state ?? runtime.member("m_adpcm_state"))) < Number(0)) ? 1 : 0)) {
            members.m_adpcm_state = ((0) << 24 >> 24);
        }
        else {
            if (((Number((members.m_adpcm_state ?? runtime.member("m_adpcm_state"))) > Number(15)) ? 1 : 0)) {
                members.m_adpcm_state = ((15) << 24 >> 24);
            }
        }
    }
    function method_internal_md_w(runtime, param) {
        const members = runtime.members;
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        let old_md = (((members.m_md ?? runtime.member("m_md"))) & 0xff);
        members.m_md = ((((Number(param) !== Number(0)) ? 1 : 0)) | 0);
        0;
        if ((((((Number((members.m_state ?? runtime.member("m_state"))) === Number(0)) ? 1 : 0)) && ((members.m_reset ?? runtime.member("m_reset")))) ? 1 : 0)) {
            if ((((old_md) && ((((members.m_md ?? runtime.member("m_md"))) ? 0 : 1))) ? 1 : 0)) {
                members.m_mode = ((0) | 0);
                members.m_state = ((2) << 24 >> 24);
                ((runtime.dereference(members.m_timer)).adjust?.(0) ?? 0);
            }
            else {
                if ((((((old_md) ? 0 : 1)) && ((members.m_md ?? runtime.member("m_md")))) ? 1 : 0)) {
                    members.m_mode = ((1) | 0);
                }
            }
        }
    }
    return {
        "internal_start_w": method_internal_start_w,
        "sound_stream_update": method_sound_stream_update,
        "internal_reset_w": method_internal_reset_w,
        "device_reset": method_device_reset,
        "upd775x_device::device_reset": method_upd775x_device__device_reset,
        "internal_port_w": method_internal_port_w,
        "drq_update": method_drq_update,
        "advance_state": method_advance_state,
        "update_adpcm": method_update_adpcm,
        "internal_md_w": method_internal_md_w
    };
})();
export const device = definition;
export default device;
